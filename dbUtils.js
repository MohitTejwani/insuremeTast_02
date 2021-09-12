const mongoose = require("mongoose");
require('dotenv').config();
const chalk = require('chalk');

const connectionOption = {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_USER_PASS,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const initClientDbConnection = async () => {
    try {
        const db = await mongoose.createConnection(process.env.MONGO_SERVER_BASE_URL, connectionOption);

        db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
        db.on("connected", function () {
            console.log("Connection to  sucessful");
        });
        console.log(chalk.blue("Connection to Database: " + db.name + " successful"));
        return db;
    } catch (e) {
        console.log(chalk.red("MongoDB connection error"));
    }
};

module.exports = {
    initClientDbConnection
};