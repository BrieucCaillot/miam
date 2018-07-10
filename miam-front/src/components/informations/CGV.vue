<template>
    <div id="cgv">
        <Header/>
        <div class="container">
            <div class="columns pd-t5">
                <div class="column">
                    <div class="level pd-t5 pd-b2">
                        <div class="level-left">
                            <router-link class="text__is-tertiary page-content-info__back p-rel pd-l3" :to="{name: 'Home'}">
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
            <div class="columns">
                <div class="column">
                    <div class="level pd-b2">
                        <div class="level-left">
                            <h2 class="is-size-4 text__ft-2 text__is-secondary">Article 1 : Objet</h2>
                        </div>
                    </div>
                    <div class="level">
                        <p>
                            La société MIAM (ci-après « MIAM ») propose principalement la vente de produits via son site
                            Internet MIAM.co ou ses applications mobiles MIAM (ci-après le « Site » ou le « Site
                            Internet »). Son activité est exercée sous le nom « MIAM », et est opérée par le Site
                            Internet, exploitée par la société MIAM. Le Site Internet est ouvert à tous les utilisateurs
                            du réseau Internet. La société MIAM a notamment pour activité la vente de plats cuisinés et
                            d'articles d’épiceries (solides et liquides) auprès de ses clients.
                            Les présentes Conditions Générales de MIAM ont pour objet de définir les droits et
                            obligations de MIAM et du Client (ci-après séparément « MIAM » et le « Client » et ensemble
                            « les Parties ») dans le cadre de la vente de produits sur le Site Internet MIAM.co. Elles
                            s’appliquent, sans restriction ni réserve, à l’ensemble des ventes des produits et services
                            proposés par MIAM sur son Site Internet. Les présentes Conditions Générales primeront sur
                            tout autre document sauf accord écrit et précisé par MIAM.
                            Toute commande passée sur le Site ou Site Internet affilié dépendant de MIAM suppose
                            l’acceptation des présentes Conditions Générales, dont le client reconnaît avoir pris
                            connaissance, les avoir comprises et acceptées en parfaite connaissance de cause. Les
                            présentes Conditions Générales sont disponibles uniquement en langue française, cette
                            version étant la seule valable. Le client dispose de la faculté de les sauvegarder et de les
                            imprimer. Les présentes Conditions Générales sont soumises à la loi française et aux normes
                            françaises en vigueur. MIAM se réserve le droit de modifier les présentes Conditions
                            Générales et spécifiques de vente à tout moment, sans préavis, étant entendu que de telles
                            modifications seront inapplicables aux réservations et aux commandes préalablement acceptées
                            et confirmées par le client.
                        </p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="level pd-b2">
                        <div class="level-left">
                            <h2 class="is-size-4 text__ft-2 text__is-secondary">Article 2 : Coordonnées de la
                                société</h2>
                        </div>
                    </div>
                    <div class="level">
                        <p>
                            Le site Internet www.MIAM.co est édité par la société par action simplifiée MIAM au capital
                            social de 2714,41 euros dont le siège social est au 32 avenue de Saint-Mandé, 75012 Paris,
                            inscrite au registre du Commerce et des Sociétés de Paris sous le numéro 811 534 809. Le
                            numéro de TVA intracommunautaire est FR81811534809.
                            Pour contacter MIAM ou le site www.MIAM.co, vous pouvez adresser un courriel à l’adresse
                            suivante : hello@MIAM.co
                        </p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="level pd-b2">
                        <div class="level-left">
                            <h2 class="is-size-4 text__ft-2 text__is-secondary">Article 3 : Capacités juridique</h2>
                        </div>
                    </div>
                    <div class="level">
                        <p>
                            Les clients déclarent être majeurs et pleinement capables de contracter.
                        </p>
                    </div>
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
		name: "CGV",
		components : {
			Header,
			Footer
		},
		data() {
			return {
				title: 'Conditions générales de vente'
			}
		},
	}
</script>