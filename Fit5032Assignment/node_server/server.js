import dotenv from 'dotenv'
dotenv.config()  // Attaches env variables to process object

import express from "express";
import cors from "cors";
import { sendWelcomeMessage } from './sendgrid/init.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.get('/email/welcome', (req, res) => {
    sendWelcomeMessage(req.query.recipient);
    res.send("REQUEST SENT TO API");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});