import { IUser } from "./user.interface";

export interface IUserRepository {
  getOneById(id: number): Promise<IUser | undefined>;
  getOneByPhone(phone: string): Promise<IUser | undefined>;
}
