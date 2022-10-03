<template>
  <main class="g-main" v-if="language">

		<Header :current="category" layout="single" :language="language" @getLang="setLang" />

		<article class="l-article" :id="category">
			<header class="m-header">
				<h1 class="title">{{translation[category].title[language]}}</h1>
			</header>
			<section class="l-section">
				<div class="m-bloc">
					<h3 class="title">{{ language === 'en' ? articleData.title : articleData.title_ja}}</h3>
					<p class="m-article-date">
						{{new Intl.DateTimeFormat('ja-JP', {dateStyle: dateSyle()}).format(new Date(articleData.date))}}
						<small>(last modified : {{new Intl.DateTimeFormat('ja-JP', {dateStyle: dateSyle()}).format(new Date(articleData.lastModified))}})</small>
					</p>
					<ContentDoc />
				</div>
			</section>

			<footer class="m-footer">
				<p><a :href="'/'+category"><strong>{{translation[category].more[language]}}</strong></a></p>
			</footer>
		</article>
		<Footer />
  </main>
</template>


<script setup>
	import { settings } from '~/assets/settings.js';
	import translation from '~/assets/translation.json';

	const route = useRoute();
	const { data } = await useAsyncData('get-document', () => queryContent(route.fullPath).findOne());
	const articleData = data._rawValue;

	let language = ref(false);
	let category = 'articles';

	function dateSyle(){
		if(language.value === 'ja'){
			return 'long';
		}else{
			return 'short';
		}
	};

	function setLang (lang){
		window.localStorage.setItem('lang', lang);
		language.value = lang;
	};

	function getLang(){
		let lang = 'en';
		if(typeof window !== 'undefined' && window !== null){
			lang = window.localStorage.getItem('lang');
			if(lang === null){
				lang = window.navigator.userLanguage || window.navigator.language;
				if(lang !== 'ja'){
					lang = 'en';
				}
			}
			document.documentElement.setAttribute('lang', lang);
			language.value = lang;
		}
	}

	function setTitle(lang){
		let pageTitle = articleData.title + ' | articles | '+settings.baseTitle;
		if(lang === 'ja'){
			pageTitle = articleData.title_ja + ' | articles | '+settings.baseTitle;
		}
		useHead({
			title: pageTitle,
			meta: [
				{ name: 'description', content: 'My amazing site.' }
			],
		})
	};

	onUpdated(() => {
		setTitle(language.value);
		document.documentElement.setAttribute('lang', language.value);
	})
	onMounted(() => {
		getLang();
		setTitle(language.value);
	})
</script>


