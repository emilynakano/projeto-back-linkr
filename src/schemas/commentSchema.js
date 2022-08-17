import joi from "joi";

export const commentSchema = joi.object({
    id: joi.number().required(),
    comment: joi.string().required()  
});

export default commentSchema;