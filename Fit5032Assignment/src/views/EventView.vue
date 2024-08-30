<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <EventPage/>
                <DiscussionComment/>
                <DiscussionPage/>
            </div>
        </div>
    </div>
</template>

<script setup>
import EventPage from '@/components/EventPage.vue';
import DiscussionPage from '@/components/DiscussionPage.vue';
import DiscussionComment from '@/components/DiscussionComment.vue';
</script>

<style>
</style>