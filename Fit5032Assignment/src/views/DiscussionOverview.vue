<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <DiscussionPreview :data="discussions" :length="0" :filter="true" />
            </div>
        </div>
    </div>
</template>

<script setup>
import DiscussionPreview from '@/components/DiscussionPreview.vue';
import { discussions } from '@/data/generalData';
</script>

<style>
</style>