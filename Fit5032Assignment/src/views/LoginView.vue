<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div margin="10px" padding="10px">
                    <div class="border border-black border-2 mb-4">
                        <h1 class="text-center mt-3">Login</h1>
                        <form @submit.prevent="formLogin">
                            <div class="row m-3">
                                <div class="col-md-6 col-sm-6">
                                    <label for="email" class="form-label">Email</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="email"
                                        v-model="loginFormData.email"
                                    />
                                    <div v-if="loginFormErrors.email" class="text-danger">{{ loginFormErrors.email }}</div>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <label for="password" class="form-label">Password</label>
                                    <input
                                        type="password"
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
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/data/loginData';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginFormData = ref({
    email: '',
    password: ''
})

const loginFormErrors = ref({
    email: '',
    password: '',
    general: ''
})

const clearLoginForm = () => {
    loginFormData.value = {
        email: '',
        password: ''
    }
    loginFormErrors.value = {
        email: '',
        password: '',
        general: ''
    }
}

async function formLogin() {
    // Authenticate if correct
    loginFormErrors.value.general = 'Loading...';
    if (await login(loginFormData) === true) {
        // succesful login
        loginFormErrors.value.general = null; // clear loading prompt
        router.push("/");
    } else {
        loginFormErrors.value.general = "Invalid email or password"
    }
}

</script>

<style>
</style>