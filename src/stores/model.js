import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: true,
  }),
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? 'hidden' : ''
    },
  },
  actions: {
    toggleModal() {
      this.isOpen = !this.isOpen
    },
  },
})
