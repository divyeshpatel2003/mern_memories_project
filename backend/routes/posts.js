import express from 'express'
import {create_post, get_posts, update_post, delete_post,like_post} from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router();


//localhost:5000
router.get('/', get_posts)
router.post('/', auth,create_post)
router.patch('/:id',auth,  update_post)
router.delete('/:id',auth, delete_post)
router.patch('/:id/likePost',auth, like_post)


export default router