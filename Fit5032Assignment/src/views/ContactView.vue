<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <StaticPage :data="contactUsJSON"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import StaticPage from '@/components/StaticPage.vue';
import contactUsJSON from '@/data/contactUsPage.json';
</script>

<style>
</style>