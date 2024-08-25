<script setup>
import { isLoggedIn, isEventManager } from '@/loginData';
</script>

<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <h1 class="text-center mt-4">Client Charity Banner</h1>
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/resources" class="nav-link" active-class="active">Resources</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/eventOverview" class="nav-link" active-class="active">Events</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/discussionOverview" class="nav-link" active-class="active">Discussions</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="nav-link" active-class="active">Contact Us</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/donate" class="nav-link" active-class="active">Donate</router-link>
        </li>
        <li v-if="isEventManager" class="nav-item">
          <router-link to="/eventManager" class="nav-link" active-class="active">Event Manager</router-link>
        </li>
      </ul>
      <ul class="nav nav-pills">
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link to="/register" class="nav-link" active-class="active">Register</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
