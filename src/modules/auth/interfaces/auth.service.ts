import { ResData } from "../../../lib/resData";
import { IUser } from "../../user/interfaces/user.interface";
import { ILoginDto } from "../dto/login.dto";

export interface IAuthService {
  login(dto: ILoginDto): Promise<ResData<IUser>>;
}
