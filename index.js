const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.json({
    ServerStatus : "ON"
  })
})

//Router
const userRouter = require('./routes/users')

//next : 다음 미들웨어를 실행시켜주기 위한 콜백함수
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Route Mapping
app.use('/users', userRouter)

//서버를 요청 대기 상태로 만들어준다
app.listen(4000, () => console.log('running'))

//app을 모듈로 만들어줌
module.exports = app