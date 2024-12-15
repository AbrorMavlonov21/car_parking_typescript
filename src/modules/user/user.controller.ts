import { NextFunction, Request, Response } from "express";
import { IUserService } from "./interfaces/user.service";
import { validator } from "../../lib/validationScheam";
import { IUserDto, userDto } from "./dto/user.dto.interface";
import { CustomError } from "../../lib/customError";
import { userService } from "./user.service";

class UserController{
    constructor( private userService: IUserService){}

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const resData = await this.userService.getAll();

            res.status(resData.meta.statusCode).json(resData);
            
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction):Promise<void>{
        try {
            const dto = req.body;
            validator<IUserDto>(userDto, dto);

            const { meta } = await this.userService.getByPhone(dto.phone);

            if (meta.statusCode !== 404) {
                throw new CustomError(400, "User with this phone number already exist")
            }

            const resData = await this.userService.create(dto);

            res.status(resData.meta.statusCode).json(resData);
        } catch (error) {
            next(error);
        }
    }
    async update(req: Request, res: Response, next: NextFunction):Promise<void>{
        try {
            const dto = req.body;
            const userID = Number(req.params.id);
            validator<IUserDto>(userDto, dto);
            const { meta } = await this.userService.getByPhone(dto.phone);

            if (meta.statusCode !== 404) {
                throw new CustomError(400, "User with this phone number already exist")
            }
            const resData = await this.userService.update(userID, dto);

            res.status(resData.meta.statusCode).json(resData);
            
        } catch (error) {
            next(error);
        }

    }
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userID = Number(req.params.id);

            const resData = await this.userService.delete(userID);

            res.status(resData.meta.statusCode).json(resData);
        } catch (error) {
            next(error);
        }
    }
    
}

export const userController = new UserController(userService);