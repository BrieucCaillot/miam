<template>
    <div>
        <Header/>
        <main class="mg-t7">
            <div class="section">
                <div class="container">
                    <div class="columns pd-b2">
                        <div class="column">
                            <div class="level">
                                <div class="level-left">
                                    <router-link class="text__is-tertiary page-content-info__back p-rel pd-l3"
                                                 :to="{name: 'Home'}">
                                        Retour à la carte du jour
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <notifications group="checkout" position="top center" classes="vue-notification"/>
                    <div v-if="confirmed == false">
                        <div class="columns">
                            <div class="column">
                                <div class="level">
                                    <div class="level-item">
                                        <h1 class="is-size-3 text__ft-2 text__is-secondary">
                                            Confirmer le paiement
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="confirm-left">
                                    <div class="level pd-t1">
                                        <h2 class="is-size-4 text__ft-2 text__is-secondary">Récapitulatif :</h2>
                                    </div>
                                    <div class="level pd-t1">
                                        <h2 class="text__is-secondary bold">Total :</h2>
                                    </div>
                                    <div class="level pd-t2">
                                        <h3 class="is-capitalized">{{ totalPrice }}€</h3>
                                    </div>
                                    <div class="level pd-t2">
                                        <h3 class="text__is-secondary bold">Adresse :</h3>
                                    </div>
                                    <div class="level pd-t2">
                                        <p class="is-capitalized">{{ delivery.address }}</p>
                                    </div>
                                    <div class="level pd-t2">
                                        <h3 class="text__is-secondary bold">Horaire de livraison</h3>
                                    </div>
                                    <div class="level pd-t2">
                                        <p class="is-capitalized">{{ delivery.time }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="confirm-right">
                                    <div class="level pd-t2">
                                        <h2 class="is-size-4 text__ft-2 text__is-secondary">Carte bancaire :</h2>
                                    </div>
                                    <div class="level pd-t2">
                                        <h3 class="text__is-secondary bold">Numéro de carte :</h3>
                                    </div>
                                    <div class="level pd-t2">
                                        <p class="is-capitalized">**** **** **** {{ stripeToken.card.last4 }}</p>
                                    </div>
                                    <div class="level pd-t2">
                                        <h3 class="text__is-secondary bold">Date d'expiration :</h3>
                                    </div>
                                    <div class="level pd-t2">
                                        <p class="is-capitalized">{{ stripeToken.card.exp_month }}/{{
                                            stripeToken.card.exp_year }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form v-on:submit.prevent="sendToken" class="columns pd-t3">
                            <div class="column">
                                <div class="level">
                                    <div v-if="confirmed == false" class="level-item">
                                        <router-link
                                                class="button button__bdr-none pd-l3 pd-r3 mg-r3 text__is-white text__ft-2 background__is-secondary"
                                                :to="{name: 'Home'}">
                                            Annuler
                                        </router-link>
                                        <button type="submit"
                                                class="button cpointer button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-secondary">
                                            Confirmer le paiement
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div v-else>
                        <div class="columns">
                            <div class="column">
                                <div class="level">
                                    <div class="level-item">
                                        <h1 class="is-size-3 text__ft-2 text__is-secondary">
                                            Bravo et merci de votre confiance !
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="confirm-left">
                                    <div class="level pd-t1">
                                        <h2 class="is-size-4 text__ft-2 text__is-secondary mauto">Votre commande est en chemin</h2>
                                    </div>
                                    <div class="level pd-t1">
                                        <h2 class="text__is-secondary bold mauto">No stress, on s'occupe de tout !</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns pd-t3">
                            <div class="column">
                                <div class="level">
                                    <div class="level-item">
                                        <button type="button" @click.stop="resetDelivery"
                                                class="button cpointer button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-primary">
                                            Voir ma commande
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

	import {mapGetters, mapActions} from 'vuex'
	import Header from '@/components/global/Header'

	export default {
		name: "BuyStep2",
		components: {
			Header
		},
		computed: {
			...mapGetters([
				'delivery',
				'totalPrice',
				'stripeToken',
				'productCard',
				'user',
				'validate',
				'confirmed'
			])
		},

		methods: {
			...mapActions([
				'showCardAction',
				'deliveryInformationsAction',
				'resetCardAction',
				'sendTokenAction',
				'checkoutValidateAction',
				'checkoutConfirmedAction'
			]),
			resetDelivery() {
				this.showCardAction(false)
				this.checkoutValidateAction(false)
				this.checkoutConfirmedAction(false)
					.then(() => {
						this.$router.push({name: 'Orders'})
					})
			},
			sendToken() {
				this.$http.post(`${process.env.URL_DEV}checkout`, {
					token: this.user.token,
					totalPrice: this.totalPrice,
					stripeToken: this.stripeToken.id,
					time: this.delivery.time,
					address: this.delivery.address
				})
					.then((response) => {
						this.$notify({
							group: 'checkout',
							title: response.data.title,
							type: response.data.type,
							text: response.data.message
						});
						if (response.data.type == 'success') {
							this.deliveryInformationsAction("")
							this.resetCardAction([])
							this.sendTokenAction("")
                            this.checkoutValidateAction(true)
							this.checkoutConfirmedAction(true)
						}
					})
					.catch((error) => {
						console.log(error)
					})
			},
			checkValidate() {
				if (this.validate) {
					this.$router.push({name: 'BuyStep2'})
				} else {
					this.$router.push({name: 'BuyStep1'})
				}
			}
		},
		mounted() {
			this.checkValidate()
		}
	}
</script>