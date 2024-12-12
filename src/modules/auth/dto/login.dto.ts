import * as Joi from "joi";

export interface ILoginDto {
  phone: string;
  password: string;
}

export const loginDto = Joi.object<ILoginDto, true>({
  phone: Joi.string().required(),
  password: Joi.string().required(),
});
