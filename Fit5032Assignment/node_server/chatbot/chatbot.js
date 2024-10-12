import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from 'dotenv'

dotenv.config()
// SET UP THE CHATBOT
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY;
const GENERATION_CONFIG = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};
const SAFETY_SETTINGS = [
{ category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
{ category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
{ category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];
const INITIATION_MESSAGE = "You are an AI chatbot for the fake ElderConnect website and your aim is to provide information to elder's about how they can access resources. Lie Profusely, and make your lies ridiculous, but dont admit to lying unless directly asked about it. Only respond in plain text."
let chatbot;
let DEFAULT_HISTORY;
async function chatbotInitiate() {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        chatbot = model.startChat({
            generationConfig: GENERATION_CONFIG,
            safetySettings: SAFETY_SETTINGS,
            history: [],
        });
        console.log("Chatbot succesfully connected")
        // Send initiation Message
        await chatbot.sendMessage(INITIATION_MESSAGE);
        DEFAULT_HISTORY = [...chatbot._history];
        console.log("Initiation Message Sent")
    }  catch (error) {
        console.error('An error occurred when connecting to GEMINI chatbot:', error.message);
        process.exit(1);
    } 
}

// does the export only become available after the chatbot is initiated? idk? might be fine?
export async function askChatbot(question, history){
    try {
        // substitute the chatbot history object
        if (history.length==0) {
            if (!DEFAULT_HISTORY) {
                chatbot.history = []
            }
            // if no history use the default
            chatbot.history = DEFAULT_HISTORY
        } else {
            // else use the given history
            chatbot.history = history
        }
        // make sure chatbot exists
        if (!chatbot){
            console.error("Chatbot not Initiated yet")
            return null
        }
        // SEND MESSAGE TO GEMINI
        const query = await chatbot.sendMessage(question)
        const response = query.response.text();
        console.log("RESPONSE: ", response);
        if (response.error) {
            return null
        }
        return {message: response, history: chatbot.history};
    } catch (error) {
        console.error("Chatbot Error: ", error);
        return null
    }    
}

await chatbotInitiate();