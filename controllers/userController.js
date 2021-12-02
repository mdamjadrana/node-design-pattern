import express from 'express'
import {saveUser, getUsers, updateUser, deleteUser} from '../services/userService'
import handleValidation from '../middlewars/handleValidations'
import validators from '../models/view-models'

const router = express.Router();

const getHandler = async (req, res) => {
    try {
        const allUsers = await getUsers();
        res.send(JSON.stringify(allUsers));
    } catch (error) {
        next(error, req, res)
    }
};

const postHandler = async (req, res, next) => {
    try {
        console.log('body', req.body);
        const result  = await saveUser(req.body)
        res.send(`user created successfully ID: ${result._id}`);
    } catch (error) {  
        next(error, req, res)
    }
}

const updateUserHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const user = {
            id: req.params.id,
            username: body.username
        }
        const result = await updateUser(user);
        res.send(result)
    } catch (error) {
        return next(error, req, res)
    }
}

const deleteHandler =  async (req, res, next) => {
    try {
        const id = req.params.id
        await deleteUser(id);
        res.status(200).send(`user deleted`)
    } catch (error) {
        return next(error, req, res)
    }
}

router.get('/', getHandler);
router.post('/', handleValidation(validators.userSchemaValidator), postHandler);
router.post('/:id', updateUserHandler)
router.delete('/:id', deleteHandler)

const configure = (app) => {
    app.use('/users', router)
}

export default configure