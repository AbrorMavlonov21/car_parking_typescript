import { CustomError } from "../../lib/customError";
import { ResData } from "../../lib/resData";
import { IUser } from "../user/interfaces/user.interface";
import { IUserService } from "../user/interfaces/user.service";
import { ILoginDto } from "./dto/login.dto";
import { IAuthService } from "./interfaces/auth.service";
import { jwtService } from "../../lib/jwt";
import { userService } from "../user/user.service";

class AuthService implements IAuthService {
  constructor(private readonly userService: IUserService) {}

  async login(dto: ILoginDto): Promise<ResData<IUser>> {
    const foundUser = await this.userService.getByPhone(dto.phone);

    if (!foundUser.data) {
      throw new CustomError(400, "login or password wrong!");
    }

    // const isCorrect = await Bcrypt.compare(
    //   dto.password,
    //   foundUser.data.password
    // );

    // if (!isCorrect) {
    //   throw new CustomError(400, "login or password wrong!");
    // }

    const token = jwtService.generate({ id: foundUser.data.id });

    const resData = new ResData<IUser>(200, "success", foundUser.data, {
      token,
    });

    return resData;
  }
}
 
export const authService = new AuthService(userService);
