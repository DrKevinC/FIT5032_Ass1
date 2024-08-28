<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <StaticPage :data="donatePageJSON"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import StaticPage from '@/components/StaticPage.vue';
import donatePageJSON from '@/data/donatePage.json';
</script>

<style>
</style>