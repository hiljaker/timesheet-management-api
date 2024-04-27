import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from 'src/types/jwt-payload.type';

@Injectable()
export class TokenService {
  private readonly secret: string;

  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.secret = this.config.get('jwt.secret');
  }

  signAccessToken(payload: JWTPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.secret,
    });
  }

  verifyAccessToken(token: string): JWTPayload {
    return this.jwtService.verify(token, {
      secret: this.secret,
    });
  }
}
