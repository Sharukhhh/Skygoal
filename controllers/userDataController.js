import User from '../models/userModel.js';


/*
    path: '/api/user/alluser',
    METHOD: get,
*/
export const getAllUsers = async (req, res , next) => {
    try {
        
        const users = await User.find();

        if(!users) {
            return res.status(404).json({error: 'Users not found'});
        }

        return res.status(200).json({message: 'success', users});

    } catch (error) {
        console.log(error);
        next(error);
    }
}


/*
    path: '/api/user/single',
    METHOD: get,
*/
export const getSingleUser = async (req, res, next) => {
    try {
        
        const userId = req.user._id;

        const user = await User.findOne({_id: userId});

        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }

        return res.status(200).json({message:'success', user});

    } catch (error) {
        console.log(error);
        next(error);
    }
}


/*
    path: '/api/user/edit',
    METHOD: PUT,
*/
export const updateUser = async (req, res, next) => {
    try {
        
        const userId = req.user._id;

        const {age , gender , username } = req.body;

        if(!age || !gender || !username) {
            return res.json({error: 'Invalid Entries'});
        }

        const user = await User.findByIdAndUpdate(userId , {
            username: username,
            age: age,
            gender: gender
        } , {new: true});

        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }

        return res.status(200).json({message: 'Updated Successfully', user});

    } catch (error) {
        console.log(error);
        next(error);
    }
}