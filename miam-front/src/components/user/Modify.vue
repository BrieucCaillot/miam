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
                            <div class="level-item page-content-info__right__buttons">
                                    <router-link class="button page-content-info__right__buttons__left mg-r2 button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-primary"
                                        :to="{name: 'Orders'}" tag="button">
                                    Mes commandes
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
                        <h1 class="is-size-3 text__ft-2 text__is-secondary">Bienvenue chez vous</h1>
                    </div>
                    <div class="level pd-t2">
                        <p>Sinon vous ça va ?</p>
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
                    <form v-on:submit.prevent="modifyUser">
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
                                    <input class="input" type="email" name="email" placeholder="Email" v-model="email">
                                </div>
                            </div>
                        </div>
                        <div class="level pd-t2">
                            <div class="field full-w">
                                <div class="control">
                                    <input class="input" type="password" name="oldpassword"
                                           placeholder="Ancien mot de passe" v-model="oldpassword">
                                </div>
                            </div>
                        </div>
                        <div class="level pd-t2">
                            <div class="field full-w">
                                <div class="control">
                                    <input class="input" type="password" name="newpassword" placeholder="Mot de passe"
                                           v-model="newpassword">
                                </div>
                            </div>
                        </div>
                        <div class="level pd-t2">
                            <div class="field full-w">
                                <div class="control">
                                    <input class="input" type="password" name="renewpassword"
                                           placeholder="Confirmer mot de passe" v-model="renewpassword">
                                </div>
                            </div>
                        </div>
                        <div class="level pd-t2">
                            <button class="button button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-secondary"
                                    type="submit">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

	import Mixins from '@/mixins/mixins'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		mixins: [Mixins],
		name: "Modify",
		data() {
			return {
				firstname: '',
				lastname: '',
				email: '',
				oldpassword: '',
				newpassword: '',
				renewpassword: '',
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
				'userConnectedAction',
			]),
			modifyUser() {
				this.$http.post(`${process.env.URL_DEV}user/modify`, {
					id: this.user.token,
					firstname: this.firstname,
					lastname: this.lastname,
					email: this.email,
					oldpassword: this.oldpassword,
					newpassword: this.newpassword,
					renewpassword: this.renewpassword,
				})
					.then((response) => {
						this.responses = response.data.message
						if (response.data.type == 'success') {
							document.querySelector('.log').classList.add('log__success');
							document.querySelector('.log').classList.remove('log__error');
						} else {
							document.querySelector('.log').classList.add('log__error');
							document.querySelector('.log').classList.remove('log__success');
						}
					})
					.catch((error) => {
						this.errors.push(error)
						console.log(error)
					})
			},
			getUserInfos() {
				this.firstname = this.user.firstname
				this.lastname = this.user.lastname
				this.email = this.user.email
			},
			checkConnected() {
				if (this.user.connected && !this.user.token == "") {
					this.$router.push({name: 'Modify'})
					this.getUserInfos()
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