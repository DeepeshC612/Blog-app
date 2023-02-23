const joi = require("joi");

const schema = {
  addBlog: joi.object({
    blogTitle: joi
      .string()
      .min(2)
      .max(100)
      .messages({
        "string.min": "Title should min {#limit} characters",
        "string.max": "Title should max {#limit} characters",
      })
      .required(),
    blogDescription: joi
      .string()
      .min(2)
      .max(500)
      .messages({
        "string.min": "Title should min {#limit} characters",
        "string.max": "Title should max {#limit} characters",
      })
      .required(),
  }),
  blogLikes: joi.object({
    blogLikes: joi.boolean().required()
  })
};
