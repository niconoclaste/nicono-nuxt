export const state = () => ({
  language: 'en'
})

export const mutations = {
  setLanguage (state, lang) {
    state.language = lang;
  }
}

export const actions = {
  storeLanguage({commit}, lang) {
    commit('setLanguage', lang)
  }
}

export const getters = {
  getLanguage(state) {
    return state.language
  }
}