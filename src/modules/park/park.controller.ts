import { NextFunction, Request, Response } from "express";
import { IParkService } from "./interfaces/park.service";
import { parkService } from "./park.service";
import { validator } from "../../lib/validationScheam";
import { IParkDto, parkDto } from "./dto/park.dto";
import { CustomError } from "../../lib/customError";
import { IUserService } from "../user/interfaces/user.service";
import { userService } from "../user/user.service";

class ParkController {
  constructor(private parkService: IParkService, private userService: IUserService) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const resData = await this.parkService.getAll();

    res.status(resData.meta.statusCode).json(resData);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body;

      validator<IParkDto>(parkDto, dto);

      const {meta} = await this.parkService.getByName(dto.name);

      if (meta.statusCode === 200) {
        throw new CustomError(400, "Park with such name already exist")
      }
      


      const foundUser = await this.userService.getById(dto.owner);

      if (!foundUser) {
        throw new CustomError(404, "Owner not found");
      }

      const resData = await this.parkService.create(dto);

      res.status(resData.meta.statusCode).json(resData);

    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body;

      const parkID = Number(req.params.id)

      validator<IParkDto>(parkDto, dto);

      const { meta } = await this.parkService.getByName(dto.name);

      if (meta.statusCode === 200) {
        throw new CustomError(400, "Park with such name already exist")
      }


      const foundUser = await this.userService.getById(dto.owner);

      if (!foundUser) {
        throw new CustomError(404, "Owner not found");
      }

      const resData = await this.parkService.update(parkID, dto);
        
      

      res.status(resData.meta.statusCode).json(resData);

    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parkID = Number(req.params.id);

      const { meta } = await this.parkService.getById(parkID);

      const resData = await this.parkService.delete(parkID);

      res.status(resData.meta.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  
}

export const parkController = new ParkController(parkService, userService);
