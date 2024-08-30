<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <EventPreview :data="events" :length="0" :filter="false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import EventPreview from '@/components/EventPreview.vue';
import { events } from '@/data/generalData';
</script>

<style>
</style>