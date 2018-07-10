<template>
    <div>
        <Card class="stripe-card pd-t2 pd-b2"
              :class='{ complete }'
              stripe='pk_test_Rv0aVYzX1oiztOM9PUJQJmnz'
              :options='stripeOptions'
              @change='complete = $event.complete'
              ref="cardInfo"
        />
        <div class="level pd-t1">
            <div class="level">
                <button id="payment-form" @click="sendToken" :disabled="!complete" type="submit"
                        class="pay-with-stripe button button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-secondary">
                    Valider ma commande
                </button>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	import {Card, createToken} from 'vue-stripe-elements-plus'

	export default {
		name: "card",
		components: {Card},
		data() {
			return {
				cardInfo: '',
				complete: false,
				stripeOptions: {},
			}
		},
		computed: {
			...mapGetters([
				'totalPrice',
				'stripeToken'
			])
		},
		methods: {
			...mapActions([
				'sendTokenAction',
				'checkoutValidateAction'
			]),
			sendToken() {
				// createToken returns a Promise which resolves in a result object with
				// either a token or an error key.
				// See https://stripe.com/docs/api#tokens for the token object.
				// See https://stripe.com/docs/api#errors for the error object.
				// More general https://stripe.com/docs/stripe.js#stripe-create-token.
				createToken().then(data => {
					this.sendTokenAction(data.token)
					this.checkoutValidateAction(true)
						.then(() => {
							this.$router.push({name: 'BuyStep2'})
						})
				})
			}
		},
	}
</script>