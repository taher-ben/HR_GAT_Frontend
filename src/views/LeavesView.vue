<template>
  <div class="bg-white md:h-screen w-full overscroll-none">
    <div
      class="flex justify-center flex-col md:h-full overscroll-none overflow-x-hidden overflow-scroll mx-auto my-auto rounded-md p-6 shadow-xl">
      <div v-if="toggleIsOpen === false">
        <h1 class="mb-10 ml-5 mx-8 text-3xl font-bold col-span-2">تسجيل تفاصيل الإجازة</h1>
        <div class="flex justify-around items-center">
          <div
            class="relative mx-8 bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center my-8 md:w-full w-fit">
            <font-awesome-icon class="w-4 h-4 absolute left-2 text-gray-500" :icon="['fas', 'magnifying-glass']" />
            <div @click="searchEmployee(sreach)" class="px-4 py-4 me-1 bg-blue-500 text-white cursor-pointer">
              بحث
            </div>
            <input v-model="sreach" type="text" name="search"
              class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
              placeholder="ادخل بيانات الموظف" />
            <div v-if="searchResult.length > 0"
              class="absolute top-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-lg w-full z-10">
              <div v-for="(item, index) in searchResult" :key="index"
                class="flex items-center justify-between py-2 px-3 border-b last:border-none hover:bg-gray-100 transition duration-150 ease-in-out">
                <div class="flex items-center space-x-3">
                  <span class="font-semibold text-gray-700">{{ item.lastName }}</span>
                  <span class="text-gray-500 px-2">{{ item.firstName }}</span>
                  <span class="text-gray-500 px-2">{{ item.employeeId }}</span>
                </div>
                <button @click="addId(item.employeeId)" class="text-sm text-blue-500 hover:text-blue-900">
                  أختيار
                </button>
              </div>
            </div>
          </div>
          <div
            class="px-2 py-4 font-bold bg-blue-500 w-fit text-white my-2 cursor-pointer rounded-xl hover:bg-white hover:border-blue-500 hover:border hover:text-blue-500"
            @click="showEdite()">
            <div>أطلاع على الإجازات</div>
          </div>
        </div>
        <VeeForm @submit="submitForm" :validation-schema="schema"
          class="border border-gray-100 space-y-3 lg:p-10 md:grid md:grid-cols-2 flex flex-col gap-4">
          <div>
            <label>نوع الإجازة</label>
            <VeeField name="type" v-model="form.type" as="select"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2">
              <option value="" disabled>اختر نوع الإجازة</option>
              <option value="annual">سنوية</option>
              <option value="sick">مرضية</option>
              <option value="unpaid">بدون راتب</option>
              <option value="maternity">أمومة</option>
              <option value="paternity">أبوة</option>
              <option value="bereavement">وفاة أحد الأقارب</option>
              <option value="education">دراسية</option>
              <option value="emergency">طارئة</option>
              <option value="marriage">زواج</option>
              <option value="hajj">الحج</option>
              <option value="relocation">انتقال سكن</option>
              <option value="personal">شخصية</option>
              <option value="family">عائلية</option>
              <option value="quarantine">حجر صحي</option>
              <option value="sabbatical">استراحة</option>
              <option value="else">أخرى</option>
            </VeeField>
            <ErrorMessage class="text-red-600" name="type" />
          </div>

          <div>
            <label>تاريخ البداية</label>
            <VeeField name="startDate" v-model="form.startDate" type="date"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
            <ErrorMessage class="text-red-600" name="startDate" />
          </div>
          <div>
            <label>تاريخ النهاية</label>
            <VeeField name="endDate" v-model="form.endDate" type="date"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
            <ErrorMessage class="text-red-600" name="endDate" />
          </div>
          <div>
            <label>رقم تعريف البصمة للموظف</label>
            <VeeField name="employeeId" v-model="form.employeeId" type="text" placeholder="12345"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
            <ErrorMessage class="text-red-600" name="employeeId" />
          </div>
          <div class="col-span-2">
            <label>السبب</label>
            <VeeField name="reason" v-model="form.reason" as="textarea" placeholder="أدخل سبب الإجازة"
              class="mt-2 w-full h-24 rounded-md bg-gray-100 px-3 py-2 focus:outline-none focus:ring-sky-600 focus:ring-2" />
            <ErrorMessage class="text-red-600" name="reason" />
          </div>
          <div class="col-span-2 flex items-center">
            <button v-if="edite === false" type="submit"
              class="rounded-md bg-blue-600 p-2 w-fit text-center font-semibold text-white hover:bg-white hover:text-blue-500 border hover:border-blue-500 transition duration-150 ease-in-out">
              تسجيل
            </button>
            <button v-else type="submit"
              class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white hover:bg-white hover:text-blue-500 border hover:border-blue-500 transition duration-150 ease-in-out">
              تعديل
            </button>
            <button @click="emptyData" type="button" class="bg-gray-500 mx-4 text-white my-autoS px-4 py-2 rounded">
              إلغاء
            </button>
          </div>
        </VeeForm>
      </div>

      <div v-else class="border border-gray-100 space-y-3 lg:p-10">
        <div class="text-xl mx-8">ادخل اسم الموظف</div>
        <div class="flex justify-between items-center">
          <div
            class="relative mx-8 bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center my-8 md:w-full w-fit">
            <font-awesome-icon class="w-4 h-4 absolute left-2 text-gray-500" :icon="['fas', 'magnifying-glass']" />
            <div @click="applyFilter" class="px-4 py-4 me-1 bg-blue-500 text-white cursor-pointer">
              بحث
            </div>
            <input v-model="filterCriteria.name" type="text" name="search"
              class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
              placeholder="ادخل اسم الموظف" />
            <div v-if="searchByType.length > 1"
              class="absolute top-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-lg w-full z-10">
              <div v-for="(item, index) in response" :key="index"
                class="flex items-center justify-between py-2 px-3 border-b last:border-none hover:bg-gray-100 transition duration-150 ease-in-out">
                <div class="flex items-center space-x-3">
                  <span class="font-semibold text-gray-700">{{ item.lastName }}</span>
                  <span class="text-gray-500">{{ item.firstName }}</span>
                  <span class="text-gray-500 px-2">{{ item.employeeId }}</span>
                </div>
                <button @click="addId(item.employeeId)" class="text-sm text-blue-500 hover:text-blue-900">
                  أختيار
                </button>
              </div>
            </div>
          </div>
          <div class="flex gap-4">
            <div
              class="px-2 py-4 bg-blue-500 font-bold w-fit text-white my-2 cursor-pointer rounded-xl hover:bg-white hover:border-blue-500 hover:border hover:text-blue-500"
              @click="showEdite()">
              <div>تسجيل إجازة جديدة</div>
            </div>
            <button @click="printTable"
              class="px-4 py-4 my-auto bg-green-500 rounded-xl text-white cursor-pointer h-full">
              طباعة
            </button>
          </div>
        </div>
        <div class="flex items-start">
          <select v-model="selectedType" @change="fetchByType(selectedType)"
            class="h-12 w-fit mx-8 border-gray-700 bg-gray-200 px-2 py-4 pl-3 text-sm">
            <option value="" disabled>اختر نوع الإجازة</option>
            <option v-for="(translation, key) in leaveTypeTranslations" :value="key" :key="key">
              {{ translation }}
            </option>
          </select>
          <div class="px-3 py-2 my-auto bg-blue-500 text-white cursor-pointer" @click="fetchLeaves()">
            الكل
          </div>
        </div>
        <table class="table-auto w-full border-collapse border border-gray-200 main-tabale">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2">#</th>
              <th class="border px-4 py-2">رقم الاجازة</th>
              <th class="border px-4 py-2">نوع الإجازة</th>
              <th class="border px-4 py-2">تاريخ البداية</th>
              <th class="border px-4 py-2">تاريخ النهاية</th>
              <th class="border px-4 py-2">اسم الموظف</th>
              <th class="border px-4 py-2">الحالة</th>
              <th class="border px-4 py-2 bootmes">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(leave, index) in leaves" :key="leave.leaveId">
              <td class="border px-4 py-2">{{ index + 1 }}</td>
              <td class="border px-4 py-2">{{ leave.leaveId }}</td>
              <td class="border px-4 py-2">
                {{ leaveTypeTranslations[leave.type] || leave.type }}
              </td>
              <td class="border px-4 py-2">{{ formatDate(leave.startDate) }}</td>
              <td class="border px-4 py-2">{{ formatDate(leave.endDate) }}</td>
              <td class="border px-4 py-2">
                {{ leave.employee.firstName }} {{ leave.employee.lastName }}
              </td>
              <td class="border px-4 py-2">قيد الاجازة</td>
              <td class="border px-4 py-2 bootmes">
                <button @click="editLeave(leave)" class="text-blue-600 hover:underline">
                  تعديل
                </button>
                <button @click="deleteLeave(leave.leaveId)" class="text-red-600 hover:underline ml-2">
                  حذف
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { format } from 'date-fns'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      searchResult: [],
      selectedType: '',
      searchByType: '',
      leaves: [],
      edite: false,
      toggleIsOpen: false,
      schema: {
        reason: 'required',
        employeeId: 'required',
        startDate: 'required',
        endDate: 'required',
        type: 'required',
      },
      form: {
        reason: '',
        type: '',
        startDate: '',
        endDate: '',
        employeeId: '',
      },
      leaveTypeTranslations: {
        annual: 'سنوية',
        sick: 'مرضية',
        unpaid: 'بدون راتب',
        maternity: 'أمومة',
        paternity: 'أبوة',
        bereavement: 'وفاة أحد الأقارب',
        education: 'دراسية',
        emergency: 'طارئة',
        marriage: 'زواج',
        hajj: 'الحج',
        relocation: 'انتقال سكن',
        personal: 'شخصية',
        family: 'عائلية',
        quarantine: 'حجر صحي',
        sabbatical: 'استراحة',
        else: 'أخرى',
      },
      sreach: '',
      filterCriteria: {
        type: '',
        name: '',
      },
      filteredLeaves: [],
      myToken: localStorage.getItem('authToken'),
    }
  },
  methods: {
    printTable() {
      const table = document.querySelector('.main-tabale');
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
      <html>
      <head>
        <title>طباعة الجدول</title>
        <style>
        .bootmes{
        display: none;
        }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        ${table.outerHTML}
      </body>
      </html>
    `);
      newWindow.document.close(); // إغلاق المستند لبدء الطباعة
      newWindow.print(); // أمر الطباعة
    },
    formatDate(date) {
      if (date) {
        return format(new Date(date), 'yyyy-MM-dd')
      }
      return ''
    },
    showEdite() {
      this.toggleIsOpen = !this.toggleIsOpen
    },
    addId(id) {
      this.form.employeeId = id
      console.log(this.form.employeeId)
    },
    async searchEmployee(x) {
      try {
        this.isLoading = true;
        await new Promise((resolve) => setTimeout(resolve, 500));

        const result = await axios.post(
          'http://localhost:88/api/employees/search',
          { name: x },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.myToken}`,
            },
          }
        );
        this.searchResult = result.data.data;
        console.log(this.searchResult);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء البحث عن الموظف.';
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        this.isLoading = false;
      }
    },
    async fetchLeaves() {
      try {
        const result = await axios.get('http://localhost:88/api/leaves', {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          },
        })
        this.leaves = result.data.data.leaves.reverse()
        this.filteredLeaves = this.leaves
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء جلب الإجازات.'
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    applyFilter() {
      console.log(this.filteredLeaves)

      // Apply filter conditions to leaves
      this.filteredLeaves = this.leaves.filter((leave) => {
        // دمج الاسم الأول واللقب للبحث بشكل موحد
        const fullName = (leave.employee.firstName + ' ' + leave.employee.lastName).toLowerCase()

        // التحقق مما إذا كان الاسم الكامل يتوافق مع قيمة البحث
        const isNameMatch = this.filterCriteria.name
          ? fullName.includes(this.filterCriteria.name.toLowerCase())
          : true

        // إضافة المزيد من الشروط هنا إذا لزم الأمر
        const isLeaveTypeMatch = this.filterCriteria.type
          ? leave.type.toLowerCase().includes(this.filterCriteria.type.toLowerCase())
          : true

        // الجمع بين جميع الشروط
        return isNameMatch && isLeaveTypeMatch
      })

      // تحديث البيانات بعد تطبيق الفلترة
      this.leaves = this.filteredLeaves
    },
    async fetchByType(type) {
      try {
        const result = await axios.get(`http://localhost:88/api/leaves?type=${type}`, {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          },
        })
        this.leaves = result.data.data.leaves.reverse()
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء جلب الإجازات.'
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    async typeSearch(searchByType) {
      try {
        const result = await axios.get(`http://localhost:88/api/leaves?type=${searchByType}`, {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          },
        })
        this.leaves = result.data.data.leaves.reverse()
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء جلب الإجازات.'
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    async submitForm() {
      try {
        const result = await axios.post('http://localhost:88/api/leaves', this.form, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.myToken}`,
          },
        })
        result;
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: 'تم إضافة الإجازة بنجاح.',
          showConfirmButton: false,
          timer: 1500
        });
        this.fetchLeaves()
        this.emptyData()
      } catch (error) {
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: 'حدث خطأ أثناء إضافة الإجازة.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(error);
      }
    },
    async deleteLeave(leaveId) {
      try {
        const result = await Swal.fire({
          title: "هل أنت متأكد؟",
          text: "لن تتمكن من استعادة هذه الإجازة مرة أخرى!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "نعم، احذفها!",
          cancelButtonText: "إلغاء",
        });

        if (result.isConfirmed) {
          // إذا تم تأكيد الحذف
          await axios.delete(`http://localhost:88/api/leaves/${leaveId}`, {
            headers: {
              Authorization: `Bearer ${this.myToken}`,
            },
          });

          // عرض رسالة نجاح
          Swal.fire({
            title: "تم الحذف!",
            text: "تم حذف الإجازة بنجاح.",
            icon: "success",
          });

          // تحديث القائمة بعد الحذف
          this.fetchLeaves();
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "خطأ!",
          text: "حدث خطأ أثناء محاولة حذف الإجازة.",
          icon: "error",
        });
      }
    },
    editLeave(record) {
      this.form = { ...record }
      this.showEdite()
      this.edite = true
      this.sreach = record.employee.employeeId
      this.form.employeeId = record.employee.employeeId
    },
    emptyData() {
      this.form = {
        reason: '',
        type: '',
        startDate: '',
        endDate: '',
        employeeId: '',
      }
    },
  },
  mounted() {
    this.fetchLeaves()
  },
}
</script>
