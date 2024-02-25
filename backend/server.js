const express = require("express")
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const redis = require('redis');
const REDIS_URL = process.env.REDIS_URL


let redisClient;

const connectRedis = async () => {
  redisClient = redis.createClient(REDIS_URL);
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
    redisClient.connect().then(() => {console.log("REDIS CONNECTED")}).catch((err) => console.log(err))
}

const Entries = require("./models");

const app = express()

const PORT = process.env.PORT || 8080

const DB = process.env.DB_URL

app.use(express.json())

app.use(cors())


const connectDB = () => {
    mongoose.connect(DB, {
    })
    .then(() => {
        console.log("DATABASE CONNECTED")
    })
    .catch((err) => {
        console.log(err)
    })
}


app.use("/ping", (req, res) => {
    try{
        res.status(200).json({
            message: "Connected to the backend"
        })
    }catch(err) {
        console.log(err)
        res.status(200).json({
            message: "Error while connecting"
        })
    }
})


const createEntries =async () => {
    for (i=1;i<=1000;i++) {
        await Entries.create({entryId: Math.floor(Math.random() * 100000)})
    }
}

app.use("/db",async(req, res) => {
    try{
    connectDB()

    const entries = await  Entries.find()

    if (entries.length == 0) {
     createEntries()
    }
    res.status(200).json({
        success: true,
        endpoint: "/db",
        data: {
            entries: entries,
            results: entries.length,
            message: "Connect to the DB"
        },
    })
    }catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            message: "Not connected to DB"
        })
    }
})

const cache = async (key="key", value="value") => {
    redisClient.set(key, JSON.stringify(value))
};

app.use("/redis", async(req, res) => {
    try{
        connectRedis()
        const {key, value} = req.body
        cache(key, value)
        res.status(200).json({
            success: true,
            endpoint: "/redis",
            key: value,
            message: "Connected to Redis"
        })
    }catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            message: "Not connected to Redis"
        })
    }
})

app.use(function(req, res) {
          res.json({
            success: false,
            message: "Invalid request"
          });
    });
    

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
