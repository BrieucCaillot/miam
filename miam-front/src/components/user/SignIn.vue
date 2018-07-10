<template>
    <div id="signin">
        <section class="page-content-info">
            <div class="columns full-h">
                <div class="column page-content-info__left pd0 p-rel">
                    <div class="page-content-info__left__img"></div>
                </div>
                <div class="column page-content-info__right is-6-desktop is-12-tablet">
                    <div class="level">
                        <div class="level-left"></div>
                        <div class="level-right">
                            <div class="level-item">
                                <p>Vous n'êtes pas encore inscrit ?</p>
                            </div>
                            <div class="level-item">
                                <router-link
                                        class="button button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-primary"
                                        :to="{name : 'SignUp'}">
                                    Créer un compte
                                </router-link>
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
                        <h1 class="is-size-3 text__ft-2 text__is-secondary">Content de vous revoir !</h1>
                    </div>
                    <div class="level pd-t2">
                        <p>Accédez à un univers de bonnes choses.</p>
                    </div>
                    <div v-if="errors && errors.length" class="level pd-t2">
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
                    <form v-on:submit.prevent="sendForm">
                        <div class="level pd-t2">
                            <div class="field full-w">
                                <div class="control">
                                    <input class="input" type="email" name="email" v-model="email" placeholder="Email">
                                </div>
                            </div>
                        </div>
                        <div class="level pd-t2">
                            <div class="field full-w">
                                <div class="control">
                                    <input class="input" type="password" name="password" v-model="password"
                                           placeholder="Mot de passe">
                                </div>
                            </div>
                        </div>
                        <div class="level pd-t2">
                            <button class="button button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-secondary"
                                    type="submit">
                                Se connecter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

	import {mapGetters, mapActions} from 'vuex'
	import Mixins from '@/mixins/mixins'

	export default {
		mixins: [Mixins],
		name: "Connect",
		data() {
			return {
				email: '',
				password: '',
				connected: '',
				errors: [],
				responses: []
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
			sendForm() {
				this.$http.post(`${process.env.URL_DEV}user/signin`, {
					email: this.email,
					password: this.password,
				})
					.then((response) => {
							this.errors = []
							if (response.data.connected === true) {
								let user = {
									connected: true,
									token: response.data.token
								}
								this.userConnectedAction(user)
								this.$router.push({name: 'Home'})
							} else {
								this.responses = response.data.message
								if (this.responses.length > 0) {
									let substring = 'Bravo';
									if (response.data.message.includes(substring)) {
										document.querySelector('.log').classList.add('log__success');
										document.querySelector('.log').classList.remove('log__error');
									} else {
										document.querySelector('.log').classList.add('log__error');
										document.querySelector('.log').classList.remove('log__success');
									}
								}
							}
						}
					)
					.catch((error) => {
						this.errors = []
						this.errors.push(error)
						console.log(error)
					})
			},
			checkConnected() {
				// @TODO NOT WORKING
				// if (this.$store.getters.user.connected) {
                console.log(this.user.connected)
                console.log(this.$store.getters.user.connected)
				if (this.user.connected) {
					this.$router.push({name: 'Modify'})
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