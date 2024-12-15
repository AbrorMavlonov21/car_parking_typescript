import { ResData } from "../../../lib/resData";
import { IUser } from "./user.interface";

export interface IUserService {
  getById(id: number): Promise<ResData<IUser | undefined>>;
  getByPhone(phone: string): Promise<ResData<IUser | undefined>>;
  getAll(): Promise<ResData<Array<IUser>>>;
  create(dto:IUser): Promise<ResData<IUser>>;
  update(id: number, dto: IUser): Promise<ResData<IUser>>;
  delete(id: number): Promise<ResData<IUser>>;
}
