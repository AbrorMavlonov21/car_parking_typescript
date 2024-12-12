import { ResData } from "../../lib/resData";
import { IPark } from "./interfaces/park.interface";
import { IParkRepository } from "./interfaces/park.repository";
import { IParkService } from "./interfaces/park.service";
import { parkRepository } from "./park.repository";

class ParkService implements IParkService {
  constructor(private repository: IParkRepository) {}

  async getAll(): Promise<ResData<Array<IPark>>> {
    const data = await this.repository.getAll();

    return new ResData<Array<IPark>>(200, "success", data);
  }
}

export const parkService = new ParkService(parkRepository);
