<template>
    <div id="home">
        <Header/>
        <Card/>
        <HeaderHome/>
        <OrderItems/>
        <Footer/>
    </div>
</template>

<script>

	import Header from '@/components/global/Header'
	import Card from '@/components/global/Card'
	import HeaderHome from '@/components/home/HeaderHome'
	import OrderItems from '@/components/home/OrderItems'
	import Footer from '@/components/global/Footer'
	import Mixins from '@/mixins/mixins'

	export default {
		mixins: [Mixins],
		name: "Homepage",
		components: {
			Header,
            Card,
			HeaderHome,
			Footer,
			OrderItems
		},
	}
</script>