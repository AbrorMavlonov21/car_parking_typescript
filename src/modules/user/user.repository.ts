import { repository, Repository } from "../../lib/repository";
import { IUser } from "./interfaces/user.interface";
import { IUserRepository } from "./interfaces/user.repository";

class UserRepository implements IUserRepository {
  constructor(private repository: Repository) {}

  async getOneById(id: number): Promise<IUser | undefined> {
    return await this.repository.single<IUser, number>(
      "SELECT * FROM users WHERE id = $1",
      id
    );
  }
  async getOneByPhone(phone: string): Promise<IUser | undefined> {
    return await this.repository.single<IUser, string>(
      "SELECT * FROM users WHERE phone = $1",
      phone
    );
  }
}

export const userRepository = new UserRepository(repository);
