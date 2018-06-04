import Vue from 'vue'
import Router from 'vue-router'
import Metronome from '@/components/Metronome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Metronome',
      component: Metronome
    }
  ]
})
