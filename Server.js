require('dotenv').config({path:'./config/.env'})
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = express.Router()
const users = require('./models/User.js')

//connect to database with the server
const user =  process.env.USER; 
const password = process.env.PASSWORD;
const Mongourl = `mongodb+srv://${user}:${password}@users.gtmgb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const port = process.env.PORT;

//parse the data
app.use(express.json()) 
app.use('/user',router)
mongoose.connect(Mongourl,{useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
    err ? console.log(err) : console.log("DB is connected")
})

// GET :  RETURN ALL USERS 
router.get('/', (req,res)=>{
    users.find({},(err,data)=>{
        err ? console.log(err) : res.json(data)
    })
})

// POST :  ADD A NEW USER TO THE DATABASE 
router.post('/addnewuser', (req,res)=>{
    let newUser = new users(req.body)
    newUser.save((err)=>{
        err ? console.log(err) : res.send('user added')
    })
})

// PUT : EDIT A USER BY ID 
router.put('/update/:id', (req,res)=>{
    users.findByIdAndUpdate({ _id : req.params.id },{...req.body},(err,data)=>{
        err ? console.log(err) : res.json(data)
    })
})

// DELETE : REMOVE A USER BY ID 
router.delete('/delete/:id', (req,res)=>{
    users.findByIdAndRemove({ _id : req.params.id },(err,msg)=>{
        err ? console.log(err) : res.send('user deleted')
    })
})

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`The server is running on port ${port}`)
})