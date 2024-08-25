import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ResourcesView from '@/views/ResourcesView.vue'
import EventView from '@/views/EventView.vue'
import EventOverview from '@/views/EventOverview.vue'
import EventManager from '@/views/EventManager.vue'
import EventCreator from '@/views/EventCreator.vue'
import DonateView from '@/views/DonateView.vue'
import DiscussionView from '@/views/DiscussionView.vue'
import DiscussionOverview from '@/views/DiscussionOverview.vue'
import ContactView from '@/views/ContactView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/resources',
    name: 'Resources',
    component: ResourcesView
  },
  {
    path: '/event',
    name: 'Event',
    component: EventView
  },
  {
    path: '/eventOverview',
    name: 'EventOverview',
    component: EventOverview
  },
  {
    path: '/eventManager',
    name: 'EventManager',
    component: EventManager
  },
  {
    path: '/eventCreator',
    name: 'EventCreator',
    component: EventCreator
  },
  {
    path: '/donate',
    name: 'Donate',
    component: DonateView
  },
  {
    path: '/discussion',
    name: 'Discussion',
    component: DiscussionView
  },
  {
    path: '/discussionOverview',
    name: 'DiscussionOverview',
    component: DiscussionOverview
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router