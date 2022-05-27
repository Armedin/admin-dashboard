import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';

import { AuthProviderEnum } from '../enums/auth-provider.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { id, name, emails } = profile;
    return {
      provider: AuthProviderEnum.GOOGLE,
      id: id,
      name: name.givenName,
      email: emails[0].value,
    };
  }
}
