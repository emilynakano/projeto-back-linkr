import joi from "joi";
const postSchema = joi.object({
    url: joi.string().uri().required(),
    content: joi.string().allow(null).allow('')
})
export default postSchema