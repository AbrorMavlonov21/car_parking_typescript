import { repository, Repository } from "../../lib/repository";
import { IPlace } from "./interfaces/interface";
import { IPlaceRepository } from "./interfaces/repository.interface";

type CreateArgs =number | string;

class PlaceRepository implements IPlaceRepository {
    constructor(private repository: Repository) {}
    async getAll(): Promise<Array<IPlace>> {
        return await this.repository.multiple<IPlace, undefined>(
            "Select * from places"
        )
    }
    async create(dto: IPlace): Promise<IPlace> {
        return (await this.repository.single < IPlace, CreateArgs>(
            "Insert into places (name, status, park_id) values ($1, $2, $3) returning *",
            dto.name,
            dto.status,
            dto.park_id
        )) as IPlace
    }
    async update(id: number, dto: IPlace): Promise<IPlace> {
        return (await this.repository.single < IPlace, CreateArgs>(
            "UPDATE places SET name =$1, status =$2, park_id =$3 where id =$4 RETURNING *",
            dto.name, dto.status, dto.park_id, id
        ))as IPlace
    }
    async delete(id: number): Promise<IPlace> {
        return (await this.repository.single <IPlace, number>(
            "DELETE FROM places where id =$1",
            id
        ))as IPlace
    }
    async getById(id: number): Promise<IPlace | undefined> {
        return await this.repository.single<IPlace | undefined, number>(
          "select * from places where id = $1",
          id
        );
    }
}
export const placeRepository = new PlaceRepository(repository)