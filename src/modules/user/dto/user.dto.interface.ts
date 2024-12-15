import * as Joi from "joi";

export interface IUserDto {
    phone: string;
    password: string;
    fullname: string;
};

export const userDto = Joi.object<IUserDto, true>({
    phone: Joi.string().required(),
    password: Joi.string().required(),
    fullname: Joi.string().required()
})