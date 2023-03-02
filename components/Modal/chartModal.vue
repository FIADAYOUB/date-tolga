<template>
  <div class="modal" v-if="isShow">
    <div class="modal-content">
      <div class="modal-header">
        <h3>shopping list</h3>
        <button class="close" @click="close()">&times;</button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Modal",
  props: {
  },
  methods: {
    close() {
      this.$store.commit('app/setShowChartModal', false)
    },
  },
  computed: {
    isShow () {
        return this.$store.state.app.showChartModal
      },
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  width: 50%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close {
  font-size: 25px;
  color: #aaa;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
