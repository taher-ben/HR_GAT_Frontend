import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchUserData(userId) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`)
        this.userData = response.data
      } catch (err) {
        this.error = err.message || 'An error occurred'
      } finally {
        this.isLoading = false
      }
    },
  },
})
