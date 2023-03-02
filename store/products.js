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
    state.itemsFav.splice(state.itemsFav.findIndex(item => item === payload), 1)
  },
  addItemTochart(state, payload) {
    const i = state.itemsInChart.findIndex(item => item.id === payload.id)
    if (i === -1) {
      state.itemsInChart.push({ ...payload, count: 1 })
    } else {
      state.itemsInChart.forEach(element => {
        if (element.id == payload.id) {
          element.count++
          return
        }
      })
    }
  },
  removeFromChart(state, payload) {
    const i = state.itemsInChart.find(item => item.id === payload.id)
    if (i.count === 1) {
      state.itemsInChart.splice(state.itemsInChart.findIndex(item => item.id === payload), 1)
    } else {
      state.itemsInChart.forEach(element => {
        if (element.id == payload.id) {
          element.count--
          return
        }
      })
    }
  },
}