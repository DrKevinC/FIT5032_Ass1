<script setup>
import { computed } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    // how many to preview, 0 means all/infinite
    length: {
        type: Number,
        required: true
    },
    // include advanced search features
    filter: {
        type: Boolean,
        required: true
    }
})

const trimmedDiscussions = computed(() => {
    if (props.length <= 0){
        return props.data.discussions
    } else {
        return props.data.discussions.slice(0, props.length)
    } 
})

</script>

<template>
    <div class="my-5">
        <div class="border border-black">
            <div class="border border-black border-1">
                <div class="mx-2">
                    <h5>Discussions</h5>
                </div>
            </div>    

            <div v-for="discussion in trimmedDiscussions" :key="discussion">
                <div class="border border-black">
                    <div class="container my-2">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <img :src=discussion.img :alt=discussion.imageAlt class="thumbnail">
                            </div>
                            <div class="col ms-3">
                                <h5 class="mb-1">{{ discussion.title }}</h5>
                                <p class="mb-0 text-muted">{{ discussion.body }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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