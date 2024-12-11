import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    isOpenEditMenu: false,
    isOpenEditProfile: false,
  }),
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? 'hidden' : ''
    },
    hiddenClassEditMenu(state) {
      return !state.isOpenEditMenu ? 'hidden' : ''
    },
    hiddenEditProfile(state) {
      return !state.isOpenEditProfile ? 'hidden' : ''
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
    toggleModalEditProfile() {
      this.isOpenEditProfile = !this.isOpenEditProfile
      console.log(typeof this.isOpenEditProfile)  // سيظهر لك نوع المتغير
      console.log(this.isOpenEditProfile)  // سيظهر لك القيمة الحقيقية

    },
  },
})
