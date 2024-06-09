const express = require("express")
const mongoose = require("mongoose")
const app = express()
const redis = require('redis')
let RedisStore = require('connect-redis').default
const session = require('express-session')
const { createClient } = require('redis')



const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require("./config/config")
let redisClient = createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})
redisClient.connect().catch(console.error)

const port = process.env.PORT || 4000
const postRouter = require('./routes/postRoutes')
const userRouter = require("./routes/userRoutes")

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

//not best practice to handle all we want to do is dont rely on orchestration docker contaier no one can gurantee that you mongodb is fully running before application starts. make sure your application is intelligent to hadle scenario
const connectWithRetry = () => {
    mongoose
        .connect(mongoURL)
        .then(() => console.log("successfully connected to DB"))
        .catch((e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000)
        })
}

connectWithRetry()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("<h2>Hi There!</h2>")
})

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        saveUninitialized: false,
        httpOnly: true,
        maxOnly: true,
        maxAge: 30000
    }
}))
//localhost:4000/api/v1/post/
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)


app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})