export const state = () => ({
  selectedCategory: "",
  itemsFav: [],
  itemsInChart: []
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
    state.itemsFav.splice(state.itemsInChart.findIndex(item => item === payload), 1)
  },
  addItemTochart(state, payload) {
    state.itemsInChart.push(payload)
  },
  removeFromChart(state, payload) {
    state.itemsInChart.splice(state.itemsInChart.findIndex(item => item === payload), 1)
  },
}