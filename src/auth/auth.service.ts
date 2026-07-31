import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export type AccessTokenPayload = {
  sub: number;
  username: string;
};
@Injectable()
export class AuthService {
  constructor(
    private readonly userServices: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(
    Username: string,
    pass: string,
  ): Promise<{ accesstoken: string }> {
    const user = await this.userServices.findOne(Username);
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }

    const accesstokenPayload: AccessTokenPayload = {
      sub: user.userId,
      username: user.userName,
    };
    return {
      accesstoken: await this.jwtService.signAsync(accesstokenPayload),
    };
  }
}
