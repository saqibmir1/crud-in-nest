import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async create(createAuthDto: CreateAuthDto) {
    const existingUser = await this.getUserByEmail(createAuthDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists.');
    }
    const newUser = this.userRepo.create({ ...createAuthDto });
    await this.userRepo.save(newUser);
    return 'User created successfully.';
  }

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.getUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    const match = await bcrypt.compare(password, user.password);
    if (!match) return new UnauthorizedException('Bad credentials');

    const payload = {
      id: user.id,
      email,
      name: user.name,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
