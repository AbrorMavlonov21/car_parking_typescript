import { IPark } from "./park.interface";

export interface IParkRepository {
  getAll(): Promise<Array<IPark>>;
  create(dto: IPark): Promise<IPark>;
  getById(id: number): Promise<IPark | undefined>;
  update(id:number, dto: IPark) : Promise<IPark>;
  delete(id:number):Promise<IPark>;
  getByName(name:string):Promise<IPark>;
}
