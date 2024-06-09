const express = require("express")
const mongoose = require("mongoose")
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config")
const app = express()

const port = process.env.PORT || 4000
const postRouter = require('./routes/postRoutes')
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

//localhost:4000/api/v1/post/
app.use('/api/v1/posts', postRouter)


app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})