import models from '../models'
import { NotFound } from '../utils/error';

//get user
export const getUsers = async () => {
    const users = await models.User.find();
    return users;
}

//save user
export const saveUser = async (user) => {
    const newUser = new models.User(user)  
    return await newUser.save();
}

//update user
export const updateUser = async (user) => {
    const id = user.id;
    const userData = await models.User.findById({id});
    if(userData) {
        userData.username = user.username;
        userData.save();
        return userData;
    }
    throw new NotFound(`user not found  id: ${id}`)
}

//delete user
export const deleteUser = async (id) => {
    /**
     * if the user is not null delete it
     * return user not found
     * 
     */
    const result  = await models.User.deleteOne({id})
    if(result.deletedCount >0) {
        return result;
    }
    throw new NotFound(`user not found  id: ${id}`);
}