import dotenv from 'dotenv'
dotenv.config()  // Attaches env variables to process object

import express from "express";
import './sendgrid/init.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});