<script setup>
import { ref } from 'vue';
import axios from 'axios';
const props = defineProps({
    events: {
        type: Object,
        required: true
    }
});

const selectedEvent = ref(null);
const emailContent = ref("");
const emailErrors = ref(null)


function clearInput(){
    emailContent.value = ""
    emailErrors.value = null
}

function clearSelection(){
    selectedEvent.value = null;
    clearInput()
}

function selectEventForEmail(chosenEvent){
    selectedEvent.value = chosenEvent
    clearInput()
}

function validateEmailInput(){
    if (emailContent.value == ""){
        emailErrors.value = "Please input content before sending"
    } else {
        emailErrors.value = null;
    }
}

function validateRecipients(){
    if (selectedEvent.value.subscriberList.length==0){
        emailErrors.value = "Can't send email when there are no subscribers"
    }
}

async function sendBulkEmail(){
    validateEmailInput()
    validateRecipients()
    if (emailErrors.value != null){
        return; // break if error
    }
    try {
        const cleanList = selectedEvent.value.subscriberList.map(item => item._rawValue);
        await axios.get('http://localhost:3000/email/bulk', {
            params: {
                recipients: JSON.stringify(cleanList),
                message: emailContent.value
            }
        });
    } catch (error) {
        console.log("An error occurred when sending bulk emails: ", error);
    }
    clearSelection()
}

</script>

<template>
    <div class="mb-5">
        <div class="border border-black">
            <div class="border border-black">
                <div class="mx-2">
                    <h5>Bulk Email</h5>
                </div>
            </div>
            <div class="border border-black">
                <div class="mx-2">
                    <div v-for="event in props.events" :key="event" class="mx-2">
                        Event <b>{{ event.title }}</b> has {{ event.subscriberList.length }} subscribers
                        <button @click="selectEventForEmail(event)">Select</button>
                    </div>
                </div>
                <div class="mx-2">
                    <div v-if="selectedEvent!=null">
                        <form @submit.prevent="sendBulkEmail()">
                            <label for="event.title" class="m-2">Send Email to {{ selectedEvent.title }} Subscribers</label>
                            <textarea id="event.title"
                                class="form-control mx-2"
                                type="text"
                                placeholder="Add Email Content Here"
                                @input="validateEmailInput()"
                                style="max-width:90%;"
                                v-model="emailContent"/>
                            <div v-if="emailErrors" class="text-danger m-2">{{ emailErrors }}</div>
                            <button @click="sendBulkEmail()" class="btn btn-primary m-2">Send</button>
                            <button @click="clearInput()" class="btn btn-secondary m-2">Clear Text</button>
                            <button @click="clearSelection()" class="btn btn-secondary m-2">Clear Selection</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>