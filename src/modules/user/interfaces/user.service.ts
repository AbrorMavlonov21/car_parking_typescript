import { ResData } from "../../../lib/resData";
import { IUser } from "./user.interface";

export interface IUserService {
  getById(id: number): Promise<ResData<IUser>>;
  getByPhone(phone: string): Promise<ResData<IUser | undefined>>;
}
