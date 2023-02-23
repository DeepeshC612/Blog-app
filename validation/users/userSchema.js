const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const schema = {
  registerUser: joi
    .object({
      userName: joi
        .string()
        .min(2)
        .max(20)
        .messages({
          "string.min": "Username should min {#limit} characters",
          "string.max": "Username should max {#limit} characters",
        })
        .required(),
      userEmail: joi
        .string()
        .email()
        .message("Provide valid email address")
        .required(),
      userPass: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .message({
          "password.minOfSpecialCharacters":
            "{#label} should contain atleast {#min} special character",
          "password.minOfLowercase":
            "{#label} should contain atleast {#min} lowercase character",
          "password.minOfUppercase":
            "{#label} should contain atleast {#min} uppercase character",
          "password.minOfNumeric":
            "{#label} should contain atleast {#min} numeric character",
          "password.noWhiteSpaces": "{#label} should not contain white spaces",
        })
        .required(),
      phoneNum: joi
        .number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .messages({
          "number.min": "Number should starts with {#limit}",
          "number.max": "Number should be {#limit}"
        })
        .required(),
      city: joi.string().required().messages({
        "string.empty": "You must provide your city name, {userName}",
      }),
      state: joi.string().required().messages({
        "string.empty": "You must provide your city name, {userName}",
      }),
    })
    .unknown(true),

  loginUser: joi.object({
      userEmail: joi
        .string()
        .email()
        .message("Provide vaild email address")
        .required(),
      userPass: joi.string().required(),
    }),

  resetPass: joi.object({
      newPass: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .message({
        "password.minOfSpecialCharacters":
          "{#label} should contain atleast {#min} special character",
        "password.minOfLowercase":
          "{#label} should contain atleast {#min} lowercase character",
        "password.minOfUppercase":
          "{#label} should contain atleast {#min} uppercase character",
        "password.minOfNumeric":
          "{#label} should contain atleast {#min} numeric character",
        "password.noWhiteSpaces": "{#label} should not contain white spaces",
      })
      .required(),
    })
    .unknown(true),
};

module.exports = schema;
