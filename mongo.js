import mongoose from 'mongoose'

const log = (msg) => console.log(msg);
export const uri = 'mongodb://localhost:27017/parcelkoi';
const options = {};

export const dbConnection = () => {
    mongoose.connect(uri, options, (err, result) => {
        if(err) log(err)
        
        else log('database connected successfully!')
    })
}