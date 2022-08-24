<template>
	<main class="g-main" v-if="language">
		<Header :current="category" layout="category" :language="language" @getLang="setLang" />

		<article class="l-article" :id="category">
			<header class="m-header">
				<h1 class="title"><h1 class="title">{{translation[category].title[language]}}</h1></h1>
			</header>

			<section class="l-section">

				<div class="m-bloc">
 					<h3 class="title">{{language === 'en' ? 'About me' : '私について'}}</h3>
					<template v-if="language === 'en'">
    				<p>aaaaa</p>
					</template>
					<template v-else>
    				<p>あああああ</p>
					</template>
				</div>

				<div class="m-bloc">
					<h3 class="title">{{language === 'en' ? 'About this site' : 'このサイトについて'}}</h3>
					<template v-if="language === 'en'">
    				<p>bbbbbb</p>
					</template>
					<template v-else>
    				<p>いいいいいい</p>
					</template>
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
	let language = ref(false);
	let category = "about";

	function setLang (lang){
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