import * as Joi from 'joi';

export interface ICarDto{
    model: string;
    nomer: string;
    owner: number;
}

export const CarDto = Joi.object < ICarDto, true>({
    model: Joi.string().max(64).required(),
    nomer: Joi.string().max(36).required(),
    owner: Joi.number().required()
})