// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from "./store";
import Notifications from 'vue-notification'
import './assets/css/app.css'
import axios from 'axios';

Vue.use(Notifications)
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
	store: store,
	el: '#app',
	router,
	components: {App},
	template: '<App/>'
})

// Develop
// global.vx = vm
