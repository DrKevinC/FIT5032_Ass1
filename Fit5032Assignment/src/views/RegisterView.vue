<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div margin="10px" padding="10px">
                    <div class="border border-black border-2 mb-4">
                        <h1 class="text-center mt-3">Register</h1>
                        <form @submit.prevent="submitRegisterForm">
                            <div class="row m-3">
                                <div class="col-md-6 col-sm-6">
                                    <label for="username" class="form-label">Username</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="username"
                                        @blur="() => validateUsername(true)"
                                        @input="() => validateUsername(false)"
                                        v-model="registerFormData.username"
                                    />
                                    <div v-if="registerFormErrors.username" class="text-danger">{{ registerFormErrors.username }}</div>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <label for="email" class="form-label">Email</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="email"
                                        @blur="() => validateEmail(true)"
                                        @input="() => validateEmail(false)"
                                        v-model="registerFormData.email"
                                    />
                                    <div v-if="registerFormErrors.email" class="text-danger">{{ registerFormErrors.email }}</div>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <label for="password" class="form-label">Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="password"
                                        @blur="() => validatePassword(true)"
                                        @input="() => validatePassword(false)"
                                        v-model="registerFormData.password"
                                    />
                                    <div v-if="registerFormErrors.password" class="text-danger">{{ registerFormErrors.password }}</div>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="confirmPassword"
                                        @blur="() => validateConfirmPassword(true)"
                                        @input="() => validateConfirmPassword(false)"
                                        v-model="registerFormData.confirmPassword"
                                    />
                                    <div v-if="registerFormErrors.confirmPassword" class="text-danger">{{ registerFormErrors.confirmPassword }}</div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="text-center">
                                    <div v-if="registerFormErrors.general" class="text-danger my-3">{{ registerFormErrors.general }}</div>
                                    <button type="submit" class="btn btn-primary me-2">Submit</button>
                                    <button type="button" class="btn btn-secondary" @click="clearRegisterForm">Clear</button>
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
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { register, login } from '@/data/loginData';

const router = useRouter();

const registerFormData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
})

const registerFormErrors = ref({
    username: null,
    password: null,
    confirmPassword: null,
    email: null,
    general: null 
})

const clearRegisterForm = () => {
    registerFormData.value = {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    }
    registerFormErrors.value = {
        username: null,
        password: null,
        confirmPassword: null,
        email: null,
        general: null
    }
}

const validateUsername = (blur) => {
    if (registerFormData.value.username.length < 3) {
        if (blur) registerFormErrors.value.username = 'Name must be at least 3 characters'
    } else {
        registerFormErrors.value.username = null
    }
}

const validateEmail = (blur) => {
    const emailCorrect = /^[^@]+@[^@]+\.[^@]+$/.test(registerFormData.value.email); // I copied this from a forum so it may be dodgy
    if (blur) {
        if (!emailCorrect) registerFormErrors.value.email = "Email format is invalid."
    } else {
        registerFormErrors.value.email = null;
    }
}

const validatePassword = (blur) => {
  const password = registerFormData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_-]/.test(password)

  if (password.length < minLength) {
    if (blur) registerFormErrors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) registerFormErrors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) registerFormErrors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) registerFormErrors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) registerFormErrors.value.password = 'Password must contain at least one special character.'
  } else {
    registerFormErrors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (registerFormData.value.password !== registerFormData.value.confirmPassword) {
    if (blur) registerFormErrors.value.confirmPassword = 'Passwords do not match.'
  } else {
    registerFormErrors.value.confirmPassword = null
  }
}

const submitRegisterForm = async () => {
    registerFormErrors.value.general = 'Loading...'
    validateUsername(true);
    validatePassword(true);
    validateConfirmPassword(true);
    validateEmail(true);
    if(!registerFormErrors.value.username && !registerFormErrors.value.password && !registerFormErrors.value.confirmPassword){
        if (await register(registerFormData)){
            if (await login(registerFormData)){
                registerFormErrors.value.general = null; // clear loading prompt
                router.push("/")
            } else {
                console.log("Something unexpectedly wrong happened to the form data");
            }
        } else {
            registerFormErrors.value.email = 'The chosen email is already in use'
        }
    }
    registerFormErrors.value.general = null; // clear loading prompt
}

</script>

<style>
</style>