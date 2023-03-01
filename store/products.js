export const state = () => ({
  selectedCategory: "",
  itemsFav: []
})

export const getters = {
  getCounter(state) {
    return state.selectedCategory
  }
}

export const mutations = {
  setSelectedCategory(state, payload) {
    state.selectedCategory = payload
  },
  addToFav(state, payload) {
    state.itemsFav.push(payload)
  },
  removeFromFav(state, payload) {
    state.itemsFav.splice(state.itemsFav.findIndex(item => item === payload), 1)
  }
}