<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { eventStorage, discussionStorage } from '@/data/generalData';

const router = useRouter();

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

const trimmedEvents = computed(() => {
    if (props.length <= 0){
        return props.data
    } else {
        return props.data.slice(0, props.length)
    }    
})


const stars = (event) => {
    // I'm too lazy to code this dynamically
    if (event.avgRating >= 5) {
        return "★★★★★"
    } else if (event.avgRating >= 4) {
        return "★★★★☆"
    } else if (event.avgRating >= 3) {
        return "★★★☆☆"
    } else if (event.avgRating >= 2) {
        return "★★☆☆☆"
    } else if (event.avgRating >= 1) {
        return "★☆☆☆☆"
    } else {
        return "☆☆☆☆☆"
    }
}

const openEvent = (event) => {
    eventStorage.value = event;
    discussionStorage.value = event.discussion;
    router.push("/event")
}

</script>

<template>
    <div class="mb-5">
        <div class="border border-black border-2">

            <div class="border border-black border-1">
                <div class="mx-2">
                    <h5>Events</h5>
                </div>
            </div>
            
            <div v-for="event in trimmedEvents" :key="event">
                <div @click="openEvent(event)">
                    <div class="header-image-container">
                        <img class="header-image"
                            :src=event.bannerImg
                            :alt=event.bannerImageAlt>
                    </div>

                    <div class="border border-black">
                        <div class="mx-2">
                            <div class="center-text">
                                <h2>{{ event.eventName }}</h2>
                                <p>{{ event.previewText }}</p>
                                
                                <div class="rating-container">
                                    <span>Rating:</span>
                                    <span class="star-span">{{ stars(event) }}</span>
                                    <span>Votes: {{ event.ratings }}</span>
                                </div>
                            </div>
                        </div>
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
    margin-top: 10px;        /* Optional: add space above the rating container */
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