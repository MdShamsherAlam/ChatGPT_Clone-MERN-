
import express from 'express'
const router = express.Router();
import authController from '../controllers/authController.js';

//for register
router.post('/register', authController.registerController)

//for login
router.post('/login', authController.loginController)

//for logout
router.post('/logout', authController.logoutController)

export default router;