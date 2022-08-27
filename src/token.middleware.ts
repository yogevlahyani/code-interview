import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { DatabaseService } from './database/database.service';
import { User } from './user/User';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  @Inject(DatabaseService)
  private readonly userRepository: DatabaseService<User>;

  async use(req: any, res: Response, next: NextFunction) {
    const token = req.headers['x-authentication'];
    req.user = await this.userRepository.find(token);
    next();
  }
}
