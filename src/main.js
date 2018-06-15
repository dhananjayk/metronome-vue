// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import Worker from './metronome.worker.js'

Vue.use(Vuetify)

Vue.config.productionTip = false
/* eslint-disable no-new */
var myapp = new Vue({
  el: '#app',
  data: {
    timerWorker: null
  },
  created: function () {
    this.timerWorker = new Worker()
  },
  router,
  components: { App },
  template: '<App/>'
})
myapp.play = false
