import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../token/token.service';
import { JWTPayload } from '../types/jwt-payload.type';

declare module 'express' {
  interface Request {
    user: JWTPayload;
  }
}

@Injectable()
export class EmployeeGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (token) {
      try {
        const payload = this.tokenService.verifyAccessToken(token);

        request.user = payload;
      } catch {
        throw new UnauthorizedException();
      }
    } else {
      request.user = { id: '0' };
    }

    return true;
  }
}
