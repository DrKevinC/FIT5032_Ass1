<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">Login Page</h1>
                <p class="text-center">Sub Info</p>

                <form @submit.prevent="formLogin">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="username" class="form-label">Username</label>
                            <input
                                type="text"
                                class="form-control"
                                id="username"
                                v-model="loginFormData.username"
                            />
                            <div v-if="loginFormErrors.username" class="text-danger">{{ loginFormErrors.username }}</div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="password" class="form-label">Password</label>
                            <input
                                type="text"
                                class="form-control"
                                id="password"
                                v-model="loginFormData.password"
                            />
                            <div v-if="loginFormErrors.password" class="text-danger">{{ loginFormErrors.password }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="text-center">
                            <div v-if="loginFormErrors.general" class="text-danger my-3">{{ loginFormErrors.general }}</div>
                            <button type="submit" class="btn btn-primary me-2">Submit</button>
                            <button type="button" class="btn btn-secondary" @click="clearLoginForm">Clear</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/data/loginData';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginFormData = ref({
    username: '',
    password: ''
})

const loginFormErrors = ref({
    username: '',
    password: '',
    general: ''
})

const clearLoginForm = () => {
    loginFormData.value = {
        username: '',
        password: ''
    }
    loginFormErrors.value = {
        username: '',
        password: '',
        general: ''
    }
}

const formLogin = () => {
    // Authenticate if correct
    if (login(loginFormData) === true) {
        // succesful login
        router.push("/");
    } else {
        loginFormErrors.value.general = "Invalid username or password"
    }
    
}

</script>

<style>
</style>