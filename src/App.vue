<script setup>
import { useModalStore } from '@/stores/model'
import { RouterLink, RouterView } from 'vue-router'

const modalStore = useModalStore()
</script>

<template>
  <div dir="rtl">
    <div>
      <div class="sidebar min-h-screen bg-gray-900">
        <div
          :class="[modalStore.isOpen ? 'block' : 'w-16', 'sidebar min-h-screen bg-gray-900']"
          class="min-h-screen w-56 overflow-hidden border-r bg-white shadow-lg"
        >
          <div class="flex h-screen flex-col justify-between pt-2 pb-6">
            <div>
              <ul class="mt-6 space-y-2 tracking-wide">
                <li class="min-w-max py-4 mb-4 mx-3">
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
                <li class="min-w-max py-2 mb-4">
                  <RouterLink
                    to="/dashboard"
                    aria-label="dashboard"
                    class="relative flex items-center space-x-4 px-2"
                  >
                    <font-awesome-icon
                      class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                      :icon="['fas', 'user']"
                    />
                    <span class="font-medium px-3">المدير العام</span>
                  </RouterLink>
                </li>
                <li
                  class="min-w-max py-2 mb-4 bg-gray-100 hover:bg-gray-200 transition ease-in-out delay-75"
                >
                  <RouterLink
                    to="/dashboard"
                    aria-label="dashboard"
                    class="relative flex items-center space-x-4 px-2"
                  >
                    <font-awesome-icon
                      class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                      :icon="['fas', 'user-plus']"
                    />
                    <span class="font-medium px-3">الموظفين</span>
                  </RouterLink>
                </li>
                <li
                  class="min-w-max py-2 mb-4 bg-gray-100 hover:bg-gray-200 transition ease-in-out delay-75"
                >
                  <RouterLink
                    to="/dashboard"
                    aria-label="dashboard"
                    class="relative flex items-center space-x-4 px-2"
                  >
                    <font-awesome-icon
                      class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                      :icon="['fas', 'gear']"
                    />
                    <span class="font-medium px-3">البحث ولاتعديل </span>
                  </RouterLink>
                </li>
                <li
                  class="min-w-max py-2 mb-4 bg-gray-100 hover:bg-gray-200 transition ease-in-out delay-75"
                >
                  <RouterLink
                    to="/dashboard"
                    aria-label="dashboard"
                    class="relative flex items-center space-x-4 px-2"
                  >
                    <font-awesome-icon
                      class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                      :icon="['fas', 'clipboard-user']"
                    />
                    <span class="font-medium px-3"> سجل الحضور اليومي </span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- منطقة العرض -->
    <RouterView />
  </div>
</template>

<style scoped>
.sidebar {
  transition: all 0.4s ease-in-out;
}
</style>
