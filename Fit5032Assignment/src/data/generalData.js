// This file is to manage all the general event and discussion data management
import discussionsJSON from '@/data/discussions.json';
import eventsJSON from '@/data/events.json';
import { ref } from 'vue';

export const eventStorage = ref(null);
export const discussionStorage = ref(null);

export const events = ref([]);
export const discussions = ref([]);

// DISCUSSIONS
class Comment {
    constructor(username, rating, text, timestamp=new Date()){
        this.username = username;
        this.rating = rating;
        this.text = text;
        this.timestamp = timestamp;
    }
    createCommentList(commentList){
        const comments = [];
        for(let i = 0; i < commentList.length; i++) {
            comments.push(new Comment(commentList[i].username, commentList[i].rating, commentList[i].text, commentList[i].timestamp));
        }
        return comments;
    }
}

class Discussion {
    idCounter = 1
    constructor() {
        this.id = Discussion.idCounter;
        Discussion.idCounter += 1;
        this.avgRating = 0;
        this.ratings = 0;
    }
    createWithEvent(event){
        // image
        this.img = event.img;
        this.imageAlt = event.imageAlt;

        // title
        this.title = event.eventName;
        this.body = "Comments and reviews on " + event.eventName;

        this.comments = [];
        this.eventLinked = true;
    }
    jsonDiscussion(discussionJSON){
        // image
        this.img = discussionJSON.img;
        this.imageAlt = discussionJSON.imageAlt;

        this.title = discussionJSON.title;
        this.body = discussionJSON.body;

        this.comments = [];
        this.eventLinked = false;
    }
    addComment(username, rating, body) {
        this.comments.push(new Comment(username, rating, body))
    }
}

for (let i in discussionsJSON.discussions) {
    let d = new Discussion();
    d.jsonDiscussion(discussionsJSON.discussions[i]);
    discussions.value.push(d);
}


// EVENTS
class Event {
    idCounter = 1
    constructor(){
        // id
        this.id = Event.idCounter;
        Event.idCounter += 1 // iterate 1
        this.avgRating = ref(0)
        this.ratings = ref(0)
    }
    newEvent(username, eventName, bodyText, previewText, img, imgAlt){
        // text and user info
        this.username = username; // who creates and owns the event
        this.eventName = eventName;
        this.bodyText = bodyText;
        this.previewText = previewText;
        // image stuff
        this.img = img;
        this.imgAlt = imgAlt;
        this.bannerImg = img;
        this.bannerImgAlt = imgAlt.
        // rating system default
        this.ratings.value = 0;
        this.avgRating.value = 0;
        // linked Discussion
        this.createPairedDiscussion(this)
    }
    jsonEvent(eventJSON){
        // text and user info
        this.username = eventJSON.username; // who creates and owns the event
        this.eventName = eventJSON.eventName;
        this.bodyText = eventJSON.bodyText;
        this.previewText = eventJSON.previewText;
        // image stuff
        this.img = eventJSON.img;
        this.imgAlt = eventJSON.imgAlt;
        this.bannerImg = eventJSON.bannerImg;
        this.bannerImgAlt = eventJSON.bannerImgAlt;
        // rating system default
        this.ratings.value = eventJSON.ratings;
        this.avgRating.value = eventJSON.avgRating;
        // linked Discussion
        this.createPairedDiscussion(this)
    }
    createPairedDiscussion(event){
        const linkedDiscussion = new Discussion();
        linkedDiscussion.createWithEvent(event);
        linkedDiscussion.addComment("haterJohnson", 3, "I hate this and I'm hater Johnson")
        this.discussion = linkedDiscussion;
    }
}

for (let i in eventsJSON.events) {
    let e = new Event();
    e.jsonEvent(eventsJSON.events[i]);
    events.value.push(e);
}