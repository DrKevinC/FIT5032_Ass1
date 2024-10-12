import dotenv from 'dotenv'
dotenv.config()  // Attaches env variables to process object

import express from "express";
import cors from "cors";
import { sendWelcomeMessage } from './sendgrid/init.js';
import { askChatbot } from './chatbot/chatbot.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.get('/email/welcome', async (req, res) => {
    await sendWelcomeMessage(req.query.recipient);
    res.send("REQUEST SENT TO API");
})

app.get('/chatbot/ask', async (req, res) => {
    try {
        const response = await askChatbot(req.query.text, JSON.parse(req.query.history));
        if (!response){
            throw Error("Gemini API error")
        }
        res.status(200).send({response: response})
    } catch (error) {
        console.error("")
        res.status(500).send({error: error.message})
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});