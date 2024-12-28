<script setup>
import { useModalStore } from '@/stores/model'
// import { format } from "date-fns";
const modalStore = useModalStore()
</script>
<template>
  <div class="about w-full z-50 bg-gray-50 h-screen overflow-hidden">
    <div class="bg-white overflow-auto relative w-full h-full z-40">
      <div class="my-4 px-4  transition duration-75 ease-out hover:ease-in xl:h-full md:h:[70vh]" :class="{
        'blur-2xl': modalStore.isOpenEditProfile,
        'blur-none': !modalStore.isOpenEditProfile,
      }">
        <div class="mx-auto bt-10 max-w-screen-xl bg-white">
          <h1 class="mb-10 ml-5 text-3xl font-bold">البحث عن موضف</h1>
          <div class="bg-white py-2 px-3"></div>
        </div>
        <div class=" w-[95%]">
          <div class="mx-auto px-2 py-10 overflow-auto">
            <div class="mt-4 w-full flex justify-between items-center">
              <div
                class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center mt-8 md:w-full w-fit">
                <font-awesome-icon class="w-4 h-4 absolute left-2 text-gray-500" :icon="['fas', 'magnifying-glass']" />
                <div @click="registerEmployee(sreach)" class="px-4 py-4 me-1 bg-blue-500 text-white cursor-pointer">
                  بحث
                </div>
                <input v-model="sreach" type="text" name="search"
                  class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
                  placeholder="ادخل بيانات الموظف" />
              </div>

              <div class="flex gap-4">
                <button @click="getAllEmployees(sreach)"
                  class="px-4 py-4 my-auto bg-blue-500 rounded-xl text-white cursor-pointer h-full">
                  كل الموظفين
                </button>
                <button @click="openPrint"
                  class="px-4 py-4 my-auto bg-green-500 rounded-xl text-white cursor-pointer h-full">
                  أعداد النصوص لي الطباعة
                </button>
                <div :class="ISOPEN ? 'hidden' : 'absolute'"
                  class=" print z-20 w-[40vh]  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-slate-50 py-8 px-6 rounded-md shadow-sm flex flex-col">
                  <div>
                    <h4 class="mb-6 font-bold">العنوان الاول </h4>
                    <input v-model="title" type="text" class="mb-3 w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium
              text-zinc-950 focus:outline-none focus:ring-sky-600 focus:ring-1">
                  </div>
                  <div>
                    <h4 class="mb-6 font-bold">العنوان الثاني </h4>
                    <input v-model="suject" type="text" class="mb-3 w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium
              text-zinc-950 focus:outline-none focus:ring-sky-600 focus:ring-1">
                  </div>
                  <div>
                    <h4 class="mb-6 font-bold">النص الرئيسي </h4>
                    <textarea v-model="paragraph" type="text" class="mb-3 w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium
            text-zinc-950 focus:outline-none focus:ring-sky-600 focus:ring-1"></textarea>
                  </div>
                  <div>
                    <h4 class="mb-6 font-bold"> أعتماد القسم </h4>
                    <input v-model="yourDepartment" type="text" class="mb-3 w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium
            text-zinc-950 focus:outline-none focus:ring-sky-600 focus:ring-1">
                  </div>
                  <div>
                    <div @click="openPrint">
                      <button @click="printTable"
                        class="px-4 py-4 my-auto bg-green-500 rounded-xl text-white cursor-pointer h-full">
                        طباعة
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-6 rounded-xl bg-white shadow h-full overflow-y-auto overflow-x-auto">
              <table class="w-full table-auto border-collapse border border-gray-300 main-tabale">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 px-4 py-2">الاسم</th>
                    <th class="border border-gray-300 px-3 py-2">الاسم الاوسط</th>
                    <th class="border border-gray-300 px-4 py-2">اللقب</th>
                    <th class="border border-gray-300 px-4 py-2">الرقم الوطني</th>
                    <th class="border border-gray-300 px-4 py-2">الجنس</th>
                    <th class="border border-gray-300 px-4 py-2">نوع التوظيف </th>
                    <th class="border border-gray-300 px-4 py-2">القسم </th>
                    <th class="border border-gray-300 px-4 py-2">رقم تعريف البصمة</th>
                    <th class="border border-gray-300 px-4 py-2">تاريخ التوظيف</th>
                    <th class="border border-gray-300 px-4 py-2">العنوان</th>
                    <th class="border border-gray-300 px-4 py-2">تاريخ الميلاد</th>
                    <th class="border border-gray-300 px-4 py-2">الهاتف</th>
                    <!-- <th class="border border-gray-300 px-4 py-2">شهري أو سنوي</th> -->
                    <th class="border border-gray-300 px-4 py-2">الراتب الشهري</th>
                    <th class="border border-gray-300 px-4 py-2">البريد الإلكتروني</th>
                    <th class="border bootmes border-gray-300 px-4 py-2">الإجراءات</th>
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
                    <td class="border border-gray-300 px-4 py-2">{{ employee.contractType }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.department.departmentName || 'غير محدد' }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.employeeId }}</td>
                    <td class="border border-gray-300 px-4 py-2">
                      {{ formatDate(employee.hireDate) }}
                    </td>

                    <td class="border border-gray-300 px-4 py-2">{{ employee.address }}</td>
                    <td class="border border-gray-300 px-4 py-2">
                      {{ formatDate(employee.dateOfBirth) }}
                    </td>

                    <td class="border border-gray-300 px-4 py-2">{{ employee.phone }}</td>
                    <!-- <td class="border border-gray-300 px-4 py-2">{{ employee.salaryPeriod }}</td> -->
                    <td class="border border-gray-300 px-4 py-2">{{ employee.salary }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ employee.email }}</td>
                    <td class="border bootmes border-gray-300 px-4 py-2">
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
      <div class="flex  absolute top-3/4 left-2/4 -translate-y-2/4 -translate-x-2/4"
        :class="[modalStore.isOpenEditProfile ? 'absolute' : 'hidden']">
        <div class="border relative mx-4 bg-white rounded-lg shadow">
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
                <p class="text-blue-500 font-bold">رقم تعريف البصمة</p>
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
      ISOPEN: true,
      title: '',
      suject: '',
      yourDepartment: '',
      sreach: '',
      myToken: localStorage.getItem('authToken'),
      response: '',
      isLoading: false,
      selectedEmployee: null,
      departments: []
    }
  },
  methods: {
    openPrint() {
      this.ISOPEN = !this.ISOPEN;
    },
    printTable() {
      const table = document.querySelector('.main-tabale');
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      padding: 10px 20px;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    .container {
      width: 100%;
      margin: 0 auto;
    }
    .mx-auto {
      margin-right: auto;
      margin-left: auto;
    }
    .my-2 {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .my-4 {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .py-2 {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .px-2 {
      padding-left: 10px;
      padding-right: 10px;
    }
    .flex-col {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .flex-col-end {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .flex {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    h3, h4 {
      margin: 5px 0;
    }
    .content {
      margin: 10px 15px;
      text-align: justify;
      text-justify: inter-word;
    }
    .header {
      max-width: 100%;
    }
    .header img {
      width: 100%;
    }
    .title {
      font-size: x-large;
      padding: 0 2px;
    }
    .subject {
      font-size: large;
      margin-bottom: 30px;
    }
   .bootmes{
      display: none;
      }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Section -->
    <div class="flex">
      <div class="header" style="max-width: 100px;">
        <img src="0.png" alt="Logo">
      </div>
      <div class="flex-col px-2">
        <h3 class="my-2">دولة ليبيا</h3>
        <h4 class="my-2">وزارة الصحة</h4>
        <h4 class="my-2">مستشفى غات العام</h4>
      </div>
    </div>

    <!-- Title Section -->
    <div class="flex my-4">
      <div class="mx-auto">
        <h3 class="title">${this.title}</h3>
      </div>
    </div>

    <!-- Subject Section -->
    <div class="subject my-4">
      ${this.suject}
    </div>

    <!-- Content Section -->
    <div class="content">
      <p>${this.paragraph}</p>
    </div>

    <!-- Table Section -->
    <div class="my-4">
      ${table.outerHTML}
    </div>
    <div class="my-4 flex-col-end">
      <p style=" font-weight: bolder; margin-left:15px;" class="my-4">${this.yourDepartment}</p>
      <p>_________________</p>
    </div>
  </div>
</body>
</html>
  `);
      newWindow.document.close();
      newWindow.print();
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

        const result = await axios.get(`http://192.168.1.250:88/api/employees`, {
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
          'http://192.168.1.250:88/api/employees/search',
          { name: sreach },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.myToken}`,
            },
          },
        )
        this.response = result.data.data
        console.log(this.response);
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
          `http://192.168.1.250:88/api/employees/${this.selectedEmployee.employeeId}`,
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

        await axios.delete(`http://192.168.1.250:88/api/employees/${employeeId}`, {
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
