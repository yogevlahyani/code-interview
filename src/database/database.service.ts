import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as crypto from 'crypto';

@Injectable()
export class DatabaseService<Model> {
  @Inject('DATABASE') private readonly db: Cache;

  public async create(data: Model): Promise<Model> {
    const token = crypto.randomUUID();
    return this.db.set(token, { token, ...data });
  }

  public async find(token?: string): Promise<Model[]> {
    if (!token) {
      const keys = await this.db.store.keys();

      return Promise.all(keys.map((key) => this.db.get(key)));
    }

    return this.db.store.mget(token);
  }
}
