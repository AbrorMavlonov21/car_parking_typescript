import * as Joi from "joi";


export interface IParkDto {
    name: string;
    phone: string | null;
    owner: number;
};

export const parkDto = Joi.object<IParkDto, true>({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    owner: Joi.number().required(),
})