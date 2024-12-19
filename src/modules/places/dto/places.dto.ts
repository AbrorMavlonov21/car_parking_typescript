import * as Joi from 'joi';

export interface IPlaceDto{
    name: string;
    status: string;
    park_id: number;
}

export const PlaceDto = Joi.object<IPlaceDto, true>({
    name: Joi.string().max(256).required(),
    status: Joi.string().default("free"),
    park_id: Joi.number().integer().min(1).required()
})