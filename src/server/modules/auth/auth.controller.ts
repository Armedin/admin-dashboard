import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  BadRequestException,
  InternalServerErrorException,
  UseGuards,
  Redirect,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtTokenService } from './jwt/jwt-token.service';
import { AuthProviderEnum } from './enums/auth-provider.enum';
import { AccessTokenDto } from './dto/access-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return user;
  }

  @Post('refresh')
  public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<LoginResponseDto> {
    try {
      const token = await this.jwtTokenService.verifyRefreshToken(refreshTokenDto.refreshToken);

      return await this.authService.refreshToken(token.id, token.email);
    } catch (e) {
      if (e.name === 'JsonWebTokenError') {
        throw new BadRequestException('Could not refresh token.', 'JsonWebTokenError');
      } else if (e.name === 'TokenExpiredError') {
        throw new BadRequestException('Refresh token has expired.', 'RefreshTokenExpiredError');
      }

      throw new InternalServerErrorException(e);
    }
  }

  // Third party auth

  @Post('success')
  async getUserByAccessToken(@Body() accessTokenDto: AccessTokenDto) {
    try {
      const token = await this.jwtTokenService.verifyAccessToken(accessTokenDto.accessToken);

      return await this.authService.getUserFromSuccessAuth(token.id, token.email);
    } catch (e) {
      if (e.name === 'JsonWebTokenError') {
        throw new BadRequestException('Could not refresh token.', 'JsonWebTokenError');
      } else if (e.name === 'TokenExpiredError') {
        throw new BadRequestException('Refresh token has expired.', 'RefreshTokenExpiredError');
      }

      throw new InternalServerErrorException(e);
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Guard redirects
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = await this.authService.thirdPartyLogin(req, AuthProviderEnum.GOOGLE);
    if (!user.accessToken) {
      res.redirect(`${process.env.FRONTEND_URL}/login?fail`);
    }

    res.redirect(
      `${process.env.FRONTEND_URL}/login?success&accessToken=${user.accessToken}&provider=${AuthProviderEnum.GOOGLE}`,
    );
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookuth() {
    // Guard redirects
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req, @Res() res) {
    const user = await this.authService.thirdPartyLogin(req, AuthProviderEnum.FACEBOOK);
    if (!user.accessToken) {
      res.redirect(`${process.env.FRONTEND_URL}/login?fail`);
    }

    res.redirect(
      `${process.env.FRONTEND_URL}/login?success&accessToken=${user.accessToken}&provider=${AuthProviderEnum.FACEBOOK}`,
    );
  }

  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  async appleAuth() {
    // Guard redirects
  }

  @Get('apple/redirect')
  @UseGuards(AuthGuard('apple'))
  async appleAuthRedirect(@Req() req, @Res() res) {
    const user = await this.authService.thirdPartyLogin(req, AuthProviderEnum.APPLE);
    if (!user.accessToken) {
      res.redirect(`${process.env.FRONTEND_URL}/login?fail`);
    }

    res.redirect(
      `${process.env.FRONTEND_URL}/login?success&accessToken=${user.accessToken}&provider=${AuthProviderEnum.APPLE}`,
    );
  }
}
