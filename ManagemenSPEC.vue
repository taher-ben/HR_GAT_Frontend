<template>
  <div class="bg-white md:h-screen w-full overscroll-none">
    <div
      class="flex justify-center p-1 md:h-full overscroll-none overflow-x-hidden overflow-scroll"
    >
      <VeeForm
        @submit="submitForm"
        :validation-schema="schema"
        class="border border-gray-100 space-y-3 w-[30rem] mx-auto my-auto rounded-md bg-white p-6 shadow-xl lg:p-10 flex flex-col gap-4"
      >
        <h1 class="mb-10 text-3xl font-bold text-center">تسجيل بيانات القسم</h1>

        <div>
          <label for="departmentId">رقم القسم</label>
          <VeeField
            name="departmentId"
            v-model="form.departmentId"
            type="text"
            placeholder="رقم القسم"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="departmentId" />
        </div>

        <div>
          <label for="departmentName">اسم القسم</label>
          <VeeField
            name="departmentName"
            v-model="form.departmentName"
            type="text"
            placeholder="اسم القسم"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="departmentName" />
        </div>

        <div>
          <label for="managerEmployeeId">رقم الموظف المدير</label>
          <VeeField
            name="managerEmployeeId"
            v-model="form.managerEmployeeId"
            type="text"
            placeholder="رقم الموظف المدير"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="managerEmployeeId" />
        </div>

        <div>
          <button
            type="submit"
            class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
          >
            تسجيل
          </button>
        </div>
      </VeeForm>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import API_ENDPOINTS from '../stores/api'
export default {
  data() {
    return {
      // النموذج الافتراضي للقيم
      form: {
        departmentId: '',
        departmentName: '',
        managerEmployeeId: '',
      },
      // القواعد الخاصة بالتحقق
      schema: {
        departmentId: 'required',
        departmentName: 'required',
        managerEmployeeId: 'required',
      },
    }
  },
  methods: {
    async submitForm() {
      if (this.isLoading) return

      this.isLoading = true

      const myToken = localStorage.getItem('authToken')
      if (!myToken) {
        alert('لم يتم العثور على رمز المصادقة. يرجى تسجيل الدخول.')
        this.isLoading = false
        return
      }

      try {
        const formData = new FormData()
        Object.keys(this.form).forEach((key) => {
          formData.append(key, this.form[key])
        })

        const response = await axios.post(API_ENDPOINTS.departments, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${myToken}`,
          },
        })

        alert('تم تسجيل القسم بنجاح!')
        // إعادة تعيين النموذج بعد التسجيل الناجح
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء تسجيل القسم.'
        alert(errorMessage)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
