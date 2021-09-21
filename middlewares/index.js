import Joi from "joi";

const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

const types = ["params", "query", "body", "headers", "path"];

const validate = schema => ( req, res, next ) => {
    const validSchema = pick(schema, types);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi
        .compile(validSchema)
        .prefs({
            errors: {
                label: 'key'
            }
        })
        .validate(object);
    if (error) {
        res.status(403).json({
            success: false,
            message: error.details.map((details) => details.message).join(', ')
        });
        return;
    }
    Object.assign(req, value);
    return next();
}

export default validate;