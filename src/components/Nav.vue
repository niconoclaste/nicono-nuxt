<template>
  <ul>
    <li :class="current === 'home' ? 'is-active' : ''" @click="$emit('linkClick')">
      <a :href="current === 'home' ? '#top' : '/'">{{translation.home.title[language]}}</a>
    </li>
    <li :class="current === 'about' ? 'is-active' : ''" @click="$emit('linkClick')">
      <a href="/#about">{{translation.about.title[language]}}</a>
    </li>
    <!-- {#if showWorks} -->
    <li :class="current === 'works' ? 'is-active' : ''" @click="$emit('linkClick')">
      <a href="/#works">{{translation.works.title[language]}}</a>
    </li>
    <!-- {/if} -->
    <li :class="current === 'codes' ? 'is-active' : ''" @click="$emit('linkClick')">
       <a href="/#codes">{{translation.codes.title[language]}}</a>
    </li>
    <!-- {#if showArticles} -->
    <li :class="current === 'articles' ? 'is-active' : ''"  @click="$emit('linkClick')">
      <a :href="current === 'articles' && layout === 'single' ? '/articles' : '/#articles'">{{translation.articles.title[language]}}</a>
    </li>
    <!-- {/if} -->
    <li>
      <!-- <a href="mailto:{email}">{translation.contact.title[$language]}</a> -->
      <span>{{translation.contact.title[language]}}</span>
      <ul>
        <li @click="$emit('linkClick')"><a :href="'mailto:'+email" style="background-image:var(--logo_email)" :title="email">email</a></li>
        <li @click="$emit('linkClick')"><a href="https://twitter.com/NicoloNoClaste/" target="_blank" rel="noreferrer" title="twitter" style="background-image:var(--logo_twitter)">twitter</a></li>
        <li @click="$emit('linkClick')"><a href="https://codepen.io/niconoclaste/" target="_blank" rel="noreferrer" title="codepen" style="background-image:var(--logo_codepen)">codepen</a></li>
        <li @click="$emit('linkClick')"><a href="https://github.com/niconoclaste" target="_blank" rel="noreferrer" title="github" style="background-image:var(--logo_github)">github</a></li>
      </ul>
    </li>
    <li v-if="language">
      <button v-if="language === 'en'" type="button" lang="ja" class="m-lang_btn" @click="$emit('linkClick'); setLang('ja')">日本語</button>
      <button v-else type="button" lang="en" class="m-lang_btn" @click="$emit('linkClick'); setLang('en')">English</button>
    </li>
  </ul>
</template>


<script setup>
	import translation from '~/assets/translation.json';
	import { settings } from '~/assets/settings.js';
	let email = settings.email;
	defineProps({
		current: '',
		layout: '',
		language: '',
	});

	const emit = defineEmits(['setLang']);
	function setLang(lang){
		emit('langChanged', lang);
	}

</script>