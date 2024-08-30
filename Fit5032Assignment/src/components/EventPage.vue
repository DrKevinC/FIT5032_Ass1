<script setup>
import { eventStorage } from '@/data/generalData';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// failsafe if no event is loaded
const router = useRouter();
if (!eventStorage.value){
    router.push("/")
}

const event = eventStorage;
const ratings = computed(() => event.value.ratings)

const stars = computed(() => {
    // I'm too lazy to code this dynamically
    let x = eventStorage.value.avgRating;
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
                :src=event.bannerImg
                :alt=event.bannerImageAlt>
        </div>
        <div class="border border-black">
            <div class="mx-2">
                <div class="center-text">
                    <h2>{{ event.eventName }}</h2>
                    <p>{{ event.bodyText }}</p>
                    
                    <div class="rating-container">
                        <span>Rating:</span>
                        <span class="star-span">{{ stars }}</span>
                        <span>Votes: {{ ratings }}</span>
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