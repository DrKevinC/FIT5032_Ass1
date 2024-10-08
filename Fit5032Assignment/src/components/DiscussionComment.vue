<script setup>
import { eventStorage, firestoreUpdateDiscussionComment } from '@/data/firestoreData';
import { isLoggedIn, currentUser, currentUserEmail } from '@/data/loginData';
import { ref } from 'vue';

const props = defineProps({
    discussion: {
        type: Object,
        required: true
    }
})

const discussion = ref(props.discussion);
const event = eventStorage;
// If its eventLinked it needs to have the rating feature
const isEventLinked = discussion.value.eventLinked;

const comment = ref('');
const currentRating = ref(0);
const commentErrors = ref({
    body: null,
    rating: null
})

const validateRating = (blur) => {
    if (!isEventLinked){
        commentErrors.value.rating = null;
    } else if (currentRating.value == 0){
        if (blur) commentErrors.value.rating = 'Rating has not been selected';
    } else {
        commentErrors.value.rating = null;
    }
}

const validateComment = (blur) => {
    if (comment.value === ''){
        if (blur) commentErrors.value.body = 'Please include text in comment'
    } else {
        commentErrors.value.body = null;
    }
}

const rating = (index) => {
    commentErrors.value.rating = ''
    currentRating.value = index;
}

const clearComment = () => {
    comment.value = '';
    currentRating.value = 0;
    commentErrors.value = {
        body: null,
        rating: null
    }
}

const sendComment = () => {
    // check content
    validateRating(true);
    validateComment(true);
    let eventPointer = null;
    if(!commentErrors.value.body && !commentErrors.value.rating){
        // update event rating
        if(isEventLinked){
            event.value.totalRating += currentRating.value;
            event.value.totalVotes +=1;
            eventPointer = event;
        }        
        // add the comment to the discussion
        discussion.value.addComment((' ' + currentUser.value).slice(1), (' ' + currentUserEmail.value).slice(1), currentRating.value, comment.value); // apparently a chrome issue workaround
        firestoreUpdateDiscussionComment(discussion.value.title, JSON.stringify(discussion.value.comments), eventPointer); // Technically this should be await but I'm not overly concerned
        clearComment();
    }
}
</script>

<template>
    <div class="mb-5">
        <div class="border border-black border-2">
            <div class="border border-black border-1">
                <div class="mx-2">
                    <h5>Vote</h5>
                </div>
            </div>
            <div v-if="!isLoggedIn" class="mx-2">
                <p>Please 
                    <router-link to="/login" active-class="active">Login</router-link>
                 or 
                    <router-link to="/register" active-class="active">Register</router-link>
                 to Comment</p>
            </div>
            <div v-else class="mx-2 comment-container">
                <div class="comment-content">
                    <p> Comment as {{ currentUser }}:</p>
                    <input type="text" 
                        class="form-control"
                        spellcheck="true"
                        placeholder="What do you think of this topic?"
                        @blur="() => validateComment(true)"
                        @input="() => validateComment(false)"
                        v-model="comment">
                    <div v-if="commentErrors" class="text-danger">{{ commentErrors.body }}</div>
                    <div>

                    </div>
                    <div v-if="isEventLinked" class="star-rating">
                        <span v-for="(star, index) in 5"
                            :key="index"
                            @click="rating(index + 1)"
                            :class="['star', { active: index < currentRating }]">
                            ★
                        </span>
                    </div>
                    <div v-if="commentErrors" class="text-danger">{{ commentErrors.rating }}</div>
                    <button type="button" class="btn btn-primary my-3" @click="sendComment">Submit</button>
                    <button type="button" class="btn btn-secondary my-3 mx-2" @click="clearComment">Clear</button>
                </div>
            </div>
        </div>   
    </div>
</template>

<style scoped>
.star-rating {
  display: flex;
  font-size: 2rem;
  color: gray;
  cursor: pointer;
}

.star-rating .star.active {
  color: gold;
}

.comment-container {
    display: flex;
    align-items: flex-start;
    /* spacing between button and content */
    gap: 10px;
}

.comment-content {
    flex: 1;
}
</style>