<template>
  <NuxtPage />
</template>

<script setup>
	import { settings } from '~/assets/settings.js';

	let language = ref(false);

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

	useHead({
		title: settings.baseTitle,
		htmlAttrs: {
      lang: language
    },
    bodyAttrs: {
      id: 'top'
    },
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'description', content: 'NicoNoClaste WEB DEVELOPER ウェブデベロッパー' },
      { name: 'keywords', content: 'NicoNoClaste, WEB DEVELOPER, ウェブデベロッパー' },
      { name: 'theme-color', content: 'black' },
    ],
    link: [
      { rel: 'icon', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/favicon.png' },
    ]
	})
</script>