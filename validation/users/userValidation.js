const userValidation = require("./userSchema");

module.exports = {
  registerUserValidation: async (req, res, next) => {
    const regUserValues = await userValidation.registerUser.validate(req.body, {
      abortEarly: false,
    });
    if (regUserValues.error) {
      res.status(400).json({
        success: 0,
        error: regUserValues.error.details[0].message,
      });
    } else {
      next();
    }
  },

  loginUserValidation: async (req, res, next) => {
    const loginUserValues = await userValidation.loginUser.validate(req.body, {
      abortEarly: false,
    });
    if (loginUserValues.error) {
      res.status(400).json({
        success: 0,
        error: loginUserValues.error.details[0].message,
      });
    } else {
      next();
    }
  },

  resetPassValidation: async (req, res, next) => {
    const ResetPassValues = await userValidation.resetPass.validate(req.body, {
      abortEarly: false,
    });
    if (ResetPassValues.error) {
      res.status(400).json({
        success: 0,
        error: ResetPassValues.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
