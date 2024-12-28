<template>
  <div class=" w-full bg-white h-full">
    <h2>إضافة مستخدم</h2>
    <div class="grid gap-2">
      <div class="grid gap-1">
        <label class="dark:text-zinc-500" for="username">اسم المستخدم</label>
        <input
          id="username"
          v-model="signupData.username"
          type="text"
          placeholder="اسم المستخدم"
          class="mb-3 h-full w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 focus:outline-none focus:ring-sky-600 focus:ring-1"
        />

        <label class="dark:text-zinc-500 mt-2" for="password">كلمة المرور</label>
        <input
          id="password"
          v-model="signupData.password"
          type="password"
          placeholder="كلمة المرور"
          class="mb-3 h-full w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 focus:outline-none focus:ring-sky-600 focus:ring-1"
        />
      </div>

      <button
        @click="signup"
        class="mt-2 flex w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
      >
        تسجيل دخول
      </button>
    </div>

    <!-- Change Password Section -->
    <h2>تغيير كلمة المرور</h2>
    <div class="grid gap-2">
      <div class="grid gap-1">
        <label class="dark:text-zinc-500" for="oldPassword">كلمة المرور القديمة</label>
        <input
          id="oldPassword"
          v-model="passwordData.oldPassword"
          type="password"
          placeholder="كلمة المرور القديمة"
          class="mb-3 h-full w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 focus:outline-none focus:ring-sky-600 focus:ring-1"
        />

        <label class="dark:text-zinc-500 mt-2" for="newPassword">كلمة المرور الجديدة</label>
        <input
          id="newPassword"
          v-model="passwordData.newPassword"
          type="password"
          placeholder="كلمة المرور الجديدة"
          class="mb-3 h-full w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 focus:outline-none focus:ring-sky-600 focus:ring-1"
        />
      </div>

      <button
        @click="changePassword"
        class="mt-2 flex w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
      >
        تغيير كلمة المرور
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      signupData: {
        username: "",
        password: "",
      },
      passwordData: {
        oldPassword: "",
        newPassword: "",
      },
      token: localStorage.getItem('authToken'),
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post(
          "http://192.168.1.250:88/api/users/signup",
          this.signupData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        alert("تم التسجيل بنجاح");
        console.log(response.data);
      } catch (error) {
        console.error("Error signing up:", error);
      }
    },

    async changePassword() {
      try {
        const response = await axios.patch(
          "http://192.168.1.250:88/api/users/change-password",
          this.passwordData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        alert("تم تغيير كلمة المرور بنجاح");
        console.log(response.data);
      } catch (error) {
        console.error("Error changing password:", error);
      }
    },
  },
};
</script>

