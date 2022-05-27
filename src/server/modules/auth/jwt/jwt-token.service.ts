import { sign, verify } from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { TokenDto } from '../dto/token.dto';
import { IJwtPayload } from './jwt-payload.interface';
import { JwtDto } from '../dto/jwt.dto';

@Injectable()
export class JwtTokenService {
  private logger = new Logger(JwtTokenService.name);

  createAuthToken(payload: IJwtPayload): JwtDto {
    const expiresIn = parseInt(process.env.JWT_EXPIRATION_TIME, 10);
    const accessToken = this.createToken(payload);
    const refreshToken = this.createToken(payload, true);
    return {
      expiresIn,
      accessToken,
      refreshToken,
    };
  }

  createAppToken(payload: IJwtPayload): JwtDto {
    const expiresIn = parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME, 10);
    const accessToken = this.createToken(payload, false, true);
    const refreshToken = this.createToken(payload, true, true);
    return {
      expiresIn,
      accessToken,
      refreshToken,
    };
  }

  createToken(payload: IJwtPayload, isRefreshToken = false, isAppToken = false): string {
    const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET;
    let expiresIn = parseInt(
      isRefreshToken ? process.env.JWT_REFRESH_EXPIRATION_TIME : process.env.JWT_EXPIRATION_TIME,
      10,
    );

    if (isAppToken) {
      expiresIn *= 300;
    }

    return sign(payload, secret, {
      expiresIn,
      audience: process.env.FRONTEND_URL,
      issuer: process.env.BASE_URL,
    });
  }

  async verifyRefreshToken(token: string): Promise<TokenDto> {
    const secret = process.env.JWT_REFRESH_SECRET;

    return new Promise((resolve, reject) => {
      verify(token, secret, (err, decoded) => {
        if (err) {
          this.logger.error('Error verifying refresh token:', err.name);
          return reject(err);
        }
        resolve(decoded as TokenDto);
      });
    });
  }

  async verifyAccessToken(token: string): Promise<TokenDto> {
    const secret = process.env.JWT_SECRET;

    return new Promise((resolve, reject) => {
      verify(token, secret, (err, decoded) => {
        if (err) {
          this.logger.error('Error verifying access token:', err);
          return reject(err);
        }
        resolve(decoded as TokenDto);
      });
    });
  }
}
