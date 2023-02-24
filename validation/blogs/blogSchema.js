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
      .max(2500)
      .messages({
        "string.min": "Title should min {#limit} characters",
        "string.max": "Title should max {#limit} characters",
      })
      .required(),
  }).unknown(true),

  blogLikes: joi.object({
    blogLikes: joi.boolean().required()
  }).unknown(true),

  editBlog: joi.object({
    blogTitle: joi
      .string()
      .min(2)
      .max(100)
      .messages({
        "string.min": "Title should min {#limit} characters",
        "string.max": "Title should max {#limit} characters",
      }),
    blogDescription: joi
      .string()
      .min(2)
      .max(2500)
      .messages({
        "string.min": "Title should min {#limit} characters",
        "string.max": "Title should max {#limit} characters",
      }),
  }).unknown(true),

  searchBlog: joi.object({
    blogTitle: joi.string().required(),
  }).unknown(true),
};

module.exports = schema