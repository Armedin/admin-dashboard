import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../auth/auth.guard';
import { User } from './schemas/user.schema';
import { GetUser } from './get-user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/register')
  async registerUser(@Body() registerDto: RegisterDto): Promise<any> {
    return this.usersService.register(registerDto);
  }

  /* USER ENDPOINTS */
  @Get('/me')
  @UseGuards(LocalAuthGuard)
  getUserProfile(@GetUser() user: User) {
    return user;
  }
}
