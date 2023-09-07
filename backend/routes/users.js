import express from 'express';

import { registerUser, login, getUserProfile, logout } from '../controllers/userController.js';
import { validateUserRegistration, validateUserLogin } from '../validators/userValidator.js';
import { authenticate } from '../middlewares/authMiddleWare.js';


const usersRouter = express.Router();



usersRouter.post('/register-user', validateUserRegistration, registerUser)

usersRouter.post('/login-user', validateUserLogin, login)
usersRouter.get('/get-user-profile', authenticate, getUserProfile)
usersRouter.get('/logout', authenticate, logout)


export default usersRouter