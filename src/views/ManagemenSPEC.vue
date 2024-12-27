<template>
  <div class="bg-white  flex flex-col   md:h-screen w-full overscroll-none">
    <!-- زر التبديل بين العرضين -->
    <div class="w-full mt-24  text-center mb-4">
      <button @click="toggleView" class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md">
        {{ isAddingDepartment ? 'عرض الأقسام الموجودة' : 'إضافة قسم' }}
      </button>
    </div>
    <div class="flex justify-center p-1 md:h-full overscroll-none overflow-x-hidden overflow-scroll">
      <!-- عرض "إضافة قسم" -->
      <div v-if="isAddingDepartment">
        <VeeForm @submit="submitForm" :validation-schema="schema"
          class="border border-gray-100 space-y-3 w-[30rem] mx-auto my-auto rounded-md bg-white p-6 shadow-xl lg:p-10 flex flex-col gap-4">
          <h1 class="mb-10 text-3xl font-bold text-center">تسجيل بيانات القسم</h1>
          <div>
            <label for="departmentName">اسم القسم</label>
            <VeeField name="departmentName" v-model="form.departmentName" type="text" placeholder="اسم القسم"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
            <ErrorMessage class="text-red-600" name="departmentName" />
          </div>
          <div>
            <label for="managerId">رقم الموظف المدير</label>
            <VeeField name="managerId" v-model="form.managerId" type="text" placeholder="رقم الموظف المدير"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
            <ErrorMessage class="text-red-600" name="managerId" />
          </div>
          <div>
            <button type="submit" class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">
              تسجيل
            </button>
          </div>
        </VeeForm>
      </div>

      <div v-if="!isAddingDepartment">
        <div
          class="border border-gray-100 space-y-3 w-[30rem] mx-auto my-auto rounded-md bg-white p-6 shadow-xl lg:p-10 flex flex-col gap-4">
          <h3 class="text-3xl font-bold text-center">الاقسام الموجودة</h3>
          <div v-if="departments.length === 0" class="text-gray-500">لا توجد أقسام حالياً.</div>
          <div v-for="department in departments" :key="department.id" class="mt-4 border-t pt-2">
            <div><strong>اسم القسم: </strong>{{ department.departmentName }}</div>
            <div><strong>رقم القسم: </strong>{{ department.departmentId }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="relative bottom-24 right-6 text-white text-xl z-10 w-fit px-4 py-2 bg-blue-700 rounded-full">
    <div @click="toggleText" class="cursor-pointer transition duration-150 ease-in-out flex items-center space-x-2">
      <div :class="[isTextVisible ? 'rotate-45' : 'rotate-0']"
        class="transition duration-150 ease-in-out font-extrabold">
        +
      </div>
    </div>
    <transition name="fade-slide" enter-active-class="transition duration-300 ease-out"
      leave-active-class="transition duration-300 ease-in">
      <div @click="toggleText" v-show="isTextVisible"
        class="mt-2 bg-white absolute -top-28 text-black px-4 py-2 rounded shadow">
        <router-link to="/"> إضافة موظف </router-link>
      </div>
    </transition>
  </div>
</template>
<script>
import axios from 'axios'
import API_ENDPOINTS from '../stores/api'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      isTextVisible: false,
      form: {
        departmentName: '',
        managerId: '',
      },
      schema: {
        departmentName: 'required',
      },
      departments: [],
      isLoading: false,
      isAddingDepartment: true,
    }
  },
  methods: {
    toggleText() {
      this.isTextVisible = !this.isTextVisible
    },
    async submitForm() {
      if (this.isLoading) return
      this.isLoading = true
      try {
        const requestData = {
          departmentName: this.form.departmentName,
          managerId: this.form.managerId,
        }

        const myToken = localStorage.getItem('authToken')

        const response = await axios.post(API_ENDPOINTS.departments, requestData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
        })

        console.log(response)
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: 'تم تسجيل القسم بنجاح!',
          showConfirmButton: false,
          timer: 1500
        });
        this.form.departmentName = ''
        this.form.managerId = ''

        this.fetchDepartments()
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء تسجيل القسم.'
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        });
      } finally {
        this.isLoading = false
      }
    },
    async fetchDepartments() {
      try {
        const myToken = localStorage.getItem('authToken')

        const response = await axios.get(API_ENDPOINTS.departments, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
        })
        this.departments = response.data.data.departments
        console.log(this.departments)
      } catch (error) {
        console.error('حدث خطأ أثناء جلب الأقسام:', error)
      }
    },
    toggleView() {
      this.isAddingDepartment = !this.isAddingDepartment
    },
  },
  mounted() {
    this.fetchDepartments()
  },
}
</script>
<style scoped>
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
