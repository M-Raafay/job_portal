import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  register(@Body() signupDto:SignUpDto){
    return this.authService.signup(signupDto)
  }

  @Post('login')
  login(@Body() loginDto:LogInDto){
    return this.authService.login(loginDto)
  }

}
