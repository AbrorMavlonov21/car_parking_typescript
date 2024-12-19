import { ResData } from "../../../lib/resData";
import { IPlace } from "./interface";

export interface IPlaceService{
    getAll():Promise<ResData<Array<IPlace>>>;
    create(dto: IPlace):Promise<ResData<IPlace>>;
    update(id:number, dto:IPlace):Promise<ResData<IPlace>>;
    delete(id:number):Promise<ResData<IPlace>>;
    getById(id: number): Promise<ResData<IPlace | undefined>>;

}