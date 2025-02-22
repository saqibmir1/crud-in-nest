import { Injectable, InternalServerErrorException, NotFoundException, Logger} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async findOne(userId: number) {
    try {
      const user = await this.userRepo.findOne({where: {id: userId}});
      return user;
    } catch (error) {
      this.logger.error(`Failed to fetch user with ID ${userId}`);
      throw new InternalServerErrorException("Failed to fetch user");
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    try {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    await this.userRepo.save(user);
    return "User updated successfully";
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    this.logger.error(`Failed to update user with ID ${userId}`)
  }
  }

  async remove(userId: number) {
    try {
      await this.userRepo.delete(userId);
      return "User Deleted successfully";
    } catch (error) {
      this.logger.error(`Failed to delete user with ID ${userId}`)
      throw new InternalServerErrorException("Failed to delete user");
    }
  }
}
