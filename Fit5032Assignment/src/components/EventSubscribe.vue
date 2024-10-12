<script setup>
import { eventStorage, firestoreUpdateEventSubscribers } from '@/data/firestoreData';
import { isLoggedIn, currentUserEmail } from '@/data/loginData';
import { ref } from 'vue';

const subscribed = ref(false);

if (isLoggedIn){
    // check if they are already subscribed
    const isSubscribed = eventStorage.value.subscriberList.some(item => {return item && item._rawValue === currentUserEmail.value;});
    // saved as a weird proxy array so use above weird method ^
    if (isSubscribed){
        subscribed.value = true;
    }
}

async function subscribe(){
    subscribed.value = true;
    eventStorage.value.subscriberList.push(currentUserEmail);
    await firestoreUpdateEventSubscribers(eventStorage.value.title, eventStorage.value.subscriberList);
}

async function unsubscribe(){
    subscribed.value = false;
    eventStorage.value.subscriberList= eventStorage.value.subscriberList.filter(item => item._rawValue !== currentUserEmail.value);
    await firestoreUpdateEventSubscribers(eventStorage.value.title, eventStorage.value.subscriberList);
}

</script>
    
<template>
    <div class="mb-5">
        <div class="border border-black">
            <div class="border border-black">
                <div class="mx-2">
                    <h5>Subscribe to Event</h5>
                </div>
            </div>
            <div v-if="!isLoggedIn" class="mx-2">
                <p>Please 
                    <router-link to="/login" active-class="active">Login</router-link>
                 or 
                    <router-link to="/register" active-class="active">Register</router-link>
                 to Subscribe to this Event</p>
            </div>
            <div v-else class="m-2">
                <div v-if="!subscribed" class="text-center">
                    <label for="subscribe" class="mb-2">Subscribe to recieve email Notifications for this event</label>
                    <button id="subscibe" class="btn btn-primary form-control" @click="subscribe()">Subscribe</button>
                </div>
                <div v-if="subscribed" class="text-center">
                    <label for="unsubscribe" class="mb-2">Unsubscribe to stop recieving email Notifications for this event</label>
                    <button id="unsubscribe" class="btn btn-secondary form-control" @click="unsubscribe()">Unsubscribe</button>
                </div>
            </div>
        </div>
    </div>
</template>