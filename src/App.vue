<script setup>
import { useModalStore } from '@/stores/model' // لإدارة فتح وإغلاق الشريط الجانبي
import { useAuthStore } from '@/stores/authStore' // لإدارة تسجيل الدخول والخروج
import { RouterLink, RouterView } from 'vue-router' // الروابط وعرض الصفحات

const modalStore = useModalStore() // إنشاء instance للـ Modal store
const authStore = useAuthStore() // إنشاء instance للـ Auth store

// وظيفة لتسجيل الخروج وإعادة التوجيه لصفحة تسجيل الدخول
const logout = () => {
  authStore.logout()
  window.location.href = '/Login'
}
</script>
<script>
export default {
  data() {
    return {
      username: sessionStorage.getItem('nameuser')
    }
  }
}
</script>
<template>
  <div dir="rtl">
    <div class="flex overflow-hidden">
      <div :class="[modalStore.isOpen ? 'md:w-60 w-full md:static absolute top-0 right-0 z-50' : 'md:w-16 w-14']"
        class="sidebar min-h-screen bg-gray-100 transition-all md:duration-150 duration-150">
        <div class="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <ul class="mt-6 space-y-2 tracking-wide">
              <li class="min-w-max py-4 mb-4 md:mx-3 mx-1">
                <font-awesome-icon :class="[modalStore.isOpen ? 'block' : 'hidden']" :icon="['fas', 'bars-staggered']"
                  @click="modalStore.toggleModal"
                  class="cursor-pointer text-gray-500 hover:text-gray-700 size-5 mx-1 px-2" />
                <font-awesome-icon :class="[modalStore.isOpen ? 'hidden' : 'block']" :icon="['fas', 'bars']"
                  @click="modalStore.toggleModal"
                  class="cursor-pointer text-gray-500 hover:text-gray-700 size-5 mx-1 px-2" />
              </li>

              <!-- اسم المستخدم -->
              <li v-if="authStore.isAuthenticated" class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50">
                <div class="relative flex items-center">
                  <font-awesome-icon class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'user']" />
                  <span v-if="username !== 'admin'" class="font-medium px-3">
                    مرحبًا، {{ username }}
                  </span>
                  <span v-else class="font-medium px-3">
                    مرحبًا، المستخدم الرئيسي
                  </span>
                </div>

              </li>

              <!-- الروابط -->
              <li v-if="authStore.isAuthenticated" class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50">
                <RouterLink to="/" activeClass="text-blue-600" class="relative flex items-center">
                  <font-awesome-icon class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'user-plus']" />
                  <span class="font-medium px-3">الموظفين</span>
                </RouterLink>
              </li>
              <li v-if="authStore.isAuthenticated" class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50">
                <RouterLink to="/UploadExcel" activeClass="text-blue-600" class="relative flex items-center">
                  <font-awesome-icon class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'cloud-arrow-up']" />
                  <span class="font-medium px-3">رفع ملفات البصمة</span>
                </RouterLink>
              </li>
              <li v-if="authStore.isAuthenticated" class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50">
                <RouterLink to="/AttendanceAbsence" activeClass="text-blue-600" class="relative flex items-center">
                  <font-awesome-icon class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'right-to-bracket']" />
                  <span class="font-medium px-3">الحضور والانصراف</span>
                </RouterLink>
              </li>
              <li v-if="authStore.isAuthenticated" class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50">
                <RouterLink to="/about" activeClass="text-blue-600" class="relative flex items-center">
                  <font-awesome-icon class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'gear']" />
                  <span class="font-medium px-3">البحث والتعديل</span>
                </RouterLink>
              </li>
              <li v-if="authStore.isAuthenticated" class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50">
                <RouterLink to="/AttendaceView" activeClass="text-blue-600" class="relative flex items-center">
                  <font-awesome-icon class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'clipboard-user']" />
                  <span class="font-medium px-3">الحضور اليومي</span>
                </RouterLink>
              </li>
              <li v-if="authStore.isAuthenticated" class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50">
                <RouterLink to="/LeavesView" activeClass="text-blue-600" class="relative flex items-center">
                  <font-awesome-icon class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'chart-simple']" />
                  <span class="font-medium px-3">الإجازات</span>
                </RouterLink>
              </li>
              <li v-if="authStore.isAuthenticated" class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50">
                <RouterLink to="/PenaltiesAndRewards" activeClass="text-blue-600" class="relative flex items-center">
                  <font-awesome-icon class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'hand-holding-dollar']" />
                  <span class="font-medium px-3">الخصومات والمكافآت</span>
                </RouterLink>
              </li>
              <li v-if="authStore.isAuthenticated" class="min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50">
                <RouterLink to="/AuditLog" activeClass="text-blue-600" class="relative flex items-center">
                  <font-awesome-icon class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'building']" />
                  <span class="font-medium px-3">سجل العمليات</span>
                </RouterLink>
              </li>
              <li v-if="authStore.isAuthenticated" class=" hidden min-w-max py-2 mb-4 md:px-2 px-1 hover:bg-gray-50">
                <RouterLink to="/ChangeAndMake" activeClass="text-blue-600" class="relative flex items-center">
                  <font-awesome-icon class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'building']" />
                  <span class="font-medium px-3"> اعدادات كلمة السر </span>
                </RouterLink>
              </li>
              <!-- زر تسجيل الخروج -->
              <li v-if="authStore.isAuthenticated" class="min-w-max py-2 mb-4 md:px-2 px-1">
                <button @click="logout"
                  class="relative flex items-center w-full py-2 text-left hover:bg-gray-50 transition ease-in-out delay-75">
                  <font-awesome-icon class="text-red-500 bg-red-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'arrow-right-from-bracket']" />
                  <span class="font-medium px-3">تسجيل الخروج</span>
                </button>
              </li>

              <!-- زر تسجيل الدخول -->
              <li v-else class="min-w-max py-2 mb-4 md:px-2 px-1">
                <RouterLink to="/Login" class="relative flex items-center">
                  <font-awesome-icon class="text-blue-500 bg-blue-600 bg-opacity-10 p-3 mx-1 rounded-full size-4"
                    :icon="['fas', 'arrow-right-to-bracket']" />
                  <span class="font-medium px-3">تسجيل الدخول</span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="w-full z-50" :class="[modalStore.isOpen ? 'opacity-0 md:opacity-100' : 'opacity-100']">
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
