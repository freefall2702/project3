const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const userRoute = require("./routes/userRoute")
const ownerRoute = require("./routes/ownerRoute")
const boardingRoute = require("./routes/boardingRoute")
const requestRoute = require("./routes/requestRoute")
const authRoute = require("./routes/authRoute")
require('dotenv').config()


const app = express();
const port = process.env.PORT

const connnectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://luynhnm194110:VqOD4o6wInuX1qlO@cluster0.firmglh.mongodb.net/`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Connected to database successfully")
    } catch (error) {
        process.exit(1)
    }
}

connnectDB()

app.use(express.json())
app.use(morgan('dev'));
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/user', userRoute)
app.use('/owner', ownerRoute)
app.use('/boarding', boardingRoute)
app.use('/request', requestRoute)
app.use('/auth', authRoute)
app.listen(5000, () => {
    console.log(`Server listening on 5000`)
});