import { IPlace } from "./interface";

export interface IPlaceRepository{
    getAll():Promise<Array<IPlace>>;
    create(dto: IPlace):Promise<IPlace>;
    update(id:number, dto:IPlace):Promise<IPlace>;
    delete(id:number):Promise<IPlace>;
    getById(id:number):Promise<IPlace | undefined>
}