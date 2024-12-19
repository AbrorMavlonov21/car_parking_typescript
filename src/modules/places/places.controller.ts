import { NextFunction, Request, Response } from "express";
import { IPlaceService } from "./interfaces/service.interface";
import { validator } from "../../lib/validationScheam";
import { IPlaceDto, PlaceDto } from "./dto/places.dto";
import { CustomError } from "../../lib/customError";
import { IParkService } from "../park/interfaces/park.service";
import { placeService } from "./places.service";
import { parkService } from "../park/park.service";

class PlaceController {
    constructor(private placeService : IPlaceService, private parkService : IParkService) {}

     async getAll(req: Request, res: Response, next: NextFunction): Promise<void>{
            try {
                const resData = await this.placeService.getAll();
    
                res.status(resData.meta.statusCode).json(resData);
                
            } catch (error) {
                next(error);
            }
        }
    
        async create(req: Request, res: Response, next: NextFunction):Promise<void>{
            try {
                const dto = req.body;
                validator<IPlaceDto>(PlaceDto, dto);

                await this.parkService.getById(dto.park_id)
    
                const resData = await this.placeService.create(dto);
    
                res.status(resData.meta.statusCode).json(resData);
            } catch (error) {
                next(error);
            }
        }
        async update(req: Request, res: Response, next: NextFunction):Promise<void>{
            try {
                const dto = req.body;
                const placeID = Number(req.params.id);
                validator<IPlaceDto>(PlaceDto, dto);

                await this.placeService.getById(placeID);

                await this.parkService.getById(dto.park_id)

                const resData = await this.placeService.update(placeID, dto);
    
                res.status(resData.meta.statusCode).json(resData);
                
            } catch (error) {
                next(error);
            }
    
        }
        async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const placeID = Number(req.params.id);

                await this.placeService.getById(placeID);
    
                const resData = await this.placeService.delete(placeID);
    
                res.status(resData.meta.statusCode).json(resData);
            } catch (error) {
                next(error);
            }
        }
}
export const placeController = new PlaceController(placeService, parkService)