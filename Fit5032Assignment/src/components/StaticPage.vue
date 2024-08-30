<script setup>
// Define props
defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
    <div>
        <div v-for="page in data.pages" :key="page">
            <div class="border border-black border-2 mb-4">
                <div class="header-image-container">
                    <img class="header-image"
                        :src=page.image
                        :alt=page.imageAlt />
                        <!--  class="img-fluid" could be added above but,
                        I need more info on how flexboxes work-->
                </div>
                <div class="border border-black">
                    <div class="mx-2">
                        <h1>{{ page.heading }}</h1>
                        <div v-html="page.bodyText"></div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
.header-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
}
.header-image-container {
    width: 100%;
    height: auto;
}
</style>