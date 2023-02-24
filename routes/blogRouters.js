const Router = require("express").Router()
const blog = require("../controllers/blogControllers");
const validation = require('../validation/blogs/blogValidation')
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
    "/myblog/:id",  
    blog.userBlog
);
Router.get(
    "/search",
    validation.searchBlogValidation,
    blog.searchBlog
);
Router.patch(
    "/edit/:id",
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
    blog.deleteBlog
);

module.exports = Router;
