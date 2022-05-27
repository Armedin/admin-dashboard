import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class LocalAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  private logger = new Logger(LocalAuthGuard.name);

  handleRequest(info, user, error: any): any {
    if (error && error.name === 'TokenExpiredError') {
      throw new UnauthorizedException('The access token has expired', 'AccessTokenExpired');
    } else if (error) {
      this.logger.warn('Unauthorized access error. Details:', error);
      throw new UnauthorizedException(
        'The access token provided is not valid.',
        'AccessTokenInvalid',
      );
    }

    return user as User;
  }
}
