import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly hardcodedUser = {
    username: 'admin',
    password: 'admin@123',
  };

  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string) {
    if (
      username === this.hardcodedUser.username &&
      password === this.hardcodedUser.password
    ) {
      const payload = { username };
      return { access_token: this.jwtService.sign(payload) };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
