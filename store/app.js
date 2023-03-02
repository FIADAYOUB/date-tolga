export const state = () => ({
  showChartModal: false
})

export const mutations = {
  setShowChartModal(state, payload) {
    state.showChartModal = payload
  },
}