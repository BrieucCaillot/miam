<template>
    <div id="about">
        <Header/>
        <div class="container">
            <div class="columns pd-t5">
                <div class="column">
                    <div class="level pd-t5 pd-b2">
                        <div class="level-left">
                            <router-link class="text__is-tertiary page-content-info__back p-rel pd-l3"
                                         :to="{name: 'Home'}">
                                Retour à la carte du jour
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns pd-t2">
                <div class="column">
                    <div class="level">
                        <div class="level-item">
                            <h1 class="is-size-3 text__ft-2 text__is-secondary">{{ title }}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns is-vcentered pd-t3">
                <div class="column">
                    <div class="about-content__img about-content__img__first"></div>
                </div>
                <div class="column">
                    <div class="level">
                        <h2 class="is-size-4 text__ft-2 full-w text__is-secondary">
                            Des produits frais
                        </h2>
                    </div>
                    <div class="level pd-t3">
                        <p class="has-text-justified">
                            Les produits que nous proposons à la carte sont faits avec des prdouits frais et de qualité.
                            Nous nous fournissons au près d’agriculteurs et d’êleveurs français 🇫🇷.
                        </p>
                    </div>
                </div>
            </div>
            <div class="columns is-vcentered about-content__right pd-t3">
                <div class="column">
                    <div class="level has-text-right has-text-left-mobile">
                        <h2 class="is-size-4 text__ft-2 full-w text__is-secondary has-text-right-desktop has-text-left-mobile">
                            Au gré des saisonss
                        </h2>
                    </div>
                    <div class="level pd-t3">
                        <p class="has-text-right-tablet has-text-left-mobile">
                            Chaque jour, notre brigade prépare et cuisine avec amour votre déjeuner. Miam invente le
                            premier plateau-repas livré chaud, comme une tarte qui sort du four.
                            Nous vous faisons la promesse de vous livrer un plat sain, frais et de saison.
                        </p>
                    </div>
                </div>
                <div class="column">
                    <div class="about-content__img about-content__img__second"></div>
                </div>
            </div>
        </div>
        <Footer class="mg-t10"/>
    </div>
</template>

<script>

	import Header from '@/components/global/Header'
	import Footer from '@/components/global/Footer'
	import Mixins from '@/mixins/mixins'

	export default {
		mixins: [Mixins],
		name: "About",
		components: {
			Header,
			Footer
		},
		data() {
			return {
				title: 'À propos'
			}
		},
	}
</script>