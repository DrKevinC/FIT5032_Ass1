<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <StaticPage :data="resourcePageJSON"/>
            </div>
        </div>
    </div>
</template>


<script setup>
import StaticPage from '@/components/StaticPage.vue';
import resourcePageJSON from '@/data/resourcesPage.json';
</script>

<style>
</style>