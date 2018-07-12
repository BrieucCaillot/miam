<template>
    <div id="legas">
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
                            <h2 class="is-size-4 text__ft-2 text__is-secondary">Responsabilités</h2>
                        </div>
                    </div>
                    <div class="level">
                        <p>
                            Responsable : Brieuc Caillot
                            <br>
                            Adresse email de contact : brieucmailpro@gmail.com
                            <br>
                            Le site internet miam.fr a été conçu par Monsieur Brieuc Caillot dans le cadre d’un travail
                            scolaire de fin de deuxième année d’enseignement à l’école Webstart.
                        </p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="level pd-b2">
                        <div class="level-left">
                            <h2 class="is-size-4 text__ft-2 text__is-secondary">Hébergement</h2>
                        </div>
                    </div>
                    <div class="level">
                        <p>
                            Amazon Web Services
                            <br>
                            Amazon Web Services, Inc. P.O. Box 81226 Seattle, WA 98108-1226
                            <br>
                            http://aws.amazon.com
                        </p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="level pd-b2">
                        <div class="level-left">
                            <h2 class="is-size-4 text__ft-2 text__is-secondary">Propriété intellectuelle</h2>
                        </div>
                    </div>
                    <div class="level">
                        <p>
                            La société Miam détient, se réserve et conserve tous les droits de propriété, notamment
                            intellectuelle, y compris les droits de reproduction sur le présent site et les éléments
                            qu’il contient. En conséquence et notamment toute reproduction partielle ou totale du
                            présent site et des éléments qu’il contient est strictement interdite sans autorisation
                            écrite de la société Miam
                            <br><br>
                            Les logos et tous autres signes distinctifs contenus sur ce site sont la propriété de la
                            société Miam ou font l'objet d'une autorisation d'utilisation. Aucun droit ou licence ne
                            saurait être attribué sur l'un quelconque de ces éléments sans l'autorisation écrite de la
                            société Miam ou du tiers détenteur des droits.
                        </p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="level pd-b2">
                        <div class="level-left">
                            <h2 class="is-size-4 text__ft-2 text__is-secondary">Exclusion de garantie et
                                responsabilité</h2>
                        </div>
                    </div>
                    <div class="level">
                        <p>
                            L'utilisateur du site web « miam.fr » reconnaît avoir pris connaissance des présentes
                            conditions d'utilisation du site et s'engage à les respecter.
                            <br><br>
                            La société "miam" ne saurait être tenue pour responsable des dommages directs ou
                            indirects qui pourraient résulter de l'accès au site ou de l'utilisation du site et/ou de
                            ces informations, y compris l'inaccessibilité, les pertes de données, détériorations,
                            destructions ou virus qui pourraient affecter l'équipement informatique de l'utilisateur
                            et/ou de la présence de virus sur son site.
                            <br>
                            Bien que la société Miam s'efforce de fournir un contenu fiable sur son site, elle ne
                            garantit pas que son contenu soit exempt d'inexactitudes ou d'omissions et ne saurait être
                            tenu pour responsable des erreurs ou omissions, d'une absence de disponibilité des
                            informations et des services. La société Miam se réserve à tout moment et sans préavis le
                            droit d'apporter des améliorations et/ou des modifications au contenu de son site. En
                            conséquence, l'utilisateur reconnaît se servir de ses informations sous sa responsabilité
                            exclusive.
                        </p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="level pd-b2">
                        <div class="level-left">
                            <h2 class="is-size-4 text__ft-2 text__is-secondary">Données personnelles</h2>
                        </div>
                    </div>
                    <div class="level">
                        <p>
                            Conformément à la loi « Informatique et Liberté » du 6 janvier 1978, l’utilisateur du site
                            dispose d’un droit d’accès, de modification, de rectification et de suppression des données
                            qui le concernent, qu’il peut exercer auprès de la société Miam.
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
		name: "Legals",
		components : {
			Header,
			Footer
		},
		data() {
			return {
				title: 'Mentions légales'
			}
		},
	}
</script>