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
    <div margin="10px" padding="10px">
        <div v-for="pages in data.pages" :key="pages">
            <div class="border border-black border-2">
                <div class="d-flex justify-content-center">
                    <img width="800" height="200"
                        :src=pages.image
                        alt="Senior Couple"/>
                        <!--  class="img-fluid" could be added above but,
                        I need more info on how flexboxes work-->
                </div>
                <div class="border border-black">
                    <div class="mx-2">
                        <h1>{{ pages.heading }}</h1>
                        <div v-html="pages.bodyText"></div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
</style>