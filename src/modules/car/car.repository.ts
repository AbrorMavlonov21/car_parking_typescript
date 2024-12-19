import { string } from "joi";
import { repository, Repository } from "../../lib/repository";
import { ICar } from "./interfaces/interface";
import { ICarRepository } from "./interfaces/repository.interface";

type CreateArgs = string| number;

class CarRepository implements ICarRepository {
    constructor(private repository: Repository) {}
    async getById(id: number): Promise<ICar | undefined> {
        return await this.repository.single<ICar | undefined, number>(
              "select * from cars where id = $1",
              id
            );
    }
    async getByNomer(nomer: string): Promise<ICar | null> {
        const result = await this.repository.single<ICar | null, string>(
            "SELECT * FROM cars WHERE nomer = $1",
            nomer
        );
        return result ? result : null;
    }

    async getAll(): Promise<Array<ICar>> {
        return await this.repository.multiple<ICar, undefined>(
            "Select * from cars"
        );
    }
    async create(dto: ICar): Promise<ICar> {
        return (await this.repository.single<ICar, CreateArgs>(
            "Insert into cars (model, nomer, owner) values ($1, $2, $3) RETURNING *",
            dto.model,
            dto.nomer,
            dto.owner
        )) as ICar
    }
    async update(id: number, dto: ICar): Promise<ICar> {
        return (await this.repository.single<ICar, CreateArgs>(
            "Update cars SET model = $1, nomer = $2, owner = $3 where id = $4 RETURNING *",
            dto.model,
            dto.nomer,
            dto.owner,
            id
        )) as ICar
    }
    async delete(id: number): Promise<ICar> {
        return (await this.repository.single<ICar, number>(
            "delete from cars where id = $1 RETURNING *",
            id
        )) as ICar
    }
}
export const carRepository = new CarRepository(repository)