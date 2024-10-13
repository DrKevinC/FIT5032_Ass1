<script setup>
import CommentPrimeVue from './CommentPrimeVue.vue';
import { ref } from 'vue';

const props = defineProps({
    discussion: {
        type: Object,
        required: true
    },
});

const discussion = ref(props.discussion);
</script>

<template>
    <div class="mb-5">
        
        <div class="border border-black">

            <div class="border border-black border-1">
                <div class="mx-2">
                    <h5>Discussions</h5>
                </div>
            </div>

            <div class="border border-black">
                <div class="container my-2">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img :src=discussion.image :alt=discussion.imageAlt class="thumbnail">
                        </div>
                        <div class="col ms-3">
                            <h5 class="mb-1">{{ discussion.title }}</h5>
                            <p class="mb-0 text-muted">{{ discussion.body }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <CommentPrimeVue :comments="discussion.comments" :eventLinked="discussion.eventLinked"/>
        </div>
    </div>
</template>

<style scoped>
    .thumbnail {
      width: 100px; /* Adjust the size as needed */
      height: 100px; /* Ensure it's square */
      object-fit: cover; /* Ensures the image covers the square area without distortion */
    }
    .thumbnail-container {
      display: flex;
      align-items: center; /* Vertically centers the image and text */
    }
</style>