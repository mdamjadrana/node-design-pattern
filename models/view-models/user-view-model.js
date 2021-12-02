import Joi from 'joi'

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required()
    })
    const result = schema.validate(data)
    data.createdAt = new Date();
    result.value = data;
    
    return result;
}

export default validate;