import jwt from "jsonwebtoken";
import { config } from "../config/index";
interface IJwtData {
  id: number;
}

class Jwt {
  constructor(
    private readonly accSecret: string,
    private readonly refreshSecret: string
  ) {}

  generate(data: IJwtData): {
    accessToken: string;
    refreshToken: string;
  } {
    const accToken = jwt.sign(data, this.accSecret);
    const refToken = jwt.sign(data, this.refreshSecret);

    return {
      accessToken: accToken,
      refreshToken: refToken,
    };
  }

  vaerifyAcc(token: string): IJwtData {
    return jwt.verify(token, this.accSecret) as IJwtData;
  }

  vaerifyRef(token: string): IJwtData {
    return jwt.verify(token, this.refreshSecret) as IJwtData;
  }
}

export const jwtService = new Jwt(
  config.JWT_ACCESS_SECRET,
  config.JWT_REFRESH_SECRET
);
