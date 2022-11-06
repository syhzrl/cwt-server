import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";

import Logging from "../lib/Logging";

import { ICard } from "../models/Card";

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    }

}

export const Schemas = {
    card: {
        create: Joi.object<ICard>({
            avatarId: Joi.string().required(),
            title: Joi.string().required(),
            desc: Joi.string().required(),
        }),
        update: Joi.object<ICard>({
            avatarId: Joi.string().required(),
            title: Joi.string().required(),
            desc: Joi.string().required(),
        }),
    },
}