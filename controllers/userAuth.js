import { generateToken } from '../helpers/generateToken.js';
import { comparePassword, encryptPassword } from '../helpers/passwordHandlers.js';
import User from '../models/userModel.js';


/*
    path: '/api/user/signup',
    METHOD: post,
*/
export const userSignup = async (req, res) => {
    try {
        const {username , email, password} = req.body;

        const isExistingUser = await User.findOne({email : email});

        if(isExistingUser) {
            return res.status(409).json({error: 'User already Exists'});
        }

        const securePassword = await encryptPassword(password);

        const user = new User ({
            username, 
            email,
            password: securePassword
        });

        await user.save();

        return res.status(201).json({message: 'New user created', user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server errror'});
    }
}



/*
    path: '/api/user/login',
    METHOD: post
*/
export const loginUser = async (req, res) => {
    try {
        const {email , password} = req.body;

        const existingUser = await User.findOne({email : email});

        if(!existingUser) {
            return res.status(404).json({error: 'User not found'});
        }

        const checkPassword = await comparePassword(password , existingUser.password);

        if(!checkPassword) {
            return res.status(404).json({error: 'Password does not match'});
        }

        const token = await generateToken(existingUser._id);
        const user = {
            name: existingUser.username,
            email: existingUser.email,
            userId: existingUser._id
        }
        
        if(!token) {
            return res.json({error: 'Token creation error'});
        }

        res.setHeader('Authorization' , `Bearer ${token}`);
        return res.status(200).json({message: 'Login successfull',  user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server errror'});
    }
}