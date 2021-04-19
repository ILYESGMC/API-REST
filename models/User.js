const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const UserSchema = new Schema ({
    firstName : {
        type : String
    }, 
    lastName :{
        type : String
    },
    email: {
        type : String,
        required : true
    }
})
// {
//     'firstName' : 'Aymen', 
//     'lastName' : 'Ben Youssef' ,
//     'email': 'aymen@gmail.com'
// }
module.exports = mongoose.model('user', UserSchema)