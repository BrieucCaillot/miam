import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
	key: 'vuex',
	storage: window.localStorage,
	reducer: (state) => ({
		user: state.user,
		// productsCard: state.productsCard,
		delivery: state.delivery
	}),
})

const state = {
	user: {
		connected: false,
		token: "",
		firstname: "",
		lastname: "",
		email: "",
	},
	productCategories: [],
	products: [],
	productsCard: [],
	card: {
		show: false,
		validate: false,
		confirmed: false
	},
	delivery: {
		address: "",
		time: "",
		modified: false
	},
	stripeToken: {},
}

const getters = {
	user(state) {
		return state.user
	},
	showCard(state) {
		return state.card.show
	},
	delivery(state) {
		return state.delivery
	},
	productCard(state) {
		return state.productsCard
	},
	totalPrice(state) {
		let array = [];
		let sum;
		let total = state.productsCard.forEach((item) => {
			array.push(item.price * item.quantity)
			sum = array.reduce((a, b) => a + b, 0).toFixed(2);
		})
		return sum
	},
	stripeToken(state) {
		return state.stripeToken
	},
	validate(state) {
		return state.card.validate
	},
	confirmed(state) {
		return state.card.confirmed
	},
	productCategories(state) {
		return state.productCategories
	},
	products(state) {
		return state.products
	}
}

const mutations = {
	USER_CONNECTED: (state, payload) => {
		state.user.connected = payload.connected
		state.user.token = payload.token
		state.user.firstname = payload.firstname
		state.user.lastname = payload.lastname
		state.user.email = payload.email
	},
	DELIVERY_INFORMATIONS: (state, payload) => {
		state.delivery.address = payload.address
		state.delivery.time = payload.time
		state.delivery.modified = payload.modified
	},
	RESET_CARD: (state, payload) => {
		state.productsCard = payload
	},
	ADD_PRODUCT: (state, payload) => {
		let newProduct = 0
		state.productsCard.map((item) => {
			if (item.id == payload.id) {
				item.quantity++
				newProduct = 1
			}
		})
		if (newProduct == 0)
			state.productsCard.push(payload)
	},
	REMOVE_PRODUCT: (state, payload) => {
		state.productsCard.push(payload)
	},
	ADD_QUANTITY(state, payload) {
		for (let product of state.productsCard) {
			if (product.id == payload.id) {
				product.quantity++
			}
		}
	},
	REMOVE_QUANTITY(state, payload) {
		state.productsCard.map((item, index) => {
			if (item.id == payload.id) {
				item.quantity--
				if (item.quantity <= 0) {
					state.productsCard.splice(index, 1)
				}
			}
		})
	},
	SHOW_CARD_CHANGE: (state, payload) => {
		state.card.show = payload
	},
	SEND_TOKEN: (state, payload) => {
		state.stripeToken = payload
	},
	CHECKOUT_VALIDATE: (state, payload) => {
		state.card.validate = payload
	},
	CHECKOUT_CONFIRMED: (state, payload) => {
		state.card.confirmed = payload
	},
	FETCH_PRODUCT_CATEGORIES_ACTION: (state, payload) => {
		state.productCategories.push(payload)
	},
	FETCH_PRODUCTS_ACTION: (state, payload) => {
		state.products.push(payload)
	},
}

const actions = {
	userConnectedAction: ({commit}, payload) => {
		commit('USER_CONNECTED', payload)
	},
	deliveryInformationsAction: ({commit}, payload) => {
		commit('DELIVERY_INFORMATIONS', payload)
	},
	resetCardAction: ({commit}, payload) => {
		commit('RESET_CARD', payload)
	},
	addProductAction: ({commit}, payload) => {
		commit('ADD_PRODUCT', payload)
	},
	removeProductAction: ({commit}, payload) => {
		commit('REMOVE_PRODUCT', payload)
	},
	addQuantityAction: ({commit}, payload) => {
		commit('ADD_QUANTITY', payload)
	},
	removeQuantityAction: ({commit}, payload) => {
		commit('REMOVE_QUANTITY', payload)
	},
	showCardAction: ({commit}, payload) => {
		commit('SHOW_CARD_CHANGE', payload)
	},
	sendTokenAction: ({commit}, payload) => {
		commit('SEND_TOKEN', payload)
	},
	checkoutValidateAction: ({commit}, payload) => {
		commit('CHECKOUT_VALIDATE', payload)
	},
	checkoutConfirmedAction: ({commit}, payload) => {
		commit('CHECKOUT_CONFIRMED', payload)
	},
	fetchProductCategoriesAction: ({commit}, payload) => {
		commit('FETCH_PRODUCT_CATEGORIES_ACTION', payload)
	},
	fetchProductsAction: ({commit}, payload) => {
		commit('FETCH_PRODUCTS_ACTION', payload)
	}
}

export const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	plugins: [vuexLocalStorage.plugin]
})

