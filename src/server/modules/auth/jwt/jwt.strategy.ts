import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IJwtPayload } from "./jwt-payload.interface";
import { UserService } from "../../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: IJwtPayload) {
    const { email } = payload;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("User could not be validated.");
    }

    return user;
  }
}
