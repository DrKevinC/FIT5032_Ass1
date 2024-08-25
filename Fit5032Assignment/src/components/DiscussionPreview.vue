<script setup>
</script>

<template>
    <div class="my-5">
        <div class="border border-black">
            <div class="border border-black border-1">
                <div class="mx-2">
                    <h10>Discussions</h10>
                </div>
            </div>    

            <div class="border border-black">
                <div class="container my-2">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img src="https://via.placeholder.com/100" alt="Thumbnail" class="thumbnail">
                        </div>
                        <div class="col ms-3">
                            <h5 class="mb-1">Discussion Title</h5>
                            <p class="mb-0 text-muted">Discussion Subtext goes here.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="border border-black">
                <div class="container my-2">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img src="https://via.placeholder.com/100" alt="Thumbnail" class="thumbnail">
                        </div>
                        <div class="col ms-3">
                            <h5 class="mb-1">Discussion Title</h5>
                            <p class="mb-0 text-muted">Discussion Subtext goes here.</p>
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