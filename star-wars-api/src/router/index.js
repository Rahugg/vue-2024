import { createRouter, createWebHistory } from 'vue-router'
import CharactersView from '@/views/CharactersView.vue'
import LocationsView from '@/views/LocationsView.vue'
import EpisodesView from '@/views/EpisodesView.vue'
import CharacterView from '@/views/CharacterView.vue'
import LocationView from '@/views/LocationView.vue'
import EpisodeView from '@/views/EpisodeView.vue'
import TestView from '@/views/TestView.vue'

const routes = [
  {
    path: '/',
    name: 'Characters',
    component: CharactersView
  },
  {
    path: '/planets',
    name: 'Locations',
    component: LocationsView
  },
  {
    path: '/films',
    name: 'Episodes',
    component: EpisodesView
  },
  {
    path: '/characters/:id',
    name: 'Character',
    component: CharacterView
  },
  {
    path: '/planets/:id',
    name: 'Location',
    component: LocationView
  },
  {
    path: '/films/:id',
    name: 'Episode',
    component: EpisodeView
  },
  {
    path: '/test',
    name: 'Test',
    component: TestView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
