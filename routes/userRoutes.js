import express from 'express';
import { loginUser, userSignup } from '../controllers/userAuth.js';
import { getAllUsers, getSingleUser } from '../controllers/userDataController.js';
import verify from '../middlewares/authorizeUser.js'
const router = express.Router();


/*
    path: '/api/user/signup',
*/
router.post('/signup' , userSignup);


/*
    path: '/api/user/login',
*/
router.post('/login' , loginUser);


/*
    path: '/api/user/alluser',
*/
router.get('/alluser', verify, getAllUsers);


/*
    path: '/api/user/single/:userId',
*/
router.get('/single' , verify ,  getSingleUser);


export default router;