const blogValidation = require("./blogSchema");

module.exports = {
  addBlogValidation: async (req, res, next) => {
    const addBlogValues = await blogValidation.addBlog.validate(req.body, {
      abortEarly: false,
    });
    if (addBlogValues.error) {
      res.status(400).json({
        success: 0,
        error: addBlogValues.error.details[0].message,
      });
    } else {
      next();
    }
  },
  editBlogValidation: async (req, res, next) => {
    const editBlogValues = await blogValidation.editBlog.validate(req.body, {
      abortEarly: false,
    });
    if (editBlogValues.error) {
      res.status(400).json({
        success: 0,
        error: editBlogValues.error.details[0].message,
      });
    } else {
      next();
    }
  },
  blogLikeValidation: async (req, res, next) => {
      const blogLikeValues = await blogValidation.blogLikes.validate(req.body, {
          abortEarly: false,
        });
        if (blogLikeValues.error) {
            res.status(400).json({
                success: 0,
                error: blogLikeValues.error.details[0].message,
            });
        } else {
            next();
        }
    },
};
