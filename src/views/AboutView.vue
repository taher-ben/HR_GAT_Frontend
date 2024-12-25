<script setup>
import { useModalStore } from '@/stores/model'
// import { format } from "date-fns";
const modalStore = useModalStore()
</script>
<template>
  <div class="about w-full z-50 bg-gray-50 h-screen overflow-hidden">
    <div class="bg-white relative w-full h-full z-40">
      <div class="my-4 px-4 transition duration-75 ease-out hover:ease-in xl:h-full md:h:[50vh]" :class="{
        'blur-2xl': modalStore.isOpenEditProfile,
        'blur-none': !modalStore.isOpenEditProfile,
      }">
        <div class="mx-auto bt-10 max-w-screen-xl bg-white">
          <h1 class="mb-10 ml-5 text-3xl font-bold">البحث عن موضف</h1>
          <div class="bg-white py-2 px-3"></div>
        </div>
        <div class="bg-gray-50">
          <div class="mx-auto px-2 py-10">
            <div class="mt-4 w-full flex justify-between items-center">
              <div
                class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center mt-8 md:w-full w-fit">
                <font-awesome-icon class="w-4 h-4 absolute left-2 text-gray-500" :icon="['fas', 'magnifying-glass']" />
                <div @click="registerEmployee(sreach)" class="px-4 py-4 me-1 bg-blue-500 text-white cursor-pointer">
                  بحث
                </div>
                <input @keyup.enter="registerEmployee(search)" v-model="sreach" type="text" name="search"
                  class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
                  placeholder="ادخل بيانات الموظف" />
              </div>

              <button @click="getAllEmployees(sreach)"
                class="px-4 py-4 my-auto bg-blue-500 rounded-xl text-white cursor-pointer h-full">
                كل الموظفين
              </button>
            </div>
            <div class="mt-6 rounded-xl bg-white shadow h-full overflow-y-auto overflow-x-auto">
              <table class="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 px-4 py-2">الاسم</th>
                    <th class="border border-gray-300 px-3 py-2">الاسم الاوسط</th>
                    <th class="border border-gray-300 px-4 py-2">اللقب</th>
                    <th class="border border-gray-300 px-4 py-2">الرقم الوطني</th>
                    <th class="border border-gray-300 px-4 py-2">الجنس</th>
                    <th class="border border-gray-300 px-4 py-2">نوع التوظيف </th>
                    <th class="border border-gray-300 px-4 py-2">القسم </th>
                    <th class="border border-gray-300 px-4 py-2">الرقم الوظيفي</th>
                    <th class="border border-gray-300 px-4 py-2">تاريخ التوظيف</th>
                    <th class="border border-gray-300 px-4 py-2">العنوان</th>
                    <th class="border border-gray-300 px-4 py-2">تاريخ الميلاد</th>
                    <th class="border border-gray-300 px-4 py-2">الهاتف</th>
                    <th class="border border-gray-300 px-4 py-2">الراتب الشهري</th>
                    <th class="border border-gray-300 px-4 py-2">البريد الإلكتروني</th>
                    <th class="border border-gray-300 px-4 py-2">الإجراءات</th>
                  </tr>
                </thead>
                <tbody >
                  <tr  v-for="employee in response" :key="employee.id" class="hover:bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2">{{ employee.firstName }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.middleName }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.lastName }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.nationalId }}</td>
                    <td class="border border-gray-300 px-4 py-2" v-if="employee.gender === 'M'">
                      ذكر
                    </td>
                    <td class="border border-gray-300 px-4 py-2" v-else>انثى</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.contractType }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.department.departmentName }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.employeeId }}</td>
                    <td class="border border-gray-300 px-4 py-2">
                      {{ formatDate(employee.hireDate) }}
                    </td>

                    <td class="border border-gray-300 px-4 py-2">{{ employee.address }}</td>
                    <td class="border border-gray-300 px-4 py-2">
                      {{ formatDate(employee.dateOfBirth) }}
                    </td>

                    <td class="border border-gray-300 px-4 py-2">{{ employee.phone }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.salary }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.email }}</td>
                    <td
                    class="border border-gray-300 px-4 py-2">
                      <div class=" flex items-center">
                        <span @click="() => {
                          modalStore.toggleModalEditProfile()
                          selectEmployee(employee)
                        }
                          " class="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer">
                          تعديل
                        </span>

                        <span @click="deleteEmployee(employee.employeeId)"
                          class="bg-red-500 mx-1 text-white px-2 py-1 rounded cursor-pointer">
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
      <div class="flex overscroll-y-auto absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4"
        :class="[modalStore.isOpenEditProfile ? 'absolute' : 'hidden']">
        <div class="border overscroll-y-auto relative mx-4 bg-white rounded-lg shadow">
          <div
            class="absolute top-5 right-5 font-bold text-2xl text-white cursor-pointer bg-red-500 px-3 py-1 rounded-full"
            @click="modalStore.toggleModalEditProfile">
            x
          </div>
          <div class="flex flex-col items-center py-10 bg-white mx-4">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="../assets/person.png" alt="صورة الموظف" />

            <h5 v-if="selectedEmployee" class="mb-1 text-xl font-medium text-gray-900">
              {{ selectedEmployee.firstName }} {{ selectedEmployee.lastName }}
            </h5>
            <span class="text-sm text-gray-500">بيانات الموظف</span>
            <div class="grid gap-4 grid-cols-2 w-full px-4 mt-4 md:mt-6">
              <!-- Existing fields -->
              <div class="mb-3" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">الرقم الوظيفي</p>
                <input type="text" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.employeeId" />
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">الاسم الأول</p>
                <input type="text" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.firstName" />
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold"> اسم الأب</p>
                <input type="text" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.middleName" />
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">اسم العائلة</p>
                <input type="text" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.lastName" />
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">الجنس</p>
                <select class="border border-gray-300 rounded w-full p-2 mt-1" v-model="selectedEmployee.gender">
                  <option value="M">ذكر</option>
                  <option value="F">أنثى</option>
                </select>
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">تاريخ الميلاد</p>
                <input type="date" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.dateOfBirth" />
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">الرقم الوطني</p>
                <input type="text" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.nationalId" />
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">البريد الإلكتروني</p>
                <input type="email" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.email" />
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">العنوان</p>
                <input type="text" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.address" />
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">تاريخ التعيين</p>
                <input type="date" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.hireDate" />
              </div>
              <!-- ...; -->
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">تاريخ التعيين</p>
                <input type="date" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.hireDate" />
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">الهاتف</p>
                <input type="text" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.phone" />
              </div>

              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">نوع التوظيف</p>
                <select class="border border-gray-300 rounded w-full p-2 mt-1" v-model="selectedEmployee.contractType">
                  <option value="عقد">عقد</option>
                  <option value="تعين">تعين</option>
                </select>
              </div>
              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">القسم</p>
                <select class="border border-gray-300 rounded w-full p-2 mt-1" v-model="selectedEmployee.department">
                  <option v-for="(department, key) in departments" :key="key.departmentId"
                    :value="department.departmentId">
                    {{ department.departmentName }}
                  </option>
                </select>
              </div>

              <div class="mb-2" v-if="selectedEmployee">
                <p class="text-blue-500 font-bold">الراتب الشهري</p>
                <input type="number" class="border border-gray-300 rounded w-full p-2 mt-1"
                  v-model="selectedEmployee.salaryPeriod" />
              </div>

              <div class="my-auto mx-auto" v-if="selectedEmployee">
                <button @click="() => {
                  modalStore.toggleModalEditProfile()
                  updateEmployeeData()
                }
                  " class="px-4 py-4 bg-blue-500 mt-3 text-white rounded-md">
                  حفظ التعديل
                </button>
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
import { format } from 'date-fns'
import API_ENDPOINTS from '../stores/api'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      sreach: '',
      myToken: localStorage.getItem('authToken'),
      response: '',
      isLoading: false,
      selectedEmployee: null,
      departments: []
    }
  },
  methods: {
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
      } catch (error) {
        console.error('حدث خطأ أثناء جلب الأقسام:', error)
      }
    },
    formatDate(date) {
      return format(new Date(date), 'yyyy-MM-dd')
    },
    async getAllEmployees() {
      try {
        this.isLoading = true

        const result = await axios.get(`http://localhost:8000/api/employees`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.myToken}`,
          },
        })
        this.response = result.data.data
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء تسجيل الموظف.'
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
    async registerEmployee(sreach) {
      try {
        this.isLoading = true

        const result = await axios.post(
          'http://localhost:8000/api/employees/search',
          { name: sreach },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.myToken}`,
            },
          },
        )
        this.response = result.data.data
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء البحث عن الموظف.'
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
    selectEmployee(employee) {
      this.selectedEmployee = employee
    },
    async updateEmployeeData() {
      if (!this.selectedEmployee) {
        Swal.fire({
          position: "center-center",
          icon: "warning",
          title: 'الرجاء اختيار موظف لتحديث بياناته.',
          showConfirmButton: false,
          timer: 1500
        });
        return
      }

      try {
        this.isLoading = true

        const result = await axios.patch(
          `http://localhost:8000/api/employees/${this.selectedEmployee.employeeId}`,
          this.selectedEmployee,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.myToken}`,
            },
          },
        )
        result;
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: 'تم تحديث بيانات الموظف بنجاح',
          showConfirmButton: false,
          timer: 1500
        });
        this.modalStore.toggleModalEditProfile()
        this.getAllEmployees()
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء تحديث البيانات.'
        console.log(errorMessage)
      } finally {
        this.isLoading = false
      }
    },
    async deleteEmployee(employeeId) {
      if (!employeeId) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "الرجاء تحديد موظف لحذفه.",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      try {
        const result = await Swal.fire({
          title: "هل أنت متأكد؟",
          text: "لن تتمكن من استعادة بيانات هذا الموظف مرة أخرى!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "نعم، احذفه!",
          cancelButtonText: "إلغاء",
        });

        if (!result.isConfirmed) {
          return;
        }

        this.isLoading = true;

        await axios.delete(`http://localhost:8000/api/employees/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          },
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "تم حذف الموظف بنجاح.",
          showConfirmButton: false,
          timer: 1500,
        });

        this.getAllEmployees();
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "حدث خطأ أثناء حذف الموظف.";
        Swal.fire({
          position: "center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        this.isLoading = false;
      }
    }

  },
  mounted() {
    this.fetchDepartments()
  }
}
</script>
