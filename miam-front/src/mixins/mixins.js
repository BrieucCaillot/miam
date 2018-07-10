import {mapGetters, mapActions} from 'vuex'

const mixins = {
	computed: {
		...mapGetters([
			'showCard',
			'productCard'
		]),
	},
	methods: {
		...mapActions([
			'userConnectedAction',
			'addProductAction',
			'removeProductAction',
			'addQuantityAction',
			'removeQuantityAction',
			'showCardAction'
		]),
		checkSession() {
			this.$http.get(`${process.env.URL_DEV}user/test`)
				.then((response) => {
					if (response.data.sessionData) {
						let user = {
							connected: true,
							token: response.data.sessionData.token
						}
						this.userConnectedAction(user)
					} else {
						let user = {
							connected: false,
							token: ''
						}
						this.userConnectedAction(user)
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
		addProduct(id, image, name, price) {
			let product = {
				id: id,
				image: image,
				name: name,
				price: price,
				quantity: 1
			}
			this.addProductAction(product)
			this.$notify({
				group: 'product',
				title: 'Article ajouté :',
				type: 'success',
				text: name
			});
		},
		addQuantity(id, name) {
			let product = {
				id: id,
			}
			this.addQuantityAction(product)
			this.$notify({
				group: 'product',
				title: 'Article ajouté :',
				type: 'success',
				text: name
			});
		},
		removeQuantity(id, name) {
			let product = {
				id: id,
			}
			this.removeQuantityAction(product)
			if (this.productCard.length <= 0) {
				this.$router.push({name: 'Home'})
				this.showCardAction(false)
			}
			this.$notify({
				group: 'product',
				title: 'Article supprimé :',
				type: 'warn',
				text: name
			});
		},
		getUrlImage(el) {
			return {
				'background': `#000 url(${process.env.URL_DEV}${el}) no-repeat center center`,
			}
		},
		scrollTop() {
			window.scrollTo(0, 0);
		},
		toggleModal() {
			this.showCardAction(!this.showCard)
		},
	},
	mounted() {
		this.checkSession()
		this.scrollTop()
	}
}

export default mixins;