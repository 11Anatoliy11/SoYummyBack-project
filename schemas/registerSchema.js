const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 1,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  name: Joi.string().required().min(1).max(16),
  password: Joi.string().min(6).max(16).required(),
});

module.exports = registerSchema;
