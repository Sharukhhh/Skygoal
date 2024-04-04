import mongoose from 'mongoose';


const userSchema = mongoose.Schema( {

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    gender: {
        type: String,
        required: true,
    },

    age: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

}, {timestamps: true})


const userModel = mongoose.model('users' , userSchema);

export default userModel;