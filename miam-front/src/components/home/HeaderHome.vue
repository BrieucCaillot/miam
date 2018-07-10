<template>
    <div id="header-home">
        <div class="container full-h text__is-white">
            <div class="header-home__title columns is-size-1 is-size-3-mobile has-text-centered">
                <div class="column">
                    <div class="level">
                        <h1 class="text__ft-1__title text__is-white mauto">{{ title }}</h1>
                    </div>
                </div>
            </div>
            <form action="/" id="search-section" class="columns p-center full-w">
                <div class="column">
                    <div id="search-location" class="level is-mobile">
                        <label for="search-location-input" class="input__form__icon-before__container p-rel cpointer">
                            <span class="input__form__icon-before__container__icon-localisation dblock p-center"></span>
                        </label>
                        <input ref="autocomplete" id="search-location-input" @input="addDeliveryInformations"
                               name="location" class="input input__header-top text__ft-1"
                               type="text"
                               placeholder="Où souhaitez-vous vous faire livrer ?">
                    </div>
                </div>
                <div class="column">
                    <div id="search-time" class="level is-mobile">
                        <label for="search-time-input" class="input__form__icon-before__container p-rel cpointer">
                            <span class="input__form__icon-before__container__icon-time dblock p-center"></span>
                        </label>
                        <input id="search-time-input" v-model="time" @focus="showHours = !showHours"
                               @click="addDeliveryInformations;" name="time"
                               class="input input__header-top text__ft-1" type="text"
                               placeholder="On vous livre quand ?" readonly>
                        <div v-if="showHours" class="showHours">
                            <ul>
                                <li class="pd1 cpointer" @click="addDate($event); addDeliveryInformations()"
                                    v-for="time in hoursList">
                                    {{ time }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

	import {mapActions} from 'vuex'

	export default {
		name: 'HeaderHome',
		data() {
			return {
				title: 'Bien manger, pour de bon !',
				autocomplete: '',
				address: '',
				time: [],
				showHours: false,
				hoursList: ['12h', '12h30', '13h', '13h30', '14h', '14h30', '15h', '15h30', '16h', '16h30', '17h', '17h30', '18h', '18h30', '19h', '19h30', '20h', '20h30', '21h', '21h30', '22h', '22h30', '23h', '23h30'],
			}
		},
		methods: {
            ...mapActions([
            	'deliveryInformationsAction'
            ]),
			addDeliveryInformations() {
				(this.showHours) ? this.showHours = false : this.showHours = false
                let informations;
				if (this.address.length > 0 && this.time.length > 0) {
					informations = {
						address: this.address,
						time: this.time[0],
						modified: true
					}
				} else if (this.address.length > 0) {
					informations = {
						address: this.address,
						time: "Remplir un délai de livraison",
						modified: false
					}
				} else if (this.time.length > 0) {
					informations = {
						address: "Remplir une adresse",
						time: this.time[0],
						modified: false
					}
				}
				this.deliveryInformationsAction(informations)
			},
			addDate(event) {
				// (this.showHours) ? this.showHours = false : this.showHours = true
				this.time = []
				this.time.push(event.target.innerText)
			}
		},
		mounted() {
			this.autocomplete = new google.maps.places.Autocomplete(
				(this.$refs.autocomplete),
				{
					types: ['geocode'],
					componentRestrictions: {
						country: "FR"
					}
				}
			);

			this.autocomplete.addListener('place_changed', () => {
				let place = this.autocomplete.getPlace()
				this.address = place.formatted_address
				this.addDeliveryInformations()
			})
		}
	}
</script>
