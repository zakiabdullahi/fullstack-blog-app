import joi from 'joi'
export const validateUserRegistration = (req, res, next) => {

    const schema = joi.object({
        username: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    })


    const { error } = schema.validate(req.body)


    if (error) {
        // console.log("error details", error.details);
        return res.status(400).send(error.details[0].message);
    }

    next();

}
export const validateUserLogin = (req, res, next) => {

    const schema = joi.object({
        username: joi.string().min(3).max(30).required(),
        password: joi.string().min(8).required()
    })


    const { error } = schema.validate(req.body)


    if (error) {
        // console.log("error details", error.details);
        return res.status(400).send(error.details[0].message);
    }

    next();

}