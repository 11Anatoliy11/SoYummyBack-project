const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 1,
    tlds: { allow: ["com", "net", "ua"] },
  }),

  password: Joi.string().min(6).max(16).required(),
});

module.exports = loginSchema;
