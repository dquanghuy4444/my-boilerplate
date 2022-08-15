import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import './plugins'

import './styles/base.css'
import './styles/reset.css'
import './styles/variables.css'

Vue.config.productionTip = false

const commitWindowWidth = () => store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth)


new Vue({
    store,
    router,
    mounted() {
        commitWindowWidth()
        window.addEventListener('resize', commitWindowWidth)
    },

    beforeDestroy() {
        window.removeEventListener('resize', commitWindowWidth)
    },
    render: h => h(App),
}).$mount('#app')
