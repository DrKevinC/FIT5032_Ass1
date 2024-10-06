<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <EventPage/>
                <div v-for="discussion in discussions" :key="discussion">
                    <DiscussionComment :discussion="discussion"/>
                    <DiscussionPage :discussion="discussion"/>
                </div>
            </div>
        </div>
    </div>     
</template>

<script setup>
import EventPage from '@/components/EventPage.vue';
import DiscussionPage from '@/components/DiscussionPage.vue';
import DiscussionComment from '@/components/DiscussionComment.vue';
import { eventStorage, getLinkedDiscussions } from '@/data/firestoreData';

const discussions = getLinkedDiscussions(eventStorage.value);
</script>

<style>
</style>