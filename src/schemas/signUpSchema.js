import joi from "joi";

const signUpSchema = joi.object({
    email: joi.string().email().max(100).required(),
    password: joi.string().required(),
    username: joi.string().max(100).required(),
    pictureUrl: joi.string().required()    
});

export default signUpSchema;