import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    error: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const validUser = {
          username: 'admin',
          password: 'admin',
        }

        if (
          credentials.username === validUser.username &&
          credentials.password === validUser.password
        ) {
          this.isAuthenticated = true
          localStorage.setItem('isAuthenticated', 'true')
          this.error = null
        } else {
          this.isAuthenticated = false
          this.error = 'اسم المستخدم أو كلمة المرور غير صحيحة'
        }
      } catch {
        this.error = 'حدث خطأ أثناء تسجيل الدخول'
      }
    },
    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('isAuthenticated')
    },
    checkAuth() {
      this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    },
  },
})
