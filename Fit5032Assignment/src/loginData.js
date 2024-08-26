import { ref } from 'vue';

export const isLoggedIn = ref(false);
export const isEventManager = ref(false);
export const currentUser = ref('');

export function login(loginFormData){
    if (EventManager.username == loginFormData.value.username) {
        if (EventManager.password == loginFormData.value.password) {
            isLoggedIn.value = true;
            isEventManager.value = true;
            currentUser.value = EventManager.username;
            return true
        }
    } else if (StandardUser.username == loginFormData.value.username) {
        if (StandardUser.password == loginFormData.value.password) {
            isLoggedIn.value = true;
            isEventManager.value = false;
            currentUser.value = StandardUser.username;
            return true
        }
    } else {
        return false
    }
}

export function logout(){
    isLoggedIn.value = false;
    isEventManager.value = false;
    currentUser.value = '';
}

const EventManager = {
    username: 'Admin',
    password: 'House_123'
}

const StandardUser = {
    username: 'User',
    password: 'User_123'
}