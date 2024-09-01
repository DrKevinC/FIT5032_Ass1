<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <DiscussionComment/>
                <DiscussionPage/>
            </div>
        </div>
    </div>
</template>

<script setup>
import DiscussionPage from '@/components/DiscussionPage.vue';
import DiscussionComment from '@/components/DiscussionComment.vue';
</script>

<style>
</style>