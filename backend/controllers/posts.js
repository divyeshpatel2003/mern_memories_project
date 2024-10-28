import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'


export const get_posts = async (req,res)=>{
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


export const create_post = async(req,res)=>{
    const post = req.body;
    const newPost = new PostMessage(post)
    try {
        await newPost.save();
        res.status(200).json(newPost)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}

export const update_post = async (req,res) =>{
    const {id} = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send(`No post with id: ${id}`)

    const updated_post = {creator, title, message, tags, selectedFile, _id: id}

    await PostMessage.findByIdAndUpdate(id, updated_post, {new: true})
    res.json(updated_post)
}

export const delete_post = async (req, res) =>{
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndDelete(id);

  res.json({ message: "Post deleted successfully."})
}

export const like_post = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.send(404).send(`No Post with ${id}`)

    const post = await PostMessage.findById(id);

    const updated_post = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})

    res.json(updated_post)
}