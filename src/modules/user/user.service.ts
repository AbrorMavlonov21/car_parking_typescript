import { CustomError } from "../../lib/customError";
import { ResData } from "../../lib/resData";
import { IUser } from "./interfaces/user.interface";
import { IUserRepository } from "./interfaces/user.repository";
import { IUserService } from "./interfaces/user.service";
import { userRepository } from "./user.repository";

class UserService implements IUserService {
  constructor(private repository: IUserRepository) {}

  async getByPhone(phone: string): Promise<ResData<IUser | undefined>> {
    const data: IUser | undefined = await this.repository.getOneByPhone(phone);

    const resData = new ResData<IUser | undefined>(200, "success", data);

    if (!data) {
      resData.meta.statusCode = 404;
      resData.meta.message = "user not found by phone";
    }

    return resData;
  }

  async getById(id: number): Promise<ResData<IUser>> {
    const data: IUser | undefined = await this.repository.getOneById(id);

    if (!data) {
      throw new CustomError(404, "user not found");
    }

    return new ResData<IUser>(200, "success", data);
  }
}

export const userService = new UserService(userRepository);
