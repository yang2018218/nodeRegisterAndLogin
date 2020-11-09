const {User} = require('./mongo')

const express = require('express')
const mongoose = require('mongoose')

const app = express()
//axpress 内置处理json
app.use(express.json())

app.get('/api/users', async (req, res) => {
    const  users = await User.find({})
    res.send(users)
})
//注册接口
app.post('/api/register', async (req, res) => {
    // console.log(req.body,'123456789')
    const user = await  User.create({
       username:req.body.username,
       password:req.body.password,
    })
    res.send('user')
})

//登录接口
app.post('/api/login', async (req, res) => {
    //查找用户
    const  user = await  User.findOne({
        username:req.body.username
    })

    // console.log(req.body,'123456789')
    // const user = await  User.create({
    //     username:req.body.username,
    //     password:req.body.password,
    // })
    res.send(user)
})

app.listen(3001, () => {
    console.log("http://localhost:3001/api/users")
})
