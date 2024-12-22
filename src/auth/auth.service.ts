import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, password, avatar }: CredentialsDto) {
    try {
      const user = await this.userService.findByEmail(email);

      if (user) {
        throw new ConflictException('User with that email already exists');
      }
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const userId = await this.userService.create(email, hashedPass, avatar);

    return { access_token: this.createToken(email, userId) };
  }

  async signIn({ email, password }: CredentialsDto) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { access_token: this.createToken(user.email, user.id) };
  }

  private createToken(email: string, id: string) {
    const payload = { email: email, sub: id };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
