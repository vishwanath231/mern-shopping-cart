import express from "express";
const router  = express.Router();
import { login, register, getUserProfile, updateUserProfile} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


router
.route('/login')
.post(login)


router
.route('/register')
.post(protect, register);


router
.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile)


export default router;