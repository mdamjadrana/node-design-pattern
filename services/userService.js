import models from '../models'

//save user
export const saveUser = async (user) => {
    const newUser = new models.User({
        username: user.username,
        createdAt: new Date()
    })  
    return await newUser.save();
}

//get user
export const getUsers = async () => {
    const users = await models.User.find();
    return users;
}

//update user
export const updateUser = async (user) => {
    try {
        const userData = await models.User.findById({_id: user.id});
        if(userData) {
            userData.username = user.username;
            userData.save();
            return userData;
        }
    } catch (error) {
        console.log(error)
    }
}

//delete user
export const deleteUser = async (id) => {
    const result  = await models.User.deleteOne({id})
    return result;
}