import { ICar } from "./interface";

export interface ICarRepository{
    getById(id: number): Promise<ICar | undefined>;
    getByNomer(nomer: string): Promise<ICar | null >;
    getAll(): Promise<Array<ICar>>;
    create(dto: ICar): Promise<ICar>;
    update(id: number, dto: ICar): Promise<ICar>;
    delete(id: number): Promise<ICar>;
}