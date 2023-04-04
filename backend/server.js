const app = require('./app.js')
const dotenv = require('dotenv')
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary")

dotenv.config({path:"backend/config/config.env"});

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const server = app.listen(process.env.PORT, ()=>{
    console.log(`chal gya server ${process.env.PORT} port pe`)
})


// unhandled promise rejections - config.env file me kuchh error
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to unhandled promise rejections`)

    server.close(()=>{
        process.exit(1);
    })
})