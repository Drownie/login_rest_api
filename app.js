require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose');


const app = express();

mongoose.set("strictQuery", false);

// Define connection string
const connectionString = process.env.ATLAS_URI || "";

main()
    .then(() => {
        console.log("Successfully connected to the db");
    })
    .catch(err => {
        console.log("Failed connecting to the db");
        console.error(err);
        process.exit(1);
    });
async function main() {
    await mongoose.connect(connectionString);
}

// Body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Public Dir
app.use(express.static(path.join(__dirname, "public")));

// Enable cors
app.use(cors());

// Define Routes
const indexRoute = require('./routes/indexRoute');
const userRoute = require('./routes/userRoute');

// Routing
app.use("/", indexRoute);
app.use("/users", userRoute);

module.exports = app;