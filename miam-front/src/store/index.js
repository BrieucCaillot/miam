import Vue from 'vue'
import Vuex from 'vuex'
import index from "../router";

Vue.use(Vuex)

const state = {
	user: {
		connected: false,
		token: ""
	},
	productCategories: [],
	products: [],
	card: {
		show: false,
		validate: false,
		confirmed: false
	},
	informations: {
		delivery: {
			address: "Remplir une adresse",
			time: "Remplir un délai de livraison",
			modified: false
		},
	},
	stripeToken: {},
	productsCard: [],
}

const getters = {
	user(state) {
		return state.user
	},
	showCard(state) {
		return state.card.show
	},
	delivery(state) {
		return state.informations.delivery
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
	},
	DELIVERY_INFORMATIONS: (state, payload) => {
		state.informations.delivery.address = payload.address
		state.informations.delivery.time = payload.time
		state.informations.delivery.modified = payload.modified
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
	actions
})

