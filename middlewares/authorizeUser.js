import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const verifyUserToken = async (req, res, next) => {
    try {
        
        const authHeader = req.headers['authorization'];

        if(!authHeader || authHeader === undefined) {
            return res.status(401).json({error: 'Un-authorized'});
        }

        const token = authHeader.split(' ')[1];

        const decodedToken = jwt.verify(token , process.env.JWT_SECRET);

        if(!decodedToken) {
            return res.status(401).json({error: 'Unauthorized, invalid Token'});
        }

        const user = await User.findOne({_id : decodedToken.userId} , {username: 1, _id: 1 , email: 1});

        if(!user) {
            return res.status(401).json({error: 'Unauthorized entry'});
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error, 'Error on middleware');
        return res.status(500).json({error : 'Middleware error'});
    }
} 


export default verifyUserToken;