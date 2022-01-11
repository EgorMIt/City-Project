import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'


Vue.mixin({
  data: function() {
    return {
      get hostname() {
        return "http://localhost:9000";
      }
    }
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
