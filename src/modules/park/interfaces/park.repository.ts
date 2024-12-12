import { IPark } from "./park.interface";

export interface IParkRepository {
  getAll(): Promise<Array<IPark>>;
  create(park: IPark): Promise<IPark | undefined>;
  getById(id: number): Promise<IPark | undefined>;
}
