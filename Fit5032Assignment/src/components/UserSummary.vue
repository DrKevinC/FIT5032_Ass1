<script setup>
import { currentUserEmail } from '@/data/loginData';
import { users } from '@/data/firestoreData';
import { ref } from 'vue';

const authorised = ref(currentUserEmail.value == "admin@admin.com");
</script>

<template>
    <div v-if="authorised">
        <div class="mb-5">
            <div class="border border-black">
                <div class="border border-black">
                    <div class="mx-2">
                        <h5>User Summary</h5>
                    </div>
                </div>
                <b class="mx-2 mb-2">Total Number of Users is:</b>{{ users.length }}
                <div v-for="user in users" :key="user" class="mx-2 mb-2">
                    <b>Username:</b> {{ user.username }} <b>Email:</b> {{ user.email }} <b v-if="user.isAdmin">Event Manager</b>
                </div>
            </div>
        </div>
    </div>
</template>