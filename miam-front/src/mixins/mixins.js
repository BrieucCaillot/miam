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
		logout() {
			let user = {
				connected: false,
				token: '',
			}
			this.userConnectedAction(user)
			this.$router.push({name: 'Home'})
		},
		toggleModal() {
			this.showCardAction(!this.showCard)
		},
	},
	mounted() {
		this.scrollTop()
	}
}

export default mixins;