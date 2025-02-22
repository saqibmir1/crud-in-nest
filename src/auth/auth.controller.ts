import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { MessageDto } from 'src/core/dtos/generic-response.dot';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiProperty({ type: CreateAuthDto })
  @ApiOperation({ summary: 'Register a user' })
  @ApiResponse({status: 201, type: MessageDto, description: "User created successfully"})
  async create(@Body() createAuthDto: CreateAuthDto):Promise<MessageDto> {
    const message = await this.authService.create(createAuthDto);
    return {message};
  }

  @Post('login')
  @ApiProperty({ type: LoginDto })
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
