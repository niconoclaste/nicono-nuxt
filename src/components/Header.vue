<template>
	<header class="g-header">
		<nav class="g-navigation" tabindex="0">
			<button class="m-hamburger" :class="{ 'is-closed': naviIsopened }" @click="switchMenu()">
				<i></i><i></i><i></i>
			</button>
			<div class="g-navigation_container">
				<Nav :current="current" :layout="layout" :language="language" @langChanged="getLang" @linkClick="switchMenu" />
			</div>
		</nav>
	</header>

	<aside class="g-aside">
		<h1>
			<a :href="current === 'home' ? '#top' : '/'">NicoNoClaste</a>
			<span>WEB DEVELOPER ・ ウェブデベロッパー</span>
		</h1>
	</aside>
</template>

<script setup>

	let naviIsopened = ref(false);
	let bodyTop = ref(0);
	let scrollBarWidth = ref(0);

	defineProps({
		current: '',
		layout: '',
		language: '',
	})


	function scrollLock (){
		if(!document.documentElement.classList.contains('is-locked')){
			scrollBarWidth.value = window.innerWidth - document.body.clientWidth;
			bodyTop.value = window.scrollY;
			document.documentElement.classList.add('is-locked');
			document.body.style.setProperty('--bodyTop', '-'+ bodyTop.value + 'px');
			document.body.style.setProperty('--scrollBar', scrollBarWidth.value + 'px');
		}
	};

	function scrollUnlock(){
		if(document.documentElement.classList.contains('is-locked')){
			document.documentElement.classList.add('is-moving');
			document.documentElement.classList.remove('is-locked');
			window.scrollTo(0, bodyTop.value);
			document.body.style.setProperty('--bodyTop', '0px');
			document.body.style.setProperty('--scrollBar', '0px');
			document.documentElement.classList.remove('is-moving');
		}
	};

	function switchMenu(){
		if(!naviIsopened.value){
			scrollLock();
		}else{
			scrollUnlock();
		}
		naviIsopened.value = !naviIsopened.value;
	};
	
	const emit = defineEmits(['getLang']);
	function getLang(lang){
		emit('getLang', lang);
	}



</script>
<!-- 
<script>
export default {
	data(){
		return {
			naviIsopened:false,
			bodyTop:0,
			scrollBarWidth:0,
			// language:this.lang
		}
	},
  name: 'Header',
  props: {
    current: '',
    layout: '',
		language: '',
  },
	methods:{
		scrollLock (){
			if(!document.documentElement.classList.contains('is-locked')){
				this.scrollBarWidth = window.innerWidth - document.body.clientWidth;
				this.bodyTop = window.scrollY;
				document.documentElement.classList.add('is-locked');
				document.body.style.setProperty('--bodyTop', '-'+ this.bodyTop + 'px');
				document.body.style.setProperty('--scrollBar', this.scrollBarWidth + 'px');
			}
		},
		scrollUnlock(){
			if(document.documentElement.classList.contains('is-locked')){
				document.documentElement.classList.add('is-moving');
				document.documentElement.classList.remove('is-locked');
				window.scrollTo(0, this.bodyTop);
				document.body.style.setProperty('--bodyTop', '0px');
				document.body.style.setProperty('--scrollBar', '0px');
				document.documentElement.classList.remove('is-moving');
			}
		},
		switchMenu(){
			if(!this.naviIsopened){
				this.scrollLock();
			}else{
				this.scrollUnlock();
			}
			this.naviIsopened = !this.naviIsopened;
		},
		getLang(lang){
			this.$emit('getLang', lang);
		}
	}
}
</script> -->