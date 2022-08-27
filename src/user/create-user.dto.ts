import { Exclude } from 'class-transformer';
import { IsLocale, IsString } from 'class-validator';
import { User } from './User';

export class CreateUserDto implements User {
  @IsString()
  public userName: string;

  @IsLocale()
  public language: string;

  @Exclude()
  public token: string;
}
