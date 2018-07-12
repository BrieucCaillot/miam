<template>
    <footer class="pd-t2 pd-b3">
        <div class="container">
            <div class="footer-top columns pd-b6">
                <div class="column">
                    <div class="level">
                        <div class="level-item">
                            <router-link class="footer-top__logo dblock" :to="{name: 'Home'}">
                                <img src="../../assets/img/logo-white.svg" alt="logo">
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="level pd-b2">
                        <div class="level-left">
                            <div class="level-item text__ft-1">
                                <h4 class="text__is-white bold is-size-5">Nous contacter</h4>
                            </div>
                        </div>
                    </div>
                    <div class="level pd-b1">
                        <div class="level-left">
                            <div class="level-item text__ft-1">
                                <a href="mailto:hellomiamfood@gmail.com"
                                   class="text__is-white">hellomiamfood@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div class="level pd-b1">
                        <div class="level-left">
                            <div class="level-item text__ft-1">
                                <p class="text__is-white">Réseaux sociaux :</p>
                            </div>
                        </div>
                    </div>
                    <div class="level is-mobile">
                        <div class="level-left centered-tablet">
                            <div class="level-item">
                                <a class="icon__facebook" href="https://www.facebook.com/"></a>
                            </div>
                            <div class="level-item">
                                <a class="icon__instagram" href="https://www.instagram.com/"></a>
                            </div>
                            <div class="level-item">
                                <a class="icon__twitter" href="https://www.twitter.com/"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="level pd-b2">
                        <div class="level-left">
                            <div class="level-item text__ft-1">
                                <h4 class="text__is-white bold is-size-5">Informations</h4>
                            </div>
                        </div>
                    </div>
                    <div class="level pd-b1">
                        <div class="level-left">
                            <div class="level-item text__ft-1">
                                <router-link class="text__is-white" :to="{name :'About' }">À propos</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="level pd-b1">
                        <div class="level-left">
                            <div class="level-item text__ft-1">
                                <router-link class="text__is-white" :to="{name :'Legals' }">Mentions légales
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="level pd-b1">
                        <div class="level-left">
                            <div class="level-item text__ft-1">
                                <router-link class="text__is-white" :to="{name :'CGV' }">Conditions générales de vente
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <notifications group="newsletter" position="top center" classes="vue-notification"/>
                <div class="column">
                    <div class="level pd-b2">
                        <div class="level-left">
                            <div class="level-item text__ft-1">
                                <h4 class="text__is-white bold is-size-5">S'inscrire à la newsletter</h4>
                            </div>
                        </div>
                    </div>
                    <div class="level pd-b1">
                        <div class="level-left">
                            <div class="level-item text__ft-1">
                                <p class="text__is-white">Recevez par mail nos offres spéciales</p>
                            </div>
                        </div>
                    </div>
                    <form v-on:submit.prevent="sendMail" class="level pd-b1 newsletter">
                        <div class="newsletter__input level-item text__ft-1">
                            <input v-model="email" class="input centered-tablet" required type="text" name="email"
                                   placeholder="Entrez votre addresse email">
                        </div>
                        <div class="newsletter__button level-item text__ft-1">
                            <button class="button centered-tablet button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-primary"
                                    type="submit">
                                Recevoir
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="level">
                        <div class="level-left"></div>
                        <div class="level-right">
                            <p class="text__is-white has-text-centered-mobile text__ft-1">{{ msg }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>

	import {mapGetters} from 'vuex'

	export default {
		name: 'Footer',
		data() {
			return {
				msg: '2018 miam - Tous droits réservés',
				email: ''
			}
		},
        computed: {
            ...mapGetters([
            	'user'
            ])
        },
		methods: {
			sendMail() {
				let regExpEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
				if (this.email.match(regExpEmail)) {
					this.$http.post(`${process.env.URL_DEV}newsletter`, {
						username: this.user.firstname,
						email: this.email,
					})
						.then((response) => {
							this.errors = []
							this.$notify({
								group: 'newsletter',
								title: response.data.title,
								type: response.data.type,
								text: response.data.message
							});
						})
						.catch((error) => {
							this.errors = []
							this.errors.push(error)
							console.log(error)
						})
				} else {
					this.$notify({
						group: 'newsletter',
						title: 'Erreur 🙁',
						type: 'warn',
						text: 'L\'email rentré n\'est pas valide'
					});
				}
			},
		}
	}
</script>