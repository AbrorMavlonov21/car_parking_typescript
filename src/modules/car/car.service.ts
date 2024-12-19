import { CustomError } from "../../lib/customError";
import { ResData } from "../../lib/resData";
import { carRepository } from "./car.repository";
import { ICar } from "./interfaces/interface";
import { ICarRepository } from "./interfaces/repository.interface";
import { ICarService } from "./interfaces/service.interface";

class CarService implements ICarService {
    constructor(private repository: ICarRepository) {}

    async getById(id: number): Promise<ResData<ICar | undefined>> {
    const data: ICar | undefined = await this.repository.getById(id);

    if (!data) {
      throw new CustomError(404, "Car not found");
    }

    return new ResData<ICar>(200, "Success", data);
    }

    async getByNomer(nomer: string): Promise<ResData<ICar | null>> {
        const data = await this.repository.getByNomer(nomer);

        return data ? new ResData<ICar>(200, "Car found", data) : new ResData<ICar | null>(404, "Car not found", null);
    }


    async getAll(): Promise<ResData<Array<ICar>>> {
        const data = await this.repository.getAll();

        const resData = new ResData(200, "Success", data);

        return resData;
    }

    async create(dto: ICar): Promise<ResData<ICar>> {
        const data = await this.repository.create(dto);

        const resData = new ResData(201, "Successfully created", data);

        return resData;
    }

    async update(id: number, dto: ICar): Promise<ResData<ICar>> {
        const data = await this.repository.update(id, dto);

        const resData = new ResData(200, "Successfully Updated", data);

        return resData;
    }
    async delete(id: number): Promise<ResData<ICar>> {
        const data = await this.repository.delete(id);

        const resData = new ResData(200, "Successfully deleted", data);

        return resData;
    }
}
export const carService = new CarService(carRepository)