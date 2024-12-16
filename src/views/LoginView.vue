<template>
  <div class="flex background-login  flex-col justify-center items-center bg-white h-full w-full">
    <div class="mx-auto flex w-full flex-col justify-center px-5 pt-0 lg:px-6">
      <div class="md:w-96 mx-auto my-auto shadow-2xl px-2 py-6 rounded-xl z-50 bg-white">
        <p class="text-[32px] font-bold text-blue-600">تسجيل دخول</p>
        <p class="mb-2.5 mt-2.5 font-normal text-zinc-400">من فضلك ادخل البيانات تسجيل الدخول</p>
        <div class="relative my-4 opacity-full">
          <div class="relative flex items-center py-1">
            <div class="grow border-t border-blue-100"></div>
          </div>
        </div>
        <div>
          <form @submit.prevent="handleLogin" class="mb-4 ">
            <div class="grid gap-2">
              <div class="grid gap-1">
                <label class="dark:text-zinc-500" for="username">اسم المستخدم</label>
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  placeholder="أسم المستخدم"
                  class="mb-3 h-full w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 focus:outline-none focus:ring-sky-600 focus:ring-1"
                />
                <label class="dark:text-zinc-500 mt-2" for="password">كلمة المرور</label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="كلمة المرور"
                  class="mb-3 h-full w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 focus:outline-none focus:ring-sky-600 focus:ring-1"
                />
              </div>
              <button
                type="submit"
                class="mt-2 flex w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
              >
                تسجيل دخول
              </button>
            </div>
          </form>
          <p v-if="authStore.error" class="text-red-500 text-center mt-4">{{ authStore.error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginComponent',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
  },
  methods: {
    async handleLogin() {
      await this.authStore.login({ username: this.username, password: this.password })
      if (this.authStore.isAuthenticated) {
        this.$router.push('/')
      }
    },
  },
  created() {
    this.router = useRouter()
  },
}
</script>
<style>
.background-login{
  position: relative;
  background-image: url(../assets/bg.jpg);
  background-size: cover;
  background-color: white;

}
.background-login::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: white;
  opacity: 80%;
}
</style>
