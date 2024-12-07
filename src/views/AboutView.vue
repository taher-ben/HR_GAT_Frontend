<script setup></script>
<template>
  <div class="about w-full z-50 bg-gray-50">
    <div
      class="flex md:flex-row flex-col bg-white md:w-full w-screen h-screen overflow-y-scroll z-40"
    >
      <div class="md:w-10/12 w-full my-4 px-4">
        <div class="mx-auto max-w-screen-xl bg-white">
          <h1 class="mt-20 mb-10 ml-5 text-3xl font-bold">
            البحث عن موضف
          </h1>
          <div class="bg-white py-2 px-3"></div>
        </div>
        <div class="bg-gray-50">
          <div class="mx-auto px-2 py-10">
            <div class="mt-4 w-full">
              <div
                class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center mt-8 md:w-full w-fit"
              >
                <font-awesome-icon
                  class="w-4 h-4 absolute left-2 text-gray-500"
                  :icon="['fas', 'magnifying-glass']"
                />
                <div  @click="registerEmployee(sreach)" class="px-4 py-4 me-1 bg-blue-500 text-white">بحث</div>
                <input
                  v-model="sreach"
                  type="name"
                  name="search"
                  class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
                  placeholder="ادخل بيانات الموظف"
                />
            </div>
            </div>
            <div class="mt-6 rounded-xl bg-white shadow max-h-screen overflow-x-scroll">
              <table class="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 px-4 py-2">الاسم</th>
                    <th class="border border-gray-300 px-3 py-2">الاسم الاوسط</th>
                    <th class="border border-gray-300 px-4 py-2">اللقب</th>
                    <th class="border border-gray-300 px-4 py-2">الرقم الوطني</th>
                    <th class="border border-gray-300 px-4 py-2">الجنس</th>
                    <th class="border border-gray-300 px-4 py-2">الرقم الوظيفي</th>
                    <th class="border border-gray-300 px-4 py-2">تاريخ التوظيف</th>
                    <th class="border border-gray-300 px-4 py-2">العنوان</th>
                    <th class="border border-gray-300 px-4 py-2">تاريخ الميلاد</th>
                    <th class="border border-gray-300 px-4 py-2">الهاتف</th>
                    <th class="border border-gray-300 px-4 py-2">البريد الإلكتروني</th>
                    <th class="border border-gray-300 px-4 py-2">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="employee in response" :key="employee.id" class="hover:bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2">{{ employee.firstName }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.middleName }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.lastName }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.nationalId }}</td>
                    <td class="border border-gray-300 px-4 py-2" v-if="employee.gender === 'M'">
                      ذكر
                    </td>
                    <td class="border border-gray-300 px-4 py-2" v-else>انثى</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.employeeId }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.hireDate }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.address }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.dateOfBirth }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.phone }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.email }}</td>
                    <td class="border border-gray-300 px-4 py-2">
                      <div>
                        <span
                          @click="selectEmployee(employee)"
                          class="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          تعديل
                        </span>
                        <span class="bg-red-500 mx-1 text-white px-2 py-1 rounded cursor-pointer">
                          حذف
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-2/12 w-fit bg-gray-100 flex">
        <div class="border mx-4 bg-white my-auto rounded-lg shadow m-auto">
          <div class="flex flex-col items-center py-10 bg-white mx-4">
            <img
              class="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="../assets/person.png"
              alt="Bonnie image"
            />
            <h5 v-if="selectedEmployee" class="mb-1 text-xl font-medium text-gray-900">
              {{ selectedEmployee.firstName }} {{ selectedEmployee.lastName }}
            </h5>
            <span class="text-sm text-gray-500">بيانات الموظف</span>
            <div class="grid gap-4 grid-cols-2 w-full px-4 mt-4 md:mt-6">
              <div class="mb-3" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">الرقم الوظيفي</p>
                <p class="text-zinc-700 mt-1">{{ selectedEmployee.employeeId }}</p>
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">الاسم الأول واسم الاب</p>
                <p class="text-zinc-700 mt-1">
                  {{ selectedEmployee.firstName }} {{ selectedEmployee.middleName }}
                </p>
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">اسم العائلة</p>
                <p class="text-zinc-700 mt-1">{{ selectedEmployee.lastName }}</p>
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">الجنس</p>
                <p class="text-zinc-700 mt-1">
                  {{ selectedEmployee.gender === 'M' ? 'ذكر' : 'أنثى' }}
                </p>
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">تاريخ الميلاد</p>
                <p class="text-zinc-700 mt-1">{{ selectedEmployee.dateOfBirth }}</p>
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">الرقم الوطني</p>
                <p class="text-zinc-700 mt-1">{{ selectedEmployee.nationalId }}</p>
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">البريد الإلكتروني</p>
                <p class="text-zinc-700 mt-1">{{ selectedEmployee.email }}</p>
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">العنوان</p>
                <p class="text-zinc-700 mt-1">{{ selectedEmployee.address }}</p>
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">تاريخ التعيين</p>
                <p class="text-zinc-700 mt-1">{{ selectedEmployee.hireDate }}</p>
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">الهاتف</p>
                <p class="text-zinc-700 mt-1">{{ selectedEmployee.phone }}</p>
              </div>
              <div class="text-center" v-else>الرجاء اختيار موظف لتعديل بياناته.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// import API_ENDPOINTS from '../stores/api'
export default {
  data() {
    return {
      // sreach:'252',
      myToken: localStorage.getItem('authToken'),
      response: '',
      isLoading: false,
      selectedEmployee: null,
    }
  },
  methods: {
    async registerEmployee() {
      try {
        console.log(typeof(this.sreach))
        this.isLoading = true

        const result = await axios.get(`http://localhost:3000/api/employees`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.myToken}`,
          },
        })
        this.response = result.data.data
        console.log(this.response)
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء تسجيل الموظف.'
        alert(errorMessage)
      } finally {
        this.isLoading = false
      }
    },
    selectEmployee(employee) {
      this.selectedEmployee = employee
    },
  },
  // mounted() {
  //   this.registerEmployee()
  // },
}
</script>
