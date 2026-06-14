import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { verify } from "jsonwebtoken";

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Access Denied");
    }

    const token = authHeader.split(" ").at(-1);

    try {
      const res = verify(token, process.env.JWT_ACCESS_SECRET);
      console.log(res);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Access Denied");
    }

    return true;
  }
}
