import { repository, Repository } from "../../lib/repository";
import { IUser } from "./interfaces/user.interface";
import { IUserRepository } from "./interfaces/user.repository";

type CreateArgs = number | string | null;


export class UserRepository implements IUserRepository {
  constructor(private repository: Repository) {}
  async getAll(): Promise<Array<IUser>> {
    return await this.repository.multiple < IUser, undefined >(
      "SELECT * FROM users"
    );
  }
   async create(dto: IUser): Promise<IUser> {
    return (await this.repository.single<IUser, CreateArgs>(
      "INSERT INTO users (phone , password, fullname) values ($1, $2, $3) returning *",
      dto.phone,
      dto.password,
      dto.fullname
    )) as IUser
  }
  async update(id: number, dto: IUser): Promise<IUser> {
    return (await this.repository.single<IUser, CreateArgs>(
      "UPDATE users SET phone = $1, password = $2, fullname = $3 where id =$4 RETURNING *",
      dto.phone,
      dto.password,
      dto.fullname,
      id
    )) as IUser;
  }
  async delete(id: number): Promise<IUser> {
    return (await this.repository.single<IUser, number>(
      "delete from users where id =$1",
      id
    ))as IUser;
  }

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
