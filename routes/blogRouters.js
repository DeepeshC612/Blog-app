const Router = require("express").Router()
const blog = require("../controllers/blogControllers");
const validation = require('../validation/blogs/blogValidation')
const authorization = require('../middlewares/authMiddleware')
const { upload } = require("../middlewares/multiStoreMiddleware");

Router.post(
    "/create/:id", 
    upload.single("blogImage"),
    validation.addBlogValidation,
    blog.creatBlog
);
Router.get(
    "/list",  
    blog.allBlog
);
Router.post(
    "/details/:id",  
    blog.detailBlog
);
Router.post(
    "/:id",
    authorization.checkUserAuth,
    blog.userBlog
);
Router.get(
    "/search",
    validation.searchBlogValidation,
    blog.searchBlog
);
Router.patch(
    "/edit/:id",
    authorization.checkUserAuth,
    validation.editBlogValidation,
    blog.editBlog
);
Router.patch(
    "/like/:id",
    validation.blogLikeValidation, 
    blog.blogLike
);
Router.delete(
    "/delete/:id",
    authorization.checkUserAuth,  
    blog.deleteBlog
);

module.exports = Router;
