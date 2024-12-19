import { NextFunction, Request, Response } from "express";
import { ICarService } from "./interfaces/service.interface";
import { ResData } from "../../lib/resData";
import { validator } from "../../lib/validationScheam";
import { CarDto, ICarDto } from "./dto/car.dto";
import { CustomError } from "../../lib/customError";
import { IUserService } from "../user/interfaces/user.service";
import { carService } from "./car.service";
import { userService } from "../user/user.service";

class CarController {
    constructor(private carService: ICarService, private userService: IUserService) {}

    async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const resData = await this.carService.getAll();

            res.status(resData.meta.statusCode).json(resData);

        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        try {
            const dto = req.body;

            validator<ICarDto>(CarDto, dto);

            const foundCarNomer = await this.carService.getByNomer(dto.nomer);

            if (foundCarNomer.meta.statusCode === 200) {
                throw new CustomError(400, "Nomer already exists for another car");
            }

            await this.userService.getById(dto.owner);
            
            const resData = await this.carService.create(dto);

            res.status(resData.meta.statusCode).json(resData);

        } catch (error) {
            next(error);
        }
    }
    async update(req: Request, res: Response, next: NextFunction){
        try {
            const dto = req.body;
            const carID = Number(req.params.id);

            validator<ICarDto>(CarDto, dto);

            await this.carService.getById(carID);

            const foundCarNomer = await this.carService.getByNomer(dto.nomer);

            if (foundCarNomer.meta.statusCode === 200) {
                throw new CustomError(400, "Nomer already exists for another car");
            }

            await this.userService.getById(dto.owner);

            const resData = await this.carService.update(carID, dto);

            res.status(resData.meta.statusCode).json(resData);
            
        } catch (error) {
            next(error);
        }

    }
    async delete(req: Request, res: Response, next: NextFunction){
        try {
            const carID = Number(req.params.id);

            await this.carService.getById(carID);

            const resData = await this.carService.delete(carID);

            res.status(resData.meta.statusCode).json(resData);


        } catch (error) {
            next(error);
        }
    }
}
export const carController = new CarController(carService, userService)