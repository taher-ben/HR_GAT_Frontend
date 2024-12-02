import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    isOpenEditMenu: false,
  }),
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? 'hidden' : ''
    },
    hiddenClassEditMenu(state) {
      return !state.isOpenEditMenu ? 'hidden' : ''
    },
  },
  actions: {
    toggleModal() {
      this.isOpen = !this.isOpen
    },
    toggleModalEditMenu() {
      this.isOpenEditMenu = !this.isOpenEditMenu
      console.log('Toggle menu:', this.isOpenEditMenu)
    },
  },
})
