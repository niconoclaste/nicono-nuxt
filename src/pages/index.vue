<template>
	<section class="l-hero">
		<Hero />
	</section>

	<main class="g-main">
		<Header current="home" layout="home" :language="language" @getLang="setLang" />
		<article class="l-article" id="about">
			<header class="m-header">
				<h2 class="title">{{translation.about.title[language]}}</h2>
			</header>
			<section class="l-section">
			
			<template v-if="language === 'en'">
				<p><strong>Nicolas</strong> (NicoNoClaste)</p>
				<p>born in <strong>Paris</strong> living in <strong>Tokyo</strong></p>
				<p>10+ years <strong>Web Developer</strong></p>
			</template>
			<template v-else-if="language === 'ja'">
				<p><strong>二コラ</strong> (ニコのクラスト)</p>
				<p><strong>パリ</strong>生まれ <strong>東京</strong>在住</p>
				<p>10年+ <strong>ウェブデベロッパー</strong></p>
			</template>
			
				<p>
					HTML&nbsp;<strong>CSS</strong>&nbsp;SCSS <strong>JavaScript</strong>&nbsp;TypeScript<br>
					<strong>Svelte</strong>&nbsp;Sveltekit <strong>Vue</strong>&nbsp;Nuxt <strong>Astro</strong>&nbsp;Eleventy<br>
					<!-- <strong>Node.js</strong>&nbsp;Ionic <strong>PHP</strong> SQL&nbsp;<strong>WordPress</strong> ... -->
					<strong>PHP</strong> SQL&nbsp;<strong>WordPress</strong> ...
				</p>
			</section>

			<footer class="m-footer">
				<p><a href="/about"><strong>{{translation.about.more[language]}}</strong></a></p>
			</footer>

		</article>

		<article class="l-article" id="works" v-if="settings.maxWorks >= works.length">
			<header class="m-header">
				<h2 class="title">{{translation.works.title[language]}}</h2>
			</header>

			<section class="l-section">
				<div class="m-bloc" id="top-works">
					<ul class="m-works-list">
						<li v-for="work in works" :key="work.id">
							<a :href="work.link" target="_blank" rel="noopener">
								<div class="m-works-list_thumb" v-if="work.thumb">
									<img :src="work.thumb" :alt="work.title[language]" class="img" loading="lazy">
								</div>

								<div class="m-works-list_body">
									<h2 class="title">{{work.title[language]}}</h2>
									<p class="m-works-list_desc">
										<small>{{work.client[language] !== work.title[language] ? work.client[language]+' ' : ''}}({{dateOutput(work.date)}})</small>
									</p>
									<!-- <p class="m-works-list_desc"><small>{{dateOutput(work.date)}}</small></p> -->
								</div>
								<div class="m-works-list_tags" v-if="work.techs">
									<span v-for="tech in work.techs" class="m-logo-icon" :style="'background-image:var(--logo_'+tech+')'" title="{tech}">{{tech}}</span>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</section>

			<footer class="m-footer" v-if="settings.maxWorks >= works.length">
				<p><a href="/works"> <strong>{{translation.works.more[language]}}</strong></a></p>
			</footer>

		</article>


		<article class="l-article" id="codes">
			<header class="m-header">
				<h2 class="title">{{translation.codes.title[language]}}</h2>
			</header>

			<section class="l-section">

				<CodeSnippet id="NWgvaOa" title="CSS only responsive slider" title_ja="CSSのみ レスポンシブ カルーセル" :language="language" />

				<!-- <CodeSnippet id="abwyYRN" title="CSS only hamburger navigation" title_ja="CSSのみ ハンバーガー ナビゲーション" /> -->

				<CodeSnippet id="ExbKxPx" title="Responsive svg progress circle" title_ja="レスポンシブSVG進行サークル" :language="language"/>

				<CodeSnippet id="poadjOL" title="STAR WARS opening" title_ja="スターウォーズ オープニング" :language="language"/>

			</section>
			<footer class="m-footer">
				<p><a href="https://codepen.io/niconoclaste" target="_blank" rel="noopener"><strong>{{translation.codes.more[language]}}</strong></a></p>
			</footer>
		</article>


		<article class="l-article" id="articles">
			<header class="m-header">
				<h2 class="title">{{translation.articles.title[language]}}</h2>
			</header>

			<section class="l-section">
				<div class="m-bloc">
					<PostsList :language="language" :top=true />
				</div>
			</section>

			<footer class="m-footer">
				<p><a href="/articles"><strong>{{translation.articles.more[language]}}</strong></a></p>
			</footer>
		</article>
	</main>

	<Footer />
</template>

<script setup>

	import translation from '~/assets/translation.json';
	import { settings } from '~/assets/settings.js';

	let language = ref(false);
	let works = ref([]);

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

	function dateOutput(date){
		let formattedDate;
		if(language.value === 'en'){
			formattedDate = new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(new Date(date));
		}else{
			formattedDate = new Intl.DateTimeFormat('ja-JP', {year: 'numeric'}).format(new Date(date));
		}
		return formattedDate;
	};

	function getWorks(){
		fetch('http://niconoclaste.jp/lib/works/')
      .then(response => response.json())
      .then(data => {
				let allWorks = data.filter((work) => !work.hidden);

				let topWorks = allWorks.filter((work) => work.top).sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : 0).slice(0, settings.maxWorks);

				works.value = topWorks;
		});
	}
	// getLang();

	onMounted(() => {
		getLang();
		getWorks();
	})

</script>