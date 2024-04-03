import User from '../models/userModel.js';


/*
    path: '/api/user/alluser',
    METHOD: get,
*/
export const getAllUsers = async (req, res) => {
    try {
        
        const users = await User.find();

        if(!users) {
            return res.status(404).json({error: 'Users not found'});
        }

        return res.status(200).json({message: 'success', users});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}


/*
    path: '/api/user/single',
    METHOD: get,
*/
export const getSingleUser = async (req, res) => {
    try {
        
        const userId = req.user._id;

        const user = await User.findOne({_id: userId});

        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }

        return res.status(200).json({message:'success', user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}