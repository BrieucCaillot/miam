<template>
    <div id="modify">
        <Header/>
        <div class="page-content-info">
            <div class="columns full-h">
                <div class="column page-content-info__left pd0 p-rel">
                    <div class="page-content-info__left__img"></div>
                </div>
                <div class="column page-content-info__right is-6-desktop is-12-tablet">
                    <div class="level">
                        <div class="level-left"></div>
                        <div class="level-right">
                            <div class="level-item">
                                <router-link class="button mg-r2 button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-primary"
                                             :to="{name: 'Modify'}">
                                    Mon profil
                                </router-link>
                                <button @click.prevent="logout"
                                        class="button button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-primary">
                                    Se déconnecter
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="level pd-t5 pd-b2">
                        <div class="level-left">
                            <router-link class="text__is-tertiary page-content-info__back p-rel pd-l3"
                                         :to="{name: 'Home'}">
                                Retour à la carte du jour
                            </router-link>
                        </div>
                    </div>
                    <div class="level">
                        <h1 class="is-size-3 text__ft-2 text__is-secondary">Mes dernières commandes</h1>
                    </div>
                    <div v-if="errors && errors.length" class="level">
                        <div class="level-item has-text-centered">
                            <ul>
                                <li class="title p-rel text__is-secondary text__ft-2 is-size-2-desktop is-capitalized"
                                    v-for="error in errors">
                                    🤯 {{error.message}} 💩
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="level mg-t1 pd-t2 log">
                        <p>
                            {{ responses }}
                        </p>
                    </div>
                    <div v-if="orders.length > 0" class="level pd-t2 pd-b2">
                        <p>Commandes en cours :</p>
                    </div>
                    <div v-else class="columns">
                        <div class="column pd0">
                            <div class="level pd-t2 pd-b3">
                                <p>Vous n'avez aucune commande en cours 🤷‍♂️</p>
                            </div>
                            <div class="level">
                                <router-link class="button mg-r2 button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-primary"
                                             :to="{name: 'Home'}">
                                    Commander
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div v-if="order.status == 1" v-for="order in orders" class="columns orders orders__in-progress pd-b2">
                        <div class="column pd0">
                            <div class="level pd-t1 pd-r1 pd-l1 bold">
                                <div class="level-left">
                                    <p class="text__is-secondary">Commande effectuée le {{ order.createdAt.split('T')[0] }} à {{ order.createdAt.split('T')[1].split('.')[0] }}</p>
                                </div>
                            </div>
                            <div class="level pd-r1 pd-b1 pd-l1 ">
                                <div class="level-left">
                                    <p class="text__is-secondary">Livraison prévue pour {{ order.time }}</p>
                                </div>
                                <div class="level-right">
                                    <p class="text__is-secondary is-size-6 bold">Total: {{ order.price.toFixed(2) }}€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'

	export default {
		name: "Orders",
		data() {
			return {
				errors: [],
				responses: [],
                orders: []
			}
		},
        computed: {
	        ...mapGetters([
		        'user'
	        ]),
        },
		methods: {
			...mapActions([
				'userConnectedAction'
			]),
			logout() {
				this.$http.post(`${process.env.URL_DEV}user/logout`, {
					sessionData: undefined
				})
					.then(response => {
						this.errors = []
						this.responses = response.data.message
						if (response.data.logout == true) {
							let user = {
								connected: false,
								token: '',
							}
							this.userConnectedAction(user)
							this.$router.push({name: 'Home'})
						}
					})
					.catch((error) => {
						this.errors = []
						this.errors.push(error)
						console.log(error)
					})
			},
			getOrders() {
				this.$http.post(`${process.env.URL_DEV}user/orders`, {
					id: this.user.token
                })
					.then(response => {
						this.errors = []
						this.orders = response.data
					})
					.catch((error) => {
						this.errors = []
						this.errors.push(error)
						console.log(error)
					})
			},
			checkConnected() {
				if (this.user.connected) {
					this.$router.push({name: 'Orders'})
				} else {
					this.$router.push({name: 'SignIn'})
				}
			}
		},
		mounted() {
			this.checkConnected()
            this.getOrders()
		}
	}
</script>