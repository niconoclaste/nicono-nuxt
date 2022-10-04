<template>
	<main class="g-main" v-if="language">
		<Header :current="category" layout="category" :language="language" @getLang="setLang" />

		<article class="l-article" :id="category">
			<header class="m-header">
				<h1 class="title"><h1 class="title">{{translation[category].title[language]}}</h1></h1>
			</header>

			<section class="l-section">
				<div class="m-bloc">
<!-- 
					<p class="m-filter-bloc">
						<strong>ORDER BY DATE : </strong><br>
						<label><input type="radio" v-model="order" value="DESC"> new → old </label> <br>
						<label><input type="radio" v-model="order" value="ASC"> old → new </label>
					</p>

					<p class="m-filter-bloc">
						<strong>SHOW HIDDEN WORKS ? : </strong>
						<label><input type="radio" v-model="showHidden" value="0"> no </label>
						<label><input type="radio" v-model="showHidden" value="1"> yes </label> 
					</p>

					<p class="m-filter-bloc">
						<strong>FILTER BY CATEGORIES : </strong>
						<label v-for="cat in allCategories">
							<input type="checkbox" :disabled='!cat.available' :checked="cat.selected" v-model="categories" :value="cat.name">
							<span>{{translation.works.categories[cat.name][language]}}</span>
						</label>
					</p>
-->

					<ul id="list" class="m-works-list">
						<li v-for="(work, i) in works" :key="work.id" :hidden="Math.floor((i / maxWorks) + 1) > selectedPage ? true : false">
							<a :href="work.link" target="_blank" rel="noopener">
								<div class="m-works-list_thumb" v-if="work.thumb">
									<img :src="work.thumb" :alt="work.title[language]" class="img" loading="lazy">
								</div>

								<div class="m-works-list_body">
									<h2 class="title">{{work.title[language]}}</h2>
									<p class="m-works-list_desc">
										<small>{{work.client[language] !== work.title[language] ? work.client[language]+' ' : ''}}({{dateOutput(work.date)}})</small>
									</p>
									<p>{{translation.works.categories[work.category][language]}}</p>
									<!-- <p class="m-works-list_desc"><small>{{dateOutput(work.date)}}</small></p> -->
								</div>
								<div class="m-works-list_tags" v-if="work.techs">
									<span v-for="tech in work.techs" class="m-logo-icon" :style="'background-image:var(--logo_'+tech+')'" title="{tech}">{{tech}}</span>
								</div>
							</a>
						</li>
					</ul>

					<button v-if="pages > 1 && selectedPage < pages" v-on:click="selectedPage = selectedPage + 1">LOAD MORE</button>
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
	let category = "works";

	let allWorks = ref([]);
	let works = ref([]);

	let order = ref('DESC');
	let showHidden = ref('0');
	let allCategories = ref([]);
	let categories = ref([]);
	let worksShown = ref(0);
	let maxWorks = ref(parseInt(settings.maxWorks));
	let selectedPage = ref(1);
	let pages = ref(0);

	function setLang (lang){
		window.localStorage.setItem('lang', lang);
		document.documentElement.setAttribute('lang', lang);
		language.value = lang;
	};


	function getWorks(){
		fetch('http://niconoclaste.jp/lib/works/')
			.then(response => response.json())
			.then(data => {
				allWorks.value = data.filter((work) => work.id !== '〇〇');

				let filteredWorks = allWorks.value.filter((work) => showHidden.value === '0' ? !work.hidden : work);

				let sortedWorks = filteredWorks.sort((a, b) => order.value === 'DESC' ? new Date(b.date).getTime() - new Date(a.date) : new Date(a.date).getTime() - new Date(b.date));

				works.value = sortedWorks;

				let filteredCats = [...new Set(filteredWorks.map(work => work.category))];
				filteredCats.forEach(cat => cat !== '' ? categories.value.push(cat) : '');

				let allCats = [...new Set(allWorks.value.map(work => work.category))];
				allCats.forEach(cat => cat !== '' ? allCategories.value.push({name:cat, selected: categories.value.includes(cat), available: categories.value.includes(cat)}) : '');

				worksShown.value = sortedWorks.length;

				pages.value = Math.ceil(worksShown.value / maxWorks.value);
		});
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

	watch([order, showHidden, categories], () => {

		works.value = works.value.sort((a, b) => order.value === 'DESC' ? new Date(b.date).getTime() - new Date(a.date) : new Date(a.date).getTime() - new Date(b.date));

		allWorks.value = allWorks.value.sort((a, b) => order.value === 'DESC' ? new Date(b.date).getTime() - new Date(a.date) : new Date(a.date).getTime() - new Date(b.date));

		works.value = allWorks.value.filter((work) => showHidden.value === '0' ? !work.hidden : work);

		let filteredCats = [...new Set(allWorks.value.map(work => work.category))];

		allCategories.value.forEach((cat) => filteredCats.includes(cat.name) ? cat.available = true : cat.available = false);
		allCategories.value.forEach((cat) => categories.value.includes(cat.name) ? cat.selected = true : cat.selected = false);

		works.value = works.value.filter((work) => categories.value.includes(work.category));

		worksShown.value = works.value.length;

		pages.value = Math.ceil(worksShown.value / maxWorks.value);
	});

	onMounted(() => {
		getLang();
		getWorks();
	})

</script>
