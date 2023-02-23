const Router = require("express").Router()
const blog = require("../controllers/blogControllers");
const { upload } = require("../middlewares/multiStoreMiddleware");

Router.post(
    "/create/:id", 
    upload.single("blogImage"), 
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
Router.patch(
    "/edit/:id",  
    blog.editBlog
);
Router.patch(
    "/like/:id",  
    blog.blogLike
);
Router.delete(
    "/delete/:id",  
    blog.deleteBlog
);

module.exports = Router;
