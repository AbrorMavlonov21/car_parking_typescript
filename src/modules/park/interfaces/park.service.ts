import { ResData } from "../../../lib/resData";
import { IPark } from "./park.interface";

export interface IParkService {
  getAll(): Promise<ResData<Array<IPark>>>;
}
