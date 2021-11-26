import mongoose from 'mongoose'

const log = (msg) => console.log(msg);
const uri = 'mongodb://localhost:27017/parcelkoi';
const options = {};

const dbConnection = () => {
    mongoose.connect(uri, options, (err, result) => {
        if(err) log(err)
        
        else log('database connected successfully!')
    })
}

export default dbConnection;