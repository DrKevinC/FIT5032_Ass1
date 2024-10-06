<script setup>
import { eventStorage } from '@/data/firestoreData';
import { computed } from 'vue';

const event = eventStorage;

const stars = computed(() => {
    // I'm too lazy to code this dynamically
    let x = eventStorage.value.totalRating / eventStorage.value.totalVotes ;
    if (x >= 5) {
        return "★★★★★"
    } else if (x >= 4) {
        return "★★★★☆"
    } else if (x >= 3) {
        return "★★★☆☆"
    } else if (x >= 2) {
        return "★★☆☆☆"
    } else if (x >= 1) {
        return "★☆☆☆☆"
    } else {
        return "☆☆☆☆☆"
    }
})
</script>

<template>
    <div class="mb-5">
        <div class="header-image-container">
            <img class="header-image"
                :src=event.bannerImage
                :alt=event.bannerAlt>
        </div>
        <div class="border border-black">
            <div class="mx-2">
                <div class="center-text">
                    <h2>{{ event.title }}</h2>
                    <p>{{ event.body }}</p>
                    
                    <div class="rating-container">
                        <span>Rating:</span>
                        <span class="star-span">{{ stars }}</span>
                        <span>Votes: {{ event.totalVotes }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.star-span {
    color: orange;
}
.rating-container {
    display: flex;
    justify-content: center; /* Centers items horizontally */
    gap: 10px;               /* Optional: adds spacing between spans */
    align-items: center;     /* Centers items vertically */
    margin-top: 10px;        /* Add space above the rating container */
}
.header-image {
    width: 100%;
    height: 100px;
    overflow: hidden;
    position: relative;
}
.header-image-container {
    width: 100%;
    height: auto;
}
</style>