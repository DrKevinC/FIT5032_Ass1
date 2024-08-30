<template>
     <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <StaticPage :data="eventManagerJSON"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import eventManagerJSON from '@/data/eventManager.json';
import StaticPage from '@/components/StaticPage.vue';
</script>

<style>
</style>