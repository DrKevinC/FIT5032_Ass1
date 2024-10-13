<script setup>
import { eventStorage } from '@/data/firestoreData';
import { computed, ref } from 'vue';
import html2pdf from 'html2pdf.js';

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

const printableContent = ref(null);

function downloadPDF() {
    const printableElement = printableContent.value;
    const opt = {
            margin: 0,
            filename: 'Event.pdf',
            image: { type: 'jpeg', quality: 0.20 },
            html2canvas: { scale: 2,useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'p' }
        };
    html2pdf()
        .set(opt)
        .from(printableElement)
        .save()
        .then(() => {
            console.log("PDF downloaded succesfully")
        })
        .catch(error => {
            console.error('Error generating PDF: ', error)
        })
}

</script>

<template>
    <div class="mb-5" ref="printableContent">
        <div class="header-image-container">
            <img class="header-image"
                :src=event.bannerImage
                :alt=event.bannerAlt>
        </div>
        <div class="border border-black">
            <div class="mx-2">
                <div class="center-text">
                    <h2>{{ event.title }}</h2>
                    <p class="allow-linebreaks" v-html="event.body"></p> <!-- Assume that we've got appropriatte security on the admin dashboard{{ event.body }}</p>-->
                    
                    <div class="rating-container">
                        <span>Rating:</span>
                        <span class="star-span">{{ stars }}</span>
                        <span>Votes: {{ event.totalVotes }}</span>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column align-items-center">
                <button class="btn btn-primary my-3" @click="downloadPDF()">Download Event PDF</button>
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
.allow-linebreaks {
    white-space: pre-wrap; /* CSS property to handle line breaks */
}
</style>