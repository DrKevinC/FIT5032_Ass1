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

const trimmedEvents = computed(() => {
    if (props.length <= 0){
        return props.data.events
    } else {
        return props.data.events.slice(0, props.length)
    }    
})
</script>

<template>
    <div class="my-5">
        <div class="border border-black border-2">

            <div class="border border-black border-1">
                <div class="mx-2">
                    <h5>Events</h5>
                </div>
            </div>
            
            <div v-for="event in trimmedEvents" :key="event">
                <div>
                    <div class="d-flex justify-content-center">
                        <img width="800" height="100"
                            :src=event.img
                            :alt=event.imageAlt>
                    </div>

                    <div class="border border-black">
                        <div class="mx-2">
                            <div class="center-text">
                                <h2>{{ event.eventName }}</h2>
                                <p>{{ event.eventPreviewText }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
</style>