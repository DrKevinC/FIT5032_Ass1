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

// function downloadPDF() {
//     const printableElement = printableContent.value;
//     html2pdf()
//         .from(printableElement)
//         .save('event.pdf')
//         .then(() => {
//             console.log("PDF downloaded succesfully")
//         })
//         .catch(error => {
//             console.error('Error generating PDF: ', error)
//         })
// }

function downloadPDF2() {
    const printableElement = printableContent.value;

    // Wait for all images to load
    const images = printableElement.getElementsByTagName('img');
    const imageLoadPromises = Array.from(images).map(img => {
        return new Promise((resolve) => {
            if (img.complete) {
                resolve();
            } else {
                img.onload = resolve;
                img.onerror = resolve; // Resolve on error to avoid hanging
            }
        });
    });

    Promise.all(imageLoadPromises).then(() => {
        html2pdf()
            .from(printableElement)
            .toPdf()
            .get('pdf')
            .then((pdf) => {
                pdf.save('event.pdf');
            })
            .then(() => {
                console.log("PDF downloaded successfully");
            })
            .catch(error => {
                console.error('Error generating PDF: ', error);
            });
    });
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
                <button class="btn btn-primary my-3" @click="downloadPDF2()">Download Event PDF</button>
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