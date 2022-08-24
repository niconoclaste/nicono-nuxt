let lang = false;
if(typeof window !== 'undefined' && window !== null){
	lang = window.localStorage.getItem('lang');
	console.log(lang);
	if(lang === null){
		lang = window.navigator.userLanguage || window.navigator.language;
		if(lang !== 'ja'){
			lang = 'en';
		}
	}
	document.documentElement.setAttribute('lang', lang);
	console.log(lang);
}
// return lang;


export const state = () => ({
  language: lang
})
export const mutations = {
  STORE_LANG(state, language) {
    state.language = language
  }
}
export const actions = {
  setLang({commit}, language) {
    commit('STORE_LANG', language)
  }
}
export const getters = {
  getLang(state) {
    return state.language
  }
}