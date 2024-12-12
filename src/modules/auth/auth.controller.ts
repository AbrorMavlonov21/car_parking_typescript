import { NextFunction, Request, Response } from "express";
import { IAuthService } from "./interfaces/auth.service";
import { validator } from "../../lib/validationScheam";
import { ILoginDto, loginDto } from "./dto/login.dto";
import { authService } from "./auth.service";

class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body;

      validator<ILoginDto>(loginDto, dto);

      const resData = await this.authService.login(dto);

      res.status(resData.meta.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController(authService);
