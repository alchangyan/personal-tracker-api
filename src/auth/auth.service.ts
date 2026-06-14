import { Injectable } from "@nestjs/common";
// import { UsersService } from "../users/users.service";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthService {
  // constructor(private readonly usersService: UsersService) {}

  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  async verifyGoogleToken(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      return payload;
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}
