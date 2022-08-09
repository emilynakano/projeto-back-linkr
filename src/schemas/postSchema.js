import joi from "joi";
const postSchema = joi.object({
    url: joi.string().uri().required(),
    content: joi.string()
})
export default postSchema