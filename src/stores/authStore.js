import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    error: null,
  }),
  getters: {
    token: () => {
      return localStorage.getItem('authToken') || null
    },
  },
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', credentials)
        if (response.data.token) {
          this.isAuthenticated = true
          localStorage.setItem('authToken', response.data.token)
          this.error = null
        } else {
          this.isAuthenticated = false
          this.error = 'اسم المستخدم أو كلمة المرور غير صحيحة'
        }
      } catch (error) {
        this.isAuthenticated = false
        this.error = error.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول'
      }
    },
    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('authToken')
    },
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem('authToken')
    },
  },
})
