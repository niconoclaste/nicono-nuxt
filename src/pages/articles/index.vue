<template>
	<main class="g-main">
		<Header :current="category" layout="category" :language="language" @getLang="setLang" />

		<article class="l-article" :id="category">
			<header class="m-header">
				<h1 class="title"><h1 class="title">{{translation[category].title[language]}}</h1></h1>
			</header>

			<section class="l-section">
				<div class="m-bloc">
					<PostsList :language="language" />
				</div>
			</section>

    <footer class="m-footer">
      <p><a :href="'/#'+category"><strong>{{language == 'en' ? 'Site top' : 'トップページ'}}</strong></a></p>
    </footer>

		</article>

		<Footer/>

	</main>
</template>


<script setup>

	import translation from '~/assets/translation.json';
	import { settings } from '~/assets/settings.js';

	let language = ref(false);
	let category = "articles";

	function setLang (lang){
		console.log(lang);
		window.localStorage.setItem('lang', lang);
		document.documentElement.setAttribute('lang', lang);
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

	onMounted(() => {
		getLang();
	})

</script>