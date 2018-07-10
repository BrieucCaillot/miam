<template>
    <div>
        <Header/>
        <main id="validate" class="mg-t7">
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
                    <div class="columns">
                        <div class="column">
                            <div class="level">
                                <Card/>
                            </div>
                        </div>
                        <div class="column">
                            <div class="level">
                                <h1 class="is-size-3 text__ft-2 text__is-secondary">
                                    Régler ma commande
                                </h1>
                            </div>
                            <div class="level">
                                <p class="pd-t2">Total: {{ totalPrice }}€</p>
                            </div>
                            <div class="level pd-t2">
                                <h3 class="text__is-secondary bold">Adresse</h3>
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
                            <div class="level pd-t4">
                                <h2 class="is-size-4 text__ft-2 text__is-secondary">Moyen de paiement :</h2>
                            </div>
                            <Payment/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Header from '@/components/global/Header'
	import Payment from '@/components/buy/Payment'
	import Card from '@/components/global/Card'

	export default {
		name: "BuyStep1",
		components: {
			Header,
			Payment,
			Card
		},
		computed: {
			...mapGetters([
				'delivery',
                'productCard',
                'totalPrice',
                'user'
			])
		},
		methods: {
			checkConnected() {
				// @TODO NOT WORKING
				// if (this.$store.getters.user.connected) {
				console.log(this.user.connected)
				console.log(this.$store.getters.user.connected)
				if (this.delivery.modified && this.productCard.length > 0 && this.user.connected) {
					this.$router.push({name: 'BuyStep1'})
                } else {
					this.$router.push({name: 'SignIn'})
                }
			}
		},
		mounted() {
			this.checkConnected()
		}
	}
</script>