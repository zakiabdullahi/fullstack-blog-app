import joi from 'joi';
export const validatePostRegistration = (req, res, next) => {

    const schema = joi.object({
        title: joi.string().min(5).max(250).required(),
        content: joi.string().min(10).required()
    })


    const { error } = schema.validate(req.body)


    if (error) {
        // console.log("error details", error.details);
        return res.status(400).send(error.details[0].message);
    }

    next();

}