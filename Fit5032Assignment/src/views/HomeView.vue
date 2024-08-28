<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <StaticPreview/>
                <EventPreview :data="eventJSON" :length="3" :filter="false"/>
                <DiscussionPreview :data="discussionJSON" :length="3" :filter="false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import EventPreview from '@/components/EventPreview.vue';
import StaticPreview from '@/components/StaticPreview.vue';
import DiscussionPreview from '@/components/DiscussionPreview.vue';

import discussionJSON from '@/data/discussions.json';
import eventJSON from '@/data/events.json'
</script>

<style>
</style>