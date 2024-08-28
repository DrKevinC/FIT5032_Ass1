<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <StaticPage :data="aboutPageJSON"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import StaticPage from '@/components/StaticPage.vue';
import aboutPageJSON from '@/data/aboutPage.json'
</script>

<style>
</style>