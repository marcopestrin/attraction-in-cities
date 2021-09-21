import Joi from "joi";

export const getInformationsSchema = {
    query: Joi.object().keys({
        cities: Joi.string().required()
    })
};