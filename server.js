const {User} = require('./mongo')

const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = express()

const SECRET = 'linkSet123456'
//axpress 内置处理json
app.use(express.json())

app.get('/api/users', async (req, res) => {
    const users = await User.find({})
    res.send(users)
})
//注册接口
app.post('/api/register', async (req, res) => {
    // console.log(req.body,'123456789')
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
    })
    res.send('user')
})

//登录接口
app.post('/api/login', async (req, res) => {
    //查找用户
    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status('422').send({
            message: '用户名字不存在'
        })
    }
    // isPasswordValid  使用require('bcrypt') 对比后返回结果  true
    const isPasswordValid = require('bcrypt').compareSync(
        //用户输入密吗
        req.body.password,
        //数据库密码
        user.password
    )
    if (!isPasswordValid) {
        return res.status('422').send({
            message: '密码输入不正确'
        })
    }
    //生成token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({
        id: String(user._id),
    }, SECRET)


    res.send({
        user,
        token: token
    })
})
//定义一个中间键
const auth = async (req, res, next) => {
    const raw = String(req.headers.authorization).split(" ").pop()
    const {id} = jwt.verify(raw, SECRET)
    const user = await User.findById(id)
    //下一个中间键来
    next()
}

//获取个人信息接口
app.get('/api/userInfoFile', auth, async (req, res, next) => {
    res.send(user)
    next()
})

app.listen(3001, () => {
    console.log("http://localhost:3001/api/users")
})
