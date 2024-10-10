<script setup>
import { discussionStorage } from '@/data/firestoreData';
import router from '@/router';
import { computed } from 'vue';

// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column'

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
        return props.data
    } else {
        return props.data.slice(0, props.length)
    } 
})

const openDiscussion = (discussion) => {
    discussionStorage.value = discussion;
    router.push("/discussion");
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

            <div v-for="discussion in trimmedDiscussions" :key="discussion">
                <div @click="openDiscussion(discussion)" >
                    <div class="border border-black">
                        <div class="container my-2">
                            <div class="row align-items-center">
                                <div class="col-auto">
                                    <img :src=discussion.image :alt=discussion.imageAlt class="thumbnail">
                                </div>
                                <div class="col ms-3">
                                    <button class="covert-button">
                                        <h5 class="mb-1" @click="openDiscussion(discussion)">{{ discussion.title }}</h5>
                                    </button>
                                    <p class="mb-0 text-muted">{{ discussion.body }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="row mt-5">
            <DataTable :value="trimmedDiscussions" tableStyle="min-width: 50rem">
                <Column field="title" header="title"></Column>
                <Column field="body" header="body"></Column>
                <Column field="avgRating" header="rating"></Column>
                <Column field="ratings" header="votes"></Column>
            </DataTable>
        </div> -->
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
    .covert-button {
        background: none;      /* Remove background */
        border: none;          /* Remove border */
        padding: 0;            /* Remove padding */
        font: inherit;         /* Inherit font styles */
        cursor: pointer;       /* Change cursor to pointer */
    }
</style>