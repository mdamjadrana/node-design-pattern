import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

export default User;