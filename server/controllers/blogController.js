import { Blog } from "../models/Blog.js";
import { Like } from "../models/Like.js";
import { Comment } from "../models/Comment.js";

export const CreateBlog = async (req, res) => {
  try {
    const { title, description, picture ,summary ,tags } = req.body;
    const user = req.data.id;
    if (!description || !title || !summary) {
      return res.status(404).json({
        status: false,
        data: "",
        message: "please fill all input fields",
      });
    }
    const data = await Blog.create({ title, description, picture, user ,summary ,tags});
    if (!data) throw new Error("Error has occured please try again");
    return res.status(200).json({
      status: true,
      data: data,
      message: "your blog is posted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      status: false,
      data: "",
      message: error.message,
    });
  }
};

export const UpdateBlog = async (req, res) => {
  try {
    const { title, description, picture, id } = req.body;
    if (!description || !title) {
      return res.status(404).json({
        status: false,
        data: "",
        message: "please fill all input fields",
      });
    }
    const data = await Blog.findByIdAndUpdate(
      { _id: id },
      { title, description, picture },
      { new: true }
    );
    if (!data) throw new Error("Error has occured please try again");
    return res.status(200).json({
      status: true,
      data: data,
      message: "your blog is updated successfully",
    });
  } catch (error) {
    return res.status(404).json({
      status: false,
      data: "",
      message: error.message,
    });
  }
};

export const LikeBlog = async (req, res) => {
  try {
    const { val, id } = req.body; //Here Id id blogID
    const user = req.data.id;
    const data = await Like.create({ val: val, user: user, blog: id });
    return res.status(200).json({
      success: true,
      data: data,
      message: "Blog is Liked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: "",
      message: error.message,
    });
  }
};

export const CommentBlog = async (req, res) => {
  try {
    const { description, id } = req.body; //Here Id id blogId
    const user = req.data.id;
    const data = await Comment.create({
      description: description,
      user: user,
      blog: id,
    });
    return res.status(200).json({
      success: true,
      data: data,
      message: "comment successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: "",
      message: error.message,
    });
  }
};
