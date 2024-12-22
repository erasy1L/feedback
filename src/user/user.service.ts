import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    email: string,
    password: string,
    avatar?: string,
  ): Promise<string> {
    try {
      const id = uuidv7();
      const user = this.userRepository.create({ id, email, password, avatar });
      const savedUser = await this.userRepository.save(user);
      return savedUser.id;
    } catch (error) {
      this.logger.error('error saving user:', error);
      throw new InternalServerErrorException();
    }
  }

  async list(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error('error listing users:', error);
      throw new InternalServerErrorException();
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      this.logger.error(`error getting user with ID ${id}:`, error);
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`user with ID ${id} not found`);
      }
      throw new InternalServerErrorException();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      this.logger.error(`error getting user with email ${email}:`, error);
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`user with email ${email} not found`);
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, email: string, password: string, avatar?: string) {
    try {
      const result = await this.userRepository.update(
        { id },
        { email, password, avatar },
      );
      if (result.affected === 0) {
        throw new NotFoundException(`user with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      this.logger.error(`error updating user with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    try {
      const result = await this.userRepository.delete({ id });
      if (result.affected === 0) {
        throw new NotFoundException(`user with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      this.logger.error(`error deleting user with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
