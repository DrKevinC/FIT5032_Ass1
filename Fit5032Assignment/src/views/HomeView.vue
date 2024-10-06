<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <StaticPreview/>
                <EventPreview :data="events" :length="3" :filter="false"/>
                <DiscussionPreview :data="discussions" :length="3" :filter="false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import EventPreview from '@/components/EventPreview.vue';
import StaticPreview from '@/components/StaticPreview.vue';
import DiscussionPreview from '@/components/DiscussionPreview.vue';

import { discussions } from '@/data/firestoreData';
import { events } from '@/data/firestoreData';
</script>

<style>
</style>