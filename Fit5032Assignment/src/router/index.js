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
import { eventStorage, discussionStorage } from '@/data/firestoreData'
import { isEventManager } from '@/data/loginData'

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

// router guards
router.beforeEach((to, from) => {
  if (to.name === 'Event' && (!eventStorage.value )) { //|| !discussionStorage.value)) {
    return { name: 'EventOverview'}
  }
  if (to.name ==='Discussion' && !discussionStorage.value){
    return { name: 'DiscussionOverview'}
  }
  // Router guard to prevent non-event-managers accessing event manager pages
  if ((to.name === 'EventManager' || to.name === 'EventCreator') && !(isEventManager == true)) {
    return {name: from.name}
  }
})

export default router