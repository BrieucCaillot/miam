import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import SignIn from '@/components/user/SignIn'
import SignUp from '@/components/user/SignUp'
import Modify from '@/components/user/Modify'
import Orders from '@/components/user/Orders'
import Validate from '@/components/buy/Validate'
import Confirm from '@/components/buy/Confirm'
import About from '@/components/informations/About'
import Legals from '@/components/informations/Legals'
import CGV from '@/components/informations/CGV'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/connexion',
			name: 'SignIn',
			component: SignIn
		},
		{
			path: '/inscription',
			name: 'SignUp',
			component: SignUp
		},
		{
			path: '/modifier',
			name: 'Modify',
			component: Modify
		},
		{
			path: '/valider',
			name: 'BuyStep1',
			component: Validate
		},
		{
			path: '/confirmer',
			name: 'BuyStep2',
			component: Confirm
		},
		{
			path: '/commandes',
			name: 'Orders',
			component: Orders
		},
		{
			path: '/apropos',
			name: 'About',
			component: About
		},
		{
			path: '/mentions-legales',
			name: 'Legals',
			component: Legals
		},
		{
			path: '/cgv',
			name: 'CGV',
			component: CGV
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})
