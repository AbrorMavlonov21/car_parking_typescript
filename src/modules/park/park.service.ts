import { CustomError } from "../../lib/customError";
import { ResData } from "../../lib/resData";
import { IPark } from "./interfaces/park.interface";
import { IParkRepository } from "./interfaces/park.repository";
import { IParkService } from "./interfaces/park.service";
import { parkRepository } from "./park.repository";

class ParkService implements IParkService {
  constructor(private repository: IParkRepository) {}
  async getByName(name: string): Promise<ResData<IPark>> {
    const data = await this.repository.getByName(name);

    if (!data) {
      return new ResData<IPark>(404, "Park not found", data)
    }
    return new ResData<IPark>(200, "success", data);
  }

  async create(dto: IPark): Promise<ResData<IPark>> {
    const data = await this.repository.create(dto);

    const resData = new ResData(200, 'Successfully Created', data);
    
    return resData
  }

  async update(id: number, dto: IPark): Promise<ResData<IPark>> {
    const data = await this.repository.update(id, dto);

    const resData = new ResData(200, 'Successfully Updated', data);

    return resData
  }

  async delete(id: number): Promise<ResData<IPark>> {
    const data = await this.repository.delete(id);

    const resData = new ResData(200, 'Successfully Deleted', data);

    return resData
  }

  async getById(id: number): Promise<ResData<IPark | undefined>> {
    const data: IPark | undefined = await this.repository.getById(id);
    
    if (!data) {
      throw new CustomError(404, "Park not found");
    }
    
    return new ResData<IPark>(200, "success", data);
  }

  async getAll(): Promise<ResData<Array<IPark>>> {
    const data = await this.repository.getAll();

    return new ResData<Array<IPark>>(200, "success", data);
  }
  
}

export const parkService = new ParkService(parkRepository);
