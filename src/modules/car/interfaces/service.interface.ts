import { ResData } from "../../../lib/resData";
import { ICar } from "./interface";

export interface ICarService{
    getAll():Promise<ResData<Array<ICar>>>;
    create(dto: ICar):Promise<ResData<ICar>>;
    update(id: number, dto: ICar): Promise<ResData<ICar>>;
    delete(id: number): Promise<ResData<ICar>>;
    getById(id: number): Promise<ResData<ICar | undefined>>;
    getByNomer(nomer: string): Promise<ResData<ICar | null>>;
}