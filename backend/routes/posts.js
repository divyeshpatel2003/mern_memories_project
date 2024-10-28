import express from 'express'
import {create_post, get_posts, update_post, delete_post,like_post} from '../controllers/posts.js'

const router = express.Router();


//localhost:5000
router.get('/', get_posts)
router.post('/', create_post)
router.patch('/:id', update_post)
router.delete('/:id',delete_post)
router.patch('/:id/likePost',like_post)


export default router