export const state = () => ({
  selectedCategory: ""
})

export const getters = {
  getCounter(state) {
    return state.selectedCategory
  }
}

export const mutations = {
  setSelectedCategory(state, payload) {
    state.selectedCategory = payload
  }
}