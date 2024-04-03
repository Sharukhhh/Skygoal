import bcrypt from 'bcrypt';


export const encryptPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password , salt);

    return hashedPassword;
}


export const comparePassword = async(endUserPassword , password) => {

    return bcrypt.compare(endUserPassword , password);
}