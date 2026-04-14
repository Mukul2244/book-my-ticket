import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js"

class RegisterDto extends BaseDto {
    static schema = Joi.object({
        username: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string()
            .min(8).required()
            .messages({
                "string.min": "Password must contain at least 8 characters",
                "any.required": "Password is required"
            }),
    })
}

export default RegisterDto