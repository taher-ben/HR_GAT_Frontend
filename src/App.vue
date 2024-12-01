<script setup>
import { useModalStore } from '@/stores/model'
import { useAuthStore } from '@/stores/authStore'
import { RouterLink, RouterView } from 'vue-router'

const modalStore = useModalStore()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  window.location.href = '/Login'
}
</script>

<template>
  <div dir="rtl">
    <div class="flex">
      <div
        :class="[
          modalStore.isOpen
            ? 'md:w-60 w-full md:static absolute top-0 right-0 z-50'
            : 'md:w-16 w-14',
        ]"
        class="sidebar min-h-screen bg-gray-100 transition-all md:duration-150 duration-150"
      >
        <div class="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <ul class="mt-6 space-y-2 tracking-wide">
              <li class="min-w-max py-4 mb-4 md:mx-3 mx-1">
                <font-awesome-icon
                  :class="[modalStore.isOpen ? 'block' : 'hidden']"
                  :icon="['fas', 'bars-staggered']"
                  @click="modalStore.toggleModal"
                  class="cursor-pointer text-gray-500 hover:text-gray-700 size-5 mx-1 px-2"
                />
                <font-awesome-icon
                  :class="[modalStore.isOpen ? 'hidden' : 'block']"
                  :icon="['fas', 'bars']"
                  @click="modalStore.toggleModal"
                  class="cursor-pointer text-gray-500 hover:text-gray-700 size-5 mx-1 px-2"
                />
              </li>
              <li
                v-if="authStore.isAuthenticated"
                class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50"
              >
                <RouterLink to="/" activeClass="text-blue-600" class="relative flex items-center">
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'user-plus']"
                  />
                  <span class="font-medium px-3">الموظفين</span>
                </RouterLink>
              </li>
              <li
                v-if="authStore.isAuthenticated"
                class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50"
              >
                <RouterLink
                  to="/about"
                  activeClass="text-blue-600"
                  class="relative flex items-center"
                >
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'gear']"
                  />
                  <span class="font-medium px-3">البحث والتعديل</span>
                </RouterLink>
              </li>
              <li
                v-if="authStore.isAuthenticated"
                class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50"
              >
                <RouterLink
                  to="/AttendaceView"
                  activeClass="text-blue-600"
                  class="relative flex items-center"
                >
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'clipboard-user']"
                  />
                  <span class="font-medium px-3"> الحضور اليومي</span>
                </RouterLink>
              </li>
              <li
                v-if="authStore.isAuthenticated"
                class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50"
              >
                <RouterLink
                  to="/ChartsPage"
                  activeClass="text-blue-600"
                  class="relative flex items-center"
                >
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'chart-simple']"
                  />
                  <span class="font-medium px-3">التخطيط</span>
                </RouterLink>
              </li>
              <li
                v-if="authStore.isAuthenticated"
                class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50"
              >
                <RouterLink
                  to="/PenaltiesAndRewards"
                  activeClass="text-blue-600"
                  class="relative flex items-center"
                >
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4 hover:bg-gray-50"
                    :icon="['fas', 'hand-holding-dollar']"
                  />
                  <span class="font-medium px-3"> الخصومات والمكافآت </span>
                </RouterLink>
              </li>
              <li v-if="authStore.isAuthenticated" class="min-w-max py-2 mb-4 md:px-2 px-1">
                <button
                  @click="logout"
                  class="relative flex items-center w-full py-2 text-left hover:bg-gray-50 transition ease-in-out delay-75"
                >
                  <font-awesome-icon
                    class="text-red-500 bg-red-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'arrow-right-from-bracket']"
                  />
                  <span class="font-medium px-3">تسجيل الخروج</span>
                </button>
              </li>
              <li v-else class="min-w-max py-2 mb-4 md:px-2 px-1">
                <RouterLink to="/Login" class="relative flex items-center">
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'arrow-right-to-bracket']"
                  />
                  <span class="font-medium px-3">تسجيل الدخول</span>
                </RouterLink>
              </li>
            </ul>
            <!-- <ul class="mt-6 space-y-2 tracking-wide">
              <li class="min-w-max py-4 mb-4 md:mx-3 mx-1">
                <font-awesome-icon
                  :class="[modalStore.isOpen ? 'block' : 'hidden']"
                  :icon="['fas', 'bars-staggered']"
                  @click="modalStore.toggleModal"
                  class="cursor-pointer text-gray-500 hover:text-gray-700 size-5 mx-1 px-2"
                />
                <font-awesome-icon
                  :class="[modalStore.isOpen ? 'hidden' : 'block']"
                  :icon="['fas', 'bars']"
                  @click="modalStore.toggleModal"
                  class="cursor-pointer text-gray-500 hover:text-gray-700 size-5 mx-1 px-2"
                />
              </li>

              <li class="min-w-max py-2 mb-4 md:px-2 px-1">
                <RouterLink to="/Login" aria-label="dashboard" class="relative flex items-center">
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'user']"
                  />
                  <span class="font-medium px-3">المدير العام</span>
                </RouterLink>
              </li>
              <li
                class="min-w-max py-2 mb-4 hover:bg-gray-200 transition ease-in-out delay-75 md:px-2 px-1"
              >
                <RouterLink to="/" aria-label="employees" class="relative flex items-center">
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'user-plus']"
                  />
                  <span class="font-medium px-3">الموظفين</span>
                </RouterLink>
              </li>
              <li
                class="min-w-max py-2 mb-4 hover:bg-gray-200 transition ease-in-out delay-75 md:px-2 px-1"
              >
                <RouterLink to="/about" aria-label="search" class="relative flex items-center">
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'gear']"
                  />
                  <span class="font-medium px-3">البحث والتعديل</span>
                </RouterLink>
              </li>
              <li
                class="min-w-max py-2 mb-4 hover:bg-gray-200 transition ease-in-out delay-75 md:px-2 px-1"
              >
                <RouterLink
                  to="/AttendaceView"
                  aria-label="attendance"
                  class="relative flex items-center"
                >
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'clipboard-user']"
                  />
                  <span class="font-medium px-3"> الحضور اليومي</span>
                </RouterLink>
              </li>
              <li
                class="min-w-max py-2 mb-4 hover:bg-gray-200 transition ease-in-out delay-75 md:px-2 px-1"
              >
                <RouterLink
                  to="/PenaltiesAndRewards"
                  aria-label="attendance"
                  class="relative flex items-center"
                >
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'hand-holding-dollar']"
                  />
                  <span class="font-medium px-3"> الخصومات والمكافآت </span>
                </RouterLink>
              </li>
              <li
                class="min-w-max py-2 mb-4 hover:bg-gray-200 transition ease-in-out delay-75 md:px-2 px-1"
              >
                <RouterLink
                  to="/ChartsPage"
                  aria-label="attendance"
                  class="relative flex items-center"
                >
                  <font-awesome-icon
                    class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'chart-simple']"
                  />
                  <span class="font-medium px-3">التخطيط</span>
                </RouterLink>
              </li>
            </ul> -->
          </div>
        </div>
      </div>
      <div
        class="w-full z-50"
        :class="[modalStore.isOpen ? 'opacity-0 md:opacity-100' : 'opacity-100']"
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  transition: all 0.3s ease-in-out;
}
</style>
