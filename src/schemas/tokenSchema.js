import joi from "joi";

const tokenSchema = joi.string().required();

export default tokenSchema;