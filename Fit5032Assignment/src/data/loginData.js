import { ref } from 'vue';

export const isLoggedIn = ref(false);
export const isEventManager = ref(false);
export const currentUser = ref('');

const UserMap = {};

class User {
    constructor(username, email, password, isEventManager){
        this.username = username;
        this.email = email;
        this.password = password;
        this.isEventManager = isEventManager;
    }
}

// Add 2 default Users
UserMap['Admin'] = new User('Admin', 'email@email.com','House_123', true);
UserMap['User'] = new User('User', 'email@email.com', 'User_123', false);

// functions
export function login(loginFormData){
    if (loginFormData.value.username in UserMap){
        let userToCheck = UserMap[loginFormData.value.username]
        if (loginFormData.value.password === userToCheck.password){
            isLoggedIn.value = true;
            currentUser.value = userToCheck.username;
            isEventManager.value = userToCheck.isEventManager;
            return true
        }
    }
    return false // incorrect username of password
}

export function register(registerFormData){ // client side authentication hehe
    if (registerFormData.value.username in UserMap){
        return false // username is already in use - error
    } else {
        UserMap[registerFormData.value.username] = new User(registerFormData.value.username,registerFormData.value.email, registerFormData.value.password, registerFormData.value.isEventManager);
        return true
    }
}

export function logout(){
    isLoggedIn.value = false;
    isEventManager.value = false;
    currentUser.value = '';
}