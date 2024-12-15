import { ResData } from "../../../lib/resData";
import { IPark } from "./park.interface";

export interface IParkService {
  getAll(): Promise<ResData<Array<IPark>>>;
  create(dto:IPark): Promise<ResData<IPark>>;
  update(id: number, dto: IPark): Promise<ResData<IPark>>;
  delete(id: number): Promise<ResData<IPark>>;
  getById(id: number): Promise<ResData<IPark | undefined>>;
  getByName(name: string): Promise<ResData<IPark>>;

}
