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
        const authToken = localStorage.getItem('authToken')
        const response = await axios.get(`http://localhost:8000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        this.userData = response.data
      } catch (err) {
        this.error = err.message || 'An Error Occurred'
      } finally {
        this.isLoading = false
      }
    },
  },
})
