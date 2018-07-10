<template>
    <div v-if="showCard" class="modal modal__card is-active">
        <div @click="toggleModal" class="modal-background"></div>
        <div class="modal-content background__is-white">
            <div class="columns">
                <div class="column">
                    <div class="level">
                        <div class="level-item">
                            <span>Mon panier</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box">
                <draggable :options="{group:{name:'product'}}" class="modal__card__container">
                    <div v-for="product in productCard" class="modal__card__products">
                        <div class="columns is-vcentered modal__card__product">
                            <div class="modal__card__product__img" :style="getUrlImage(product.image)"></div>
                            <div class="modal__card__product__details column pd0">
                                <div class="level is-mobile modal__card__product__details__desc pd-b1">
                                    <span class="modal__card__product__details__desc__name">{{ product.name }}</span>
                                    <span class="modal__card__product__details__desc__price is-size-6">{{ product.price.toFixed(2) }}€</span>
                                </div>
                                <div class="level is-mobile">
                                    <div class="level-left">
                                        <div @click="removeQuantity(product.id, product.name)"
                                             class="button__small background__is-primary p-rel cpointer">
                                            <span class="icon__remove dblock p-center"></span>
                                        </div>
                                        <div @click="addQuantity(product.id, product.name)"
                                             class="button__small background__is-primary mg-l1 p-rel cpointer">
                                            <span class="icon__add dblock p-center"></span>
                                        </div>
                                    </div>
                                    <div class="level-right pd-t2">
                                        <span v-if="product.quantity > 1"
                                              class="modal__card__product__details__desc__price is-size-6 bold pd-r2">x{{ product.quantity }}</span>
                                        <span class="modal__card__product__details__desc__price is-size-6 bold">{{ (product.price * product.quantity).toFixed(2) }}€</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </draggable>
                <div class="modal__card__informations pd-t2">
                    <div class="columns is-vcentered modal__card__informations__delivery">
                        <div class="column pd0">
                            <label for="search-location-input" @click="toggleModal" class="level is-mobile">
                                <div class="button__big background__is-primary cpointer cprel">
                                    <span class="icon__location dblock p-center"></span>
                                </div>
                                <p class=" full-w has-text-left pd-l1 cpointer">
                                    {{ delivery.address }}
                                </p>
                            </label>
                            <label for="search-time-input" @click="toggleModal" class="level is-mobile pd-t1">
                                <div class="button__big background__is-primary cpointer p-rel">
                                    <span class="icon__time dblock p-center"></span>
                                </div>
                                <p class=" full-w has-text-left pd-l1 cpointer">
                                    {{ delivery.time }}
                                </p>
                            </label>
                        </div>
                    </div>
                    <div class="columns pd-t2 pd-b1">
                        <div class="column pd0">
                            <div class="level is-mobile">
                                <div class="level-left">
                                    <span class="is-capitalized">Total</span>
                                </div>
                                <div v-if="totalPrice" class="level-right">
                                    <span class="modal__card__product__details__desc__price is-size-6 bold">{{ totalPrice }}€</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="delivery.modified && productCard.length > 0" id="card-validate" class="columns">
                        <div class="column">
                            <div class="level">
                                <div class="level-item">
                                    <router-link
                                            class="button button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 background__is-secondary"
                                            :to="{name: 'BuyStep1'}">
                                        Valider la commande
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="toggleModal" class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>

	import Mixins from '@/mixins/mixins'
	import {mapGetters} from 'vuex'
	import draggable from 'vuedraggable'

	export default {
		mixins: [Mixins],
		name: 'Card',
        data() {
			return {
		        card: ''
            }
        },
		components: {
			draggable
		},
		computed: {
			...mapGetters([
				'showCard',
				'delivery',
                'productCard',
                'totalPrice'
			]),
		},
	};
</script>