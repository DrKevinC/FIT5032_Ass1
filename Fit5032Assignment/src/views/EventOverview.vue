<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <EventPreview :data="eventJSON" :length="0" :filter="false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import EventPreview from '@/components/EventPreview.vue';
import eventJSON from '@/data/events.json'
</script>

<style>
</style>