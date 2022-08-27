import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache as CacheManager } from 'cache-manager';

export function Cache(ttl?: number): MethodDecorator {
  const injectCacheManager = Inject(CACHE_MANAGER);

  return (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    injectCacheManager(target, 'cacheManager');
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: Array<any>) {
      const cacheManager: CacheManager = this.cacheManager;
      const cacheKey = `${propertyKey}_${args.join('-')}`;
      const cachedResponse = await cacheManager.get(cacheKey);

      if (cachedResponse) {
        return cachedResponse;
      }

      const response = await originalMethod.bind(this)(...args);
      await cacheManager.set(cacheKey, response, { ttl });

      return response;
    };

    return descriptor;
  };
}
