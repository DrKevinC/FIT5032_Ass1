import { ref } from "vue";
import db from "../firebase/init";
import { setDoc, doc, getDoc, updateDoc, query, collection, getDocs, where} from "firebase/firestore";

export const eventStorage = ref(null);
export const discussionStorage = ref(null);

export const events = ref([]);
export const discussions = ref([]);

class Comment {
    constructor(username, email, rating, text, timestamp=new Date()){
        this.username = username;
        this.email = email
        this.rating = rating;
        this.text = text;
        this.timestamp = timestamp;
    }
    static getListFromData(data){
        const comments = [];
        for(let i = 0; i < data.length; i++) {
            comments.push(new Comment(data[i].username, data[i].email, data[i].rating, data[i].text, data[i].timestamp));
        }
        return comments;
    }
}

class Discussion {
    constructor(
        title,
        body,
        image,
        imageAlt,
        totalRating,
        totalVotes,
        commentData,
        eventLinked = false,
        event = null
    ){
        // image
        this.image = image;
        this.imageAlt = imageAlt;
        // body and title
        this.title = title;
        this.body = body;
        // rating and votes
        this.totalRating = totalRating;
        this.totalVotes = totalVotes;
        // eventLinking
        this.eventLinked = eventLinked;
        if (eventLinked){
            if (event == null){
                throw new Error("EventLinked Discussion created without event")
            }
            // only important if eventLinked
            this.eventName = event.title;
            this.eventEmail = event.email;
            this.eventUser = event.username;
        } else {
            this.eventName = null;
            this.eventEmail = null;
            this.eventUser = null;
        }
        // Comments
        this.comments = Comment.getListFromData(commentData);

    }
    addComment(username, email, rating, bodyText, timestamp=new Date()){
        this.comments.push(new Comment(username, email, rating, bodyText, timestamp))
    }
}

class Event {
    constructor(
        title,
        body,
        preview,
        username,
        email,
        image,
        imageAlt,
        bannerImage,
        bannerAlt,
        totalRating,
        totalVotes
    ){
        // Event Basic Info
        this.title = title;
        this.body = body;
        this.preview = preview;
        // User Info
        this.username = username;
        this.email = email;
        // Images
        this.image = image;
        this.imageAlt = imageAlt;
        this.bannerImage = bannerImage;
        this.bannerAlt = bannerAlt;
        // ratings and votes
        this.totalRating = totalRating;
        this.totalVotes = totalVotes;
    }
}

discussions.value.push(new Discussion("Gardening MegaThread",
    "Where we talk about gardens",
    "https://www.naturescolours.com.au/wp-content/uploads/2019/04/Monstera-Deliciosa-White-Ceramic-Pot-Set-210mm-1.jpg",
    "Picture of a plant",
    40,
    10,
    [new Comment("Admirabalis", null, 5, "I love the taste of seagrass"), new Comment("Servent of Wrath", null, 2, "The creatures of the soil wish to lay claim to all i set into the soil :/")],
    false
))
// const tempEvent = new Event(
// "Bird Watching with Alan",
// "I like to watch the birds.... Let's go together... I want to see... what they are doing? In their nests... where I can't see them, I wish to observe...",
// "Observing the Birds... Those little guys... yeah....",
// "Creepy Alan",
// null,
// "https://i.ytimg.com/vi/ml7bK1jg69I/maxresdefault.jpg",
// "Two birdwatchers, male and female holding binoculars",
// "https://i.ytimg.com/vi/ml7bK1jg69I/maxresdefault.jpg",
// "Two birdwatchers, male and female holding binoculars",
// 20,
// 4)
// firestoreAddEvent(tempEvent)

// firestoreAddDiscussion(new Discussion(
//     "Bird Watching with Creepy Alan",
//     "A discussion to talk about bird watching with Alan",
//     "https://i.ytimg.com/vi/ml7bK1jg69I/maxresdefault.jpg",
//     "Two birdwatchers, male and female holding binoculars",
//     20,
//     4,
//     JSON.stringify([new Comment('Alan', null, 5, "Why does... it say... I'm creepy?")]),
//     true, tempEvent
// ))

export async function firestoreAddEvent(event){
    try {
        await setDoc(doc(db, "Events", event.title), {
            // Event Basic Info
        title: event.title,
        body: event.body,
        preview: event.preview,
        // User Info
        username: event.username,
        email: event.email,
        // Images
        image: event.image,
        imageAlt: event.imageAlt,
        bannerImage: event.bannerImage,
        bannerAlt: event.bannerAlt,
        // ratings and votes
        totalRating: event.totalRating,
        totalVotes: event.totalVotes
        })
        console.log(event.title, " Added to the database succesfully")
    } catch (error) {
        console.log("Failed to add Event to Database: ", error);
    }
}

