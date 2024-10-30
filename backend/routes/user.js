import express from "express";

const router = express.Router();
import {sign_up, sign_in} from '../controllers/user.js'

router.post('/signin', sign_in)
router.post('/signup', sign_up)

export default router;
