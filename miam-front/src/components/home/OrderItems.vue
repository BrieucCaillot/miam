<template>
    <div>
        <section id="order-theme-section" class="section">
            <div class="container">
                <div class="columns is-multiline is-mobile over-hide order-theme expanded pd-b3">
                    <div v-for="foodCategory in productCategories"
                         class="column p-rel order-theme__item full-h mg-b2 is-2-desktop is-3-tablet">
                        <div @click="foodSelected(foodCategory.id, foodCategory.name); isActive = foodCategory.id;"
                             :style="getUrlImage(foodCategory.image)" :class="{active:isActive == foodCategory.id}"
                             class="level is-mobile order-theme__item__content mauto-w bbox order-theme__item__content__starter cpointer p-rel">
                            <div class="level-item background__is-secondary">
                                <span class="text__is-white is-size-4 is-size-5-mobile text__ft-1 is-capitalized">{{ foodCategory.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="productCategories.length > 6" class="columns">
                    <div class="column">
                        <div class="level">
                            <div class="level-item">
                                <button class="button button__bdr-none pd-l3 pd-r3 text__is-white text__ft-2 is-hidden-mobile background__is-secondary">
                                    Voir plus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <notifications group="product" position="top center" classes="vue-notification"/>
                <div v-if="errors && errors.length" class="columns pd-b3">
                    <div class="column">
                        <div class="level">
                            <div class="level-item has-text-centered">
                                <ul>
                                    <li class="title p-rel text__is-secondary text__ft-2 is-size-2-desktop is-capitalized"
                                        v-for="error in errors">
                                        🤯 {{error.message}} 💩
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section v-if="foods && foods.length" id="order-item-section" class="section">
            <div class="container">
                <div class="columns pd-b3">
                    <div class="column">
                        <div class="level">
                            <div class="level-item has-text-centered">
                                <h2 class="title p-rel is-size-3 text__ft-2 text__is-secondary is-capitalized">
                                    {{ foodName }}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns is-multiline dragArea">
                    <draggable v-model="foods"
                               :options="{handle:'.order-item__drag',group:{name:'product', pull: 'clone', put: false }}"
                               @start="onStart" @end="onEnd"
                               @remove="addProduct(food.id, food.image, food.name, food.price)" v-for="food in foods"
                               :data="food"
                               :key="food.id"
                               class="column order-item is-3-desktop is-4-tablet is-12-mobile pd-b3 p-rel">
                        <div class="columns order-item__container">
                            <div class="order-item__container__content full-w">
                                <div :style="getUrlImage(food.image)"
                                     class="level order-item__container__content__img dblock p-rel">
                                    <div class="line-animation"></div>
                                    <div class="line-animation-filled"></div>
                                    <div class="order-item__drag button__big background__is-primary cpointer">
                                        <span class="icon__drag dblock p-center"></span>
                                    </div>
                                </div>
                                <div class="order-item__container__content__desc background__is-white p-rel">
                                    <div class="level pd-b1 is-size-5 text__is-secondary text__ft-2 p-rel">
                                        <h3>{{ food.name }}</h3>
                                    </div>
                                    <div class="level order-item__container__content__desc__top pd-b4 text__ft-1">
                                        <p>{{ food.description }}</p>
                                    </div>
                                    <div class="level is-mobile order-item__container__content__desc__bottom">
                                        <div class="order-item__container__content__desc__bottom__detail text__ft-1 is-size-7">
                                            <span class="dblock is-uppercase">{{ food.subdescription }}</span>
                                            <span class="is-size-6 bold">{{ food.price.toFixed(2) }} €</span>
                                        </div>
                                        <div slot="footer"
                                             @click="addProduct(food.id, food.image, food.name, food.price)"
                                             class="order-item__add button__big background__is-primary cpointer">
                                            <span class="icon__add dblock p-center"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

	import Mixins from '@/mixins/mixins'
	import {mapGetters, mapActions} from 'vuex'
	import draggable from 'vuedraggable'

	export default {
		mixins: [Mixins],
		name: "OrderItems",
		components: {
			draggable
		},
		data() {
			return {
				foods: "",
				foodName: "",
				isActive: '',
				errors: []
			}
		},
		computed: {
			...mapGetters([
				'productCategories',
				'products'
			])
		},
		methods: {
			...mapActions([
				'showCardAction',
				'fetchProductCategoriesAction',
				'fetchProductsAction'
			]),
			onStart() {
				this.showCardAction(true)
			},
			onEnd() {
				this.showCardAction(false)
			},
			foodSelected(catId, catName) {
				this.foodName = catName
				this.foods = this.products[catId - 1];
				setTimeout(() => {
					document.querySelector('#order-item-section').scrollIntoView({
						behavior: "smooth",
						block: "start"
					});
				}, 200)
			},
			fetchDataFoodCategories() {
				if (this.productCategories.length <= 0) {
					this.$http.get(`${process.env.URL_DEV}foodCategories/all`)
						.then((response) => {
							this.errors = []
							response.data.forEach((elem) => {
								this.fetchProductCategoriesAction(elem)
							})
							if (this.products.length <= 0) {
								this.fetchDataFood()
							}
						})
						.catch((error) => {
							this.errors = []
							this.errors.push(error)
							console.log(error)
						})
				}
			},
			fetchDataFood() {
				this.productCategories.forEach((elem) => {
					this.$http.get(`${process.env.URL_DEV}foods/${elem.id}`)
						.then((response) => {
							this.errors = []
							this.fetchProductsAction(response.data)
						})
						.catch((error) => {
							this.errors = []
							this.errors.push(error)
							console.log(error)
						})
				})
			},
		},

		mounted() {
			this.fetchDataFoodCategories()
		},

	}
</script>