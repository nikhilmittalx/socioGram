const express = require('express')
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const path = require("path");

const errorMiddleware = require("./middleware/error")

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())


const user = require("./routes/userRoute")
const post = require("./routes/postRoute")
app.use("/api/v1", user)
app.use("/api/v1", post)


// build krne ke bad uncomment krna h
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})



app.use(errorMiddleware);

module.exports = app;