import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";

import { BcryptModule } from "../../utilities/bcrypt/bcrypt.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { JwtTokenService } from "./jwt/jwt-token.service";

import { GoogleStrategy } from "./google/google.strategy";

@Module({
  imports: [
    UserModule,
    BcryptModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtTokenService,
    GoogleStrategy,
    { provide: "config", useFactory: () => require("config") },
  ],
})
export class AuthModule {}
