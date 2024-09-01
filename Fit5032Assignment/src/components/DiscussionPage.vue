<script setup>
import { discussionStorage } from '@/data/generalData';

const discussion = discussionStorage;
const isEventLinked = discussion.value.eventLinked;

const stars = (rating) => {
    // I'm too lazy to code this dynamically
    if (rating >= 5) {
        return "★★★★★"
    } else if (rating>= 4) {
        return "★★★★☆"
    } else if (rating >= 3) {
        return "★★★☆☆"
    } else if (rating >= 2) {
        return "★★☆☆☆"
    } else if (rating >= 1) {
        return "★☆☆☆☆"
    } else {
        return "☆☆☆☆☆"
    }
}
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
                            <img :src=discussion.img :alt=discussion.imageAlt class="thumbnail">
                        </div>
                        <div class="col ms-3">
                            <h5 class="mb-1">{{ discussion.title }}</h5>
                            <p class="mb-0 text-muted">{{ discussion.body }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-for="comment in discussion.comments" :key="comment">
                <div class="border border-black">
                    <div class="mx-2 my-1">
                        <b>User: {{ comment.username }}</b>
                        <p>{{ comment.text }}</p>
                        <div v-if="isEventLinked">
                            <b> Rating: </b>
                            <span>{{ stars(comment.rating) }}</span>
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