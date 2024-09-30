import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from "firebase/firestore";
import db from "../firebase/init"
import axios from 'axios';

export const isLoggedIn = ref(false);
export const isEventManager = ref(false);
export const currentUser = ref(null);
export const currentUserEmail = ref(null);

// Login Behaviour:
// - Multiple Users can have the same username
// - If two users have the same email an appropriate error is returned
// - Database searches based on user emails


const Auth = getAuth();

async function addUserToDatabase(username, email, isAdmin) {
    try {
        await setDoc(doc(db, "Users", email), {
            email: email,
            username: username,
            isAdmin: isAdmin
        })
    } catch (error) {
        console.log("Database interface failed: ", error.code)
    }
}

async function retrieveUserDataFromDatabase(email) {
    const docRef  = doc(db, 'Users', email);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            // docSnap.data() will be undefined in this case
            throw new Error("Kevin Error: Email isn't in the database")
        }
    } catch (error) {
        console.log("Failed to retrieve user from database: ", error);
        return null;
    }
}

export async function login(loginFormData){
    try {
        await signInWithEmailAndPassword(Auth, loginFormData.value.email, loginFormData.value.password);
        console.log("Firebase Login Succesful");
        // Retrieve user profile data
        const userData = await retrieveUserDataFromDatabase(loginFormData.value.email);
        isLoggedIn.value = true;
        currentUser.value = userData.username;
        isEventManager.value = userData.isAdmin;
        return true
    } catch (error) {
        console.log(error.code)
        return false // incorrect username, password, or failed call
    }
}

export async function register(registerFormData){ // Messy but backend database registration is succesful
    try {
        await createUserWithEmailAndPassword(Auth, registerFormData.value.email, registerFormData.value.password);
        console.log("Firebase Register Succesful!");
        // Store user profile in the database
        await addUserToDatabase(registerFormData.value.username, registerFormData.value.email, false) // default not admin
        sendWelcomeEmail({
            to_name: registerFormData.value.username,
            from_name: "ElderConnect Team",
            email: registerFormData.value.email
        });
        return true
    } catch (error) {
        console.log(error.code);
        return false
    }
};

export function logout(){
    isLoggedIn.value = false;
    isEventManager.value = false;
    currentUser.value = null;
    currentUserEmail.value = null
}

async function sendWelcomeEmail(data) {
    // data required: to_name, data.email, from_name
    try {
        const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
            service_id: "service_51lekst",
            template_id: "template_04uc8tc",
            user_id: "tHfurR7-wGdtwuWx_",
            template_params: {
                    to_name: data.to_name,
                    message: data.email,
                    from_name: data.from_name,  
            }
        });
        console.log("Mail Send Success: ", response)
    } catch (error) {
        console.error('Error Sending Email Using SendJS', error)
    }
}