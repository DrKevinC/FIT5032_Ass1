<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <DiscussionPreview :data="discussionJSON" :length="0" :filter="true" />
            </div>
        </div>
    </div>
</template>

<script setup>
import DiscussionPreview from '@/components/DiscussionPreview.vue';
import discussionJSON from '@/data/discussions.json';
</script>

<style>
</style>