import { IUser } from "./user.interface";

export interface IUserRepository {
  getOneById(id: number): Promise<IUser | undefined>;
  getOneByPhone(phone: string): Promise<IUser | undefined>;
  getAll(): Promise<Array<IUser>>;
  create(dto: IUser): Promise<IUser>;
  update(id: number, dto: IUser): Promise<IUser>;
  delete(id: number): Promise<IUser>;
}
