import {Blog} from "../models/Blog.js";

export const CreateBlog = async (req, res) => {
  try {
    const { title, description, picture } = req.body;
    const user = req.data.id;
    if (!description || !title) {
      return res.status(404).json({
        status: false,
        data: "",
        message: "please fill all input fields",
      });
    }
    const data = await Blog.create({ title, description, picture ,user})
    if(!data) throw new Error("Error has occured please try again");
    return res.status(200).json({
        status: true,
        data:data,
        message: "your blog is posted successfully"
    })
    
  } catch (error) {
    return res.status(404).json({
        status: false,
        data: "",
        message: error.message
      });
  }
};

export const UpdateBlog = async (req, res) => {
    try {
      const { title, description, picture, id} = req.body;
      if (!description || !title) {
        return res.status(404).json({
          status: false,
          data: "",
          message: "please fill all input fields",
        });
      }
      const data = await Blog.findByIdAndUpdate({_id:id},{ title, description, picture},{new:true})
      if(!data) throw new Error("Error has occured please try again");
      return res.status(200).json({
          status: true,
          data:data,
          message: "your blog is updated successfully"
      })
      
    } catch (error) {
      return res.status(404).json({
          status: false,
          data: "",
          message: error.message
        });
    }
  };
