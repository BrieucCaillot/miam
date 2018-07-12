<template>
    <header class="columns header full-w background__is-primary">
        <div class="column">
            <div class="level is-mobile">
                <div class="level-left">
                    <router-link class="header__logo dblock" :to="{name: 'Home'}">
                        <img @click="scrollTop" src="../../assets/img/logo-white.svg" alt="logo">
                    </router-link>
                </div>
                <div class="level-right">
                    <router-link v-if='user.connected && !this.user.token == ""'
                                 class="header__connect level-item text__is-white p-rel text__ft-1"
                                 :to="{name: 'Modify'}">
                        Mon profil
                    </router-link>
                    <router-link v-else class="header__connect level-item text__is-white p-rel text__ft-1"
                                 :to="{name: 'SignIn'}">
                        Se connecter
                    </router-link>
                    <div @click="toggleModal"
                         class="header__cart level-item text__is-white cpointer p-rel text__ft-1 mg-l4">
                        Panier
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

	import Mixins from '@/mixins/mixins'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		mixins: [Mixins],
		name: "Header",
		data() {
			return {
				errors: []
			}
		},
		computed: {
			...mapGetters([
				'user'
			])
		},
		methods: {
			...mapActions([
				'userConnectedAction'
			]),
		},
	}
</script>