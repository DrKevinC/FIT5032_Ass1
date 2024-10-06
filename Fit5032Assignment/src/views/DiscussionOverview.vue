<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <DiscussionPreviewPrimeView :data="discussions" :length="0" :filter="true" />
            </div>
        </div>
    </div>
</template>

<script setup>
// import DiscussionPreview from '@/components/DiscussionPreview.vue';
import DiscussionPreviewPrimeView from '@/components/DiscussionPreviewPrimeView.vue';
import { discussions } from '@/data/firestoreData';
</script>

<style>
</style>