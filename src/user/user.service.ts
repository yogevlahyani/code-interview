import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './User';

@Injectable()
export class UserService {
  @Inject(DatabaseService) private readonly db: DatabaseService<User>;

  public create(data: User): Promise<User> {
    return this.db.create(data);
  }

  public find(token?: string): Promise<User[]> {
    return this.db.find(token);
  }
}
