import joi from "joi";

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().required(),
    pictureUrl: joi.string().uri().required()    
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()  
});

