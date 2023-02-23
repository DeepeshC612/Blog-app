const commentsModelSchema = require("../models/commentsModelSchema");
const comm = require("../models/commentsModelSchema");

const addComment = async (req, res) => {
  try {
    const comment = await new commentsModelSchema(req.body);
    comment.userId = req.params.uid;
    comment.blogId = req.params.bid;
    const data = await comment.populate({
      path: "userId",
      select: "userName profilePic"
    })
    let comm = await comment.save();
    res.status(201).json({
      success: "success",
      message: "Comment added successfully",
      addedComment: comm,
    });
  } catch (err) {
    res.status(401).json({
      success: "failure",
      message: "Error occure " + err,
    });
  }
};

module.exports = {
    addComment,
}
