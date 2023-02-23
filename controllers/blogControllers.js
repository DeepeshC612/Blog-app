const blogSchema = require("../models/blogModelSchema");

const creatBlog = async (req, res) => {
  const regBlog = await new blogSchema(req.body);
  regBlog.userId = req.params.id;
  try {
    const filePath = `uploads${req.file.filename}`;
    regBlog.blogImage = filePath;
    await regBlog.save();
    res.status(201).json({
      success: "success",
      message: "Blog published successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      message: "Error occure " + err.message,
    });
  }
};

const allBlog = async (req, res) => {
  try {
    const listBlog = await blogSchema.find();
    res.status(200).json({
      success: "success",
      message: "Here are all the blogs",
      blogList: listBlog,
    });
  } catch {
    res.status(404).json({
      success: "failure",
      message: "Error occure " + err.message,
    });
  }
};

const detailBlog = async (req, res) => {
  try {
    const blogData = await blogSchema.find({ _id: req.params.id }).populate({
      path: "userId",
      select: "userName profilePic",
    });
    res.status(200).json({
      success: "success",
      message: "Here is the blog",
      blogData: blogData,
    });
  } catch (err) {
    res.status(401).json({
      success: "failure",
      error: "Error occure " + err.message,
    });
  }
};

const editBlog = async (req, res) => {
  try {
    const updateBlog = await blogSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({
      success: "success",
      message: "blog is updated successfully",
      editedData: updateBlog,
    });
  } catch (err) {
    res.status(204).json({
      success: "failure",
      error: "Review is not updated " + err.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await blogSchema.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json({
      success: "success",
      message: "Blog deleted successfully",
    });
  } catch (err) {
    res.status(403).json({
      success: "failure",
      error: "Unable to delete blog " + err.message,
    });
  }
};

const blogLike = async (req, res) => {
  try {
    const { blogLikes } = req.body;
    const likes = await blogSchema.findById(req.params.id);
    if (likes != null) {
      if (blogLikes == true) {
        await likes.updateOne({ blogLikes: ++likes.blogLikes });
        res.status(202).json({
          success: "success",
          message: "You liked the blog",
          likedBlog: likes.blogLikes,
        });
      } else {
        await likes.updateOne({ blogLikes: --likes.blogLikes });
        res.status(202).json({
          success: "success",
          message: "You unliked the blog",
          unLikeBlog: likes.blogLikes,
        });
      }
    } else {
      res.status(404).json({
        success: "failure",
        message: "Blog not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: "Error occure " + err.message,
    });
  }
};

module.exports = {
  creatBlog,
  allBlog,
  detailBlog,
  editBlog,
  deleteBlog,
  blogLike,
};
