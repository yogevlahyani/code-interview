import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService) private readonly userService: UserService;

  @Post()
  public async signup(@Body() user: CreateUserDto) {
    const { token } = await this.userService.create(user);

    return { token };
  }
}