export async function firestoreAddDiscussion(discussion){
    try {
        await setDoc(doc(db, "Discussions", discussion.title), {
            // Event Basic Info
        title: discussion.title,
        body: discussion.body,
        // Images
        image: discussion.image,
        imageAlt: discussion.imageAlt,
        // ratings and votes
        totalRating: discussion.totalRating,
        totalVotes: discussion.totalVotes,
        // Event Linking
        eventLinked: discussion.eventLinked,
        eventName: discussion.eventName,
        eventEmail: discussion.eventUser,
        eventUser: discussion.eventUser,
        //
        comments: JSON.stringify(discussion.comments)
        });
        console.log(discussion.title, " Added to the database succesfully");
    } catch (error) {
        console.log("Failed to add Discussion to database: ", error);
    }
}

export async function firestoreUpdateDiscussionComment (discussionTitle, new_comments, eventRef=null) {
    const docRef = doc(db, 'Discussions', discussionTitle);
    try {
        // Race conditions could erase comments ~ Probably not a pressing issue
        await updateDoc(docRef, {
            comments: new_comments
        })
        console.log(discussionTitle, " Updated succesfully");
        if (eventRef) {
            const docRef2 = doc(db, 'Events', eventRef.value.title);
            await updateDoc(docRef2, {
                totalRating: eventRef.value.totalRating,
                totalVotes: eventRef.value.totalVotes
            })
        }
    } catch (error) {
        console.log("Failed to retrieve discussion from database: ", error)
    }
}

export async function firestoreGetEvent (eventTitle){
    const docRef = doc(db, 'Events', eventTitle);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw new Error("KEVIN: Couldn't find eventTitle")
        }
    } catch (error) {
        console.log("Failed to retrieve event from database: ", error)
    }
}

export async function firestoreGetDiscussion (discussionTitle){
    const docRef = doc(db, 'Discussions', discussionTitle);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw new Error("KEVIN: Couldn't find discussionTitle")
        }
    } catch (error) {
        console.log("Failed to retrieve discussion from database: ", error)
    }
}

export async function firestoreUpdateEvents (){
    // return all events
    try {
        const q = query(collection(db, 'Events'));
        const querySnapshot = await getDocs(q);
        const eventsArray = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            eventsArray.push(new Event(
                data.title,
                data.body,
                data.preview,
                data.username,
                data.email,
                data.image,
                data.imageAlt,
                data.bannerImage,
                data.bannerAlt,
                data.totalRating,
                data.totalVotes
            ))
        })
        events.value = eventsArray;
        console.log("Events Fetched Succesfully")
    } catch (error) {
        console.error('Error fetching Events: ', error)
    }
}

export async function firestoreUpdateDiscussions(){
    // return all discussions
    try {
        const q = query(collection(db, 'Discussions'));
        const querySnapshot = await getDocs(q);
        const discussionsArray = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            discussionsArray.push( new Discussion(
                data.title,
                data.body,
                data.image,
                data.imageAlt,
                data.totalRating,
                data.totalVotes,
                JSON.parse(data.comments), // convert from string to JSON
                data.eventLinked,
                {
                    title: data.eventName,
                    email: data.eventEmail,
                    username: data.eventUser
                }
            ));
        });
        discussions.value = discussionsArray;
        console.log("Discussions Fetched Succesfully")
    } catch (error) {
        console.error('Error fetching Discussions: ', error)
    }
}

export async function firestoreGetLinkedDiscussions(event){
    // return all discussions related to an event
    try {
        const q = query(collection(db, 'Discussions'), where('eventName', '==', event.title));
        const querySnapshot = await getDocs(q);
        const discussionsArray = ref([]);
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            discussionsArray.value.push( new Discussion(
                data.title,
                data.body,
                data.image,
                data.imageAlt,
                data.totalRating,
                data.totalVotes,
                JSON.parse(data.comments), // convert from string to JSON
                data.eventLinked,
                {
                    title: data.eventName,
                    email: data.eventEmail,
                    username: data.eventUser
                }
            ));
        });
        console.log("Linked discussions Fetched Succesfully");
        return discussionsArray;
    } catch (error) {
        console.error('Error fetching Discussions: ', error)
    }
}

export function getLinkedDiscussions(event){
    return discussions.value.filter(discussion => 
        discussion.eventLinked === true && discussion.eventName === event.title
    );
}

// Initial syncing
firestoreUpdateEvents();
firestoreUpdateDiscussions();