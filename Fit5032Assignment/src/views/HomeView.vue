<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <StaticPreview/>
                <EventPreview/>
                <DiscussionPreview/>
            </div>
        </div>
    </div>
</template>

<script setup>
import EventPreview from '@/components/EventPreview.vue';
import StaticPreview from '@/components/StaticPreview.vue';
import DiscussionPreview from '@/components/DiscussionPreview.vue';
</script>

<style>
</style>