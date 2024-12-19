import { CustomError } from "../../lib/customError";
import { ResData } from "../../lib/resData";
import { IPlace } from "./interfaces/interface";
import { IPlaceRepository } from "./interfaces/repository.interface";
import { IPlaceService } from "./interfaces/service.interface";
import { placeRepository } from "./places.repository";

class PlaceService implements IPlaceService {
    constructor(private repository: IPlaceRepository) {}

    async getAll(): Promise<ResData<Array<IPlace>>> {
        const data = await this.repository.getAll();

        const resData = new ResData(200, "Success", data);

        return resData;
    }
    async create(dto: IPlace): Promise<ResData<IPlace>> {
        const data = await this.repository.create(dto);

        const resData = new ResData(201, "Success Created", data);

        return resData;
    }
    async update(id: number, dto: IPlace): Promise<ResData<IPlace>> {
        const data = await this.repository.update(id, dto);

        const resData = new ResData(200, "Success Updated", data);

        return resData;
    }
    async delete(id: number): Promise<ResData<IPlace>> {
        const data = await this.repository.delete(id);

        const resData = new ResData(200, "Success Deleted", data);

        return resData;
    }
      async getById(id: number): Promise<ResData<IPlace | undefined>> {
          const data: IPlace | undefined = await this.repository.getById(id);
        
        if (!data) {
          throw new CustomError(404, "Place not found");
        }
        
          return new ResData<IPlace>(200, "success", data);
      }
}
export const placeService = new PlaceService(placeRepository)