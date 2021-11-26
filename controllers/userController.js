import express from 'express'
import {saveUser, getUsers, updateUser, deleteUser} from '../services/userService'

const router = express.Router();

const getHandler = async (req, res) => {
    const allUsers = await getUsers();
    res.send(JSON.stringify(allUsers));
};

const postHandler = async (req, res) => {
    const result  = await saveUser(req.body)
    res.send(`user created successfully ID: ${result}`);
}

const updateUserHandler = async (req, res) => {
    const body = req.body;
    const user = {
        id: req.params.id,
        username: body.username
    }
    const result = await updateUser(user);
    res.send(result)
}

const deleteHandler =  async (req, res) => {
    const id = req.params.id
    const result = await deleteUser(id);
    res.send(`user deleted ${result}`)
}

router.get('/', getHandler);
router.post('/', postHandler);
router.post('/:id', updateUserHandler)
router.delete('/:id', deleteHandler)

const configure = (app) => {
    app.use('/users', router)
}

export default configure