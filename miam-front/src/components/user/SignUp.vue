<template>
    <div id="signup">
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
                                <p>Vous avez déja un compte ?</p>
                            </div>
                            <div class="level-item">
                                <router-link
                                        class="button button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-primary"
                                        :to="{name : 'SignIn'}">
                                    Se connecter
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
                        <h1 class="is-size-3 text__ft-2 text__is-secondary">Allez viens, on est bien ici</h1>
                    </div>
                    <div class="level pd-t2">
                        <p>Racontes-nous superficiellement t'a vie ci-dessous.</p>
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
                    <form v-on:submit.prevent="sendForm">
                        <div class="columns pd-t2">
                            <div class="column pd0">
                                <div class="level input-splitted">
                                    <div class="level-left">
                                        <div class="level-item full-w">
                                            <div class="control full-w">
                                                <input class="input" type="text" name="firstname" v-model="firstname"
                                                       required
                                                       placeholder="Prénom">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="level-right">
                                        <div class="level-item full-w">
                                            <div class="control full-w">
                                                <input class="input" type="text" name="lastname" v-model="lastname"
                                                       required
                                                       placeholder="Nom">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="level pd-t2">
                            <div class="field full-w">
                                <div class="control">
                                    <input class="input" type="email" name="email" v-model="email" required
                                           placeholder="Email">
                                </div>
                            </div>
                        </div>
                        <div class="level pd-t2">
                            <div class="field full-w">
                                <div class="control">
                                    <input class="input" type="password" name="password" v-model="password" required
                                           placeholder="Mot de passe">
                                </div>
                            </div>
                        </div>
                        <div class="level pd-t2 pd-b3">
                            <div class="field full-w">
                                <div class="control">
                                    <input class="input" type="password" name="repassword" v-model="repassword" required
                                           placeholder="Confirmer mot de passe">
                                </div>
                            </div>
                        </div>
                        <div class="level">
                            <button class="button button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-secondary"
                                    type="submit">
                                S'inscrire
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
		name: "SignUp",
		data() {
			return {
				firstname: '',
				lastname: '',
				email: '',
				password: '',
				repassword: '',
				errors: [],
				responses: [],
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
				this.$http.post(`${process.env.URL_DEV}user/signup`, {
					id: this.user.token,
					firstname: this.firstname,
					lastname: this.lastname,
					email: this.email,
					password: this.password,
					repassword: this.repassword,
				})
					.then((response) => {
						this.errors = []
						this.responses = response.data.message
						if (this.responses.length > 0) {
							if (response.data.connected) {
								let user = {
									connected: true,
									token: response.data.token
								}
								this.userConnectedAction(user)
								setTimeout(() => {
									this.$router.push({name: 'Home'})
								}, 3000)
							}
							let substring = 'Bravo';
							if (response.data.message.includes(substring)) {
								document.querySelector('.log').classList.add('log__success');
								document.querySelector('.log').classList.remove('log__error');
							} else {
								document.querySelector('.log').classList.add('log__error');
								document.querySelector('.log').classList.remove('log__success');
							}
						}
					})
					.catch((error) => {
						this.errors = []
						this.errors.push(error)
						console.log(error)
					})
			},
			checkConnected() {
				if (this.user.connected && !this.user.token == "") {
                    this.$router.push({name: 'Modify'})
                } else {
					this.$router.push({name: 'SignUp'})
                }
			},
		},
		mounted() {
            this.checkConnected()
		}
	}
</script>