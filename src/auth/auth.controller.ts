import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { sign } from "jsonwebtoken";

import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly itemsService: UsersService
  ) {}

  @Post("google")
  async signIn(@Body() signInDto: { token: string }) {
    const userData = await this.authService.verifyGoogleToken(signInDto.token);

    if (userData) {
      const { sub, email, picture, given_name, family_name } = userData;

      let user = await this.itemsService.findByGoogleId(sub);

      if (!user) {
        user = await this.itemsService.create({
          googleId: sub,
          name: given_name,
          surname: family_name,
          email,
          picture,
        });
      }

      const token = sign(user, process.env.JWT_ACCESS_SECRET);

      return { token, userId: user._id };
    }

    return new UnauthorizedException();
  }
}
