import { repository, Repository } from "../../lib/repository";
import { IPark } from "./interfaces/park.interface";
import { IParkRepository } from "./interfaces/park.repository";

type CreateArgs = number | string | null;

export class ParkRepository implements IParkRepository {
  constructor(private readonly repository: Repository) {}

  async getAll(): Promise<Array<IPark>> {
    return await this.repository.multiple<IPark, undefined>(
      "select * from parks"
    );
  }

  async create(park: IPark): Promise<IPark> {
    return (await this.repository.single<IPark, CreateArgs>(
      "insert into parks (name, phone, owner) values ($1, $2, $3) returning *",
      park.name,
      park.phone,
      park.owner
    )) as IPark;
  }
  async getById(id: number): Promise<IPark | undefined> {
    return await this.repository.single<IPark | undefined, number>(
      "select * from parks where id = $1",
      id
    );
  }
}

export const parkRepository = new ParkRepository(repository);
