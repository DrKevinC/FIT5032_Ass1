<template>
     <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <StaticPage :data="eventManagerJSON"/>
                <BulkEmail :events="userEvents"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import eventManagerJSON from '@/data/eventManager.json';
import StaticPage from '@/components/StaticPage.vue';
import BulkEmail from '@/components/BulkEmail.vue';
import { getUserEvents } from '@/data/firestoreData';
import { currentUserEmail } from '@/data/loginData';

const userEvents = getUserEvents(currentUserEmail.value);
</script>

<style>
</style>