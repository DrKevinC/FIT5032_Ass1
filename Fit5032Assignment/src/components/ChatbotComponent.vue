<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { marked } from 'marked';
    const historyLog = ref([{user:"Chatbot", message: "Hello and Welcome, I'm the ElderConnect chatbot, how can I help you?"}]);
    const privateHistory = ref([]);
    const userInput = ref("");
    const errors = ref(null);
    const loading = ref(false);
   
    function clearInput(){
        userInput.value = "";
        errors.value = null;
    }

    function validateChatInput(){
        if(userInput.value == "")
        {
            errors.value = "Please insert text"
        } else if(loading.value){
            errors.value = "Please wait for the chatbot to finish thinking"
        } else {
            errors.value = null
        }
    }

    async function submit(){
        validateChatInput()
        loading.value = true;
        if (!errors.value) {
            historyLog.value.push({user: "You", message: userInput.value}) // add user message
            historyLog.value.push({user: "Chatbot", message: "Thinking..."}) // add loading message
        }
        try {
            const query = await axios.get("http://localhost:3000/chatbot/ask", {
                params: {
                    text: userInput.value,
                    history: JSON.stringify(privateHistory.value)
                }
            });
            privateHistory.value = query.data.response.history;
            historyLog.value[historyLog.value.length - 1] = {user: "Chatbot", message: marked(query.data.response.message).replace(/<p>/g, '').replace(/<\/p>/g, '').trim()}
            clearInput();
            loading.value = false;
        } catch (error) {
            console.error("An error occured while submitting to backend: ", error);
            historyLog.value[historyLog.value.length - 1] = {user: "Chatbot", message: "An error occurred, try again"};
            errors.value = null;
            loading.value = false;
        }
        
    }
</script>

<template>
    <div class="mb-5">
        <div class="border border-black border-1">
            <div class="border border-black border-bottom">
                <div class="mx-2">
                    <h5>ElderConnect Chatbot</h5>
                </div>
            </div>
            <div class="border border-black border-1">
                <div class="m-2" v-for="line in historyLog" :key="line">
                    <b class="text-success">{{ line.user }}:</b>
                    <div v-if="line.user=='Chatbot'" v-html="line.message"></div> 
                    <div v-else>{{ line.message }}</div>
                </div>
            </div>
            <div>
                <form @submit.prevent="submit()">
                    <label for="chatInput" class="m-2">Ask the ElderConnect Chatbot</label>
                    <input id="chatInput" 
                        class="form-control mx-2" 
                        type="text" 
                        placeholder="Ask the chatbot" 
                        @input="validateChatInput()"
                        @blur="validateChatInput()"
                        style="max-width:90%;"
                        v-model="userInput"/>
                    <div v-if="errors" class="text-danger m-2">{{ errors }}</div>
                    <button @click="submit()" class="btn btn-primary m-2">Send</button>
                    <button @click="clearInput()" class="btn btn-secondary m-2">Clear</button> 
                </form>
            </div>
        </div>
    </div>
</template>

<style>
</style>