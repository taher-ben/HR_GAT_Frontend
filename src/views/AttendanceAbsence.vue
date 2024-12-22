<template>
  <div class="bg-white h-full">
    <div>
      <div class="ps-12">
        <h2 class="text-3xl font-bold mt-4 text-blue-500">بيانات الحضور والانصراف</h2>
      </div>
    </div>
    <div>
      <div class="mt-4 w-full flex justify-between items-center">
        <!-- <div
          class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center mt-8 md:w-full w-fit"
        >
          <font-awesome-icon
            class="w-4 h-4 absolute left-2 text-gray-500"
            :icon="['fas', 'magnifying-glass']"
          />
          <div
            @click="searchEmployee(sreachAll)"
            @typing="searchEmployee(sreachAll)"
            class="px-4 py-4 me-1 bg-blue-500 text-white cursor-pointer"
          >
            بحث
          </div>
          <input
            @typing="searchEmployee(sreachAll)"
            v-model="sreachAll"
            type="text"
            name="search"
            class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
            placeholder="ادخل بيانات الموظف"
          />
          <div
            v-if="sreachAll.length > 1"
            class="absolute top-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-lg w-full z-10"
          >
            <div
              v-for="(item, index) in response"
              :key="index"
              class="flex items-center justify-between py-2 px-3 border-b last:border-none hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <div class="flex items-center space-x-3">
                <span class="font-semibold text-gray-700">{{ item.lastName }}</span>
                <span class="text-gray-500">{{ item.firstName }}</span>
                <span class="text-gray-500 px-2">{{ item.employeeId }}</span>
              </div>
              <button
                @click="fetchAttendance(item.employeeId)"
                class="text-sm text-blue-500 hover:text-blue-900"
              >
                أختيار
              </button>
            </div>
          </div>
        </div> -->
        <div class="flex items-center mx-12 space-x-4">
          <div>
            <label for="day" class="block text-sm font-medium text-gray-700">اليوم</label>
            <select id="day" v-model="day" @change="updateMonthDays"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option :value="day" disabled>0</option>
              <option v-for="d in days" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
          <div class="mx-2">
            <label for="month" class="block text-sm font-medium text-gray-700">الشهر</label>
            <select id="month" v-model="month" @change="updateMonthDays"
              class="mt-1 block w-full rounded-md border-gray-800 outline-black shadow-xl focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>
          <div>
            <label for="year" class="block text-sm font-medium text-gray-700">السنة</label>
            <select id="year" v-model="year" @change="updateMonthDays"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option v-for="y in yearsRange" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
          <div>
            <button v-if="day === 0" class="bg-blue-500 my-auto px-3 py-1 text-white rounded-md
            " @click="searchMonth(this.year, this.month)">
              بحث بتاريخ
            </button>
            <button v-else @click="searchDay(this.year, this.month, this.day)">
              بحث بتاريخ
            </button>
          </div>
        </div>
      </div>
      <div class="mt-6 rounded-xl bg-white shadow px-12 py-4 mx-3 max-h-screen overflow-x-scroll">
        <table class="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2">الاسم</th>
              <th class="border border-gray-300 px-4 py-2">اسم العائلة</th>
              <th class="border border-gray-300 px-4 py-2">الرقم الوظيفي</th>
              <th class="border border-gray-300 px-4 py-2">آخر حضور (تاريخ)</th>
              <th class="border border-gray-300 px-4 py-2">آخر حضور (ساعات)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(attendance, index) in attendances" :key="index" class="hover:bg-gray-50">
              <td class="border border-gray-300 px-4 py-2">{{ attendance.employee_firstName }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ attendance.employee_lastName }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ attendance.employee_employeeId }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <ul>
                  <li v-for="(check, idx) in attendance.checks" :key="idx">
                    {{ formatDate(check) }}
                  </li>
                </ul>
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <ul>
                  <li v-for="(check, idx) in attendance.checks" :key="idx">
                    {{ formatTime(check) }}
                  </li>
                </ul>
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
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      day: 0,
      days: [],
      attendances: [],
      myToken: localStorage.getItem('authToken'),
      sreach: '',
      sreachAll: '',
    }
  },
  computed: {
    yearsRange() {
      const startYear = 2020
      const endYear = 2100
      return Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index)
    },
  },
  methods: {
    updateMonthDays() {
      const daysInMonth = new Date(this.year, this.month, 0).getDate()
      this.days = Array.from({ length: daysInMonth }, (_, index) => index + 1)
    },
    async searchDay(year, month, day) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
            'Content-Type': 'application/json',
          },
        }

        const response = await axios.get(
          `http://localhost:8000/api/attendance?date=${year}-${month}-${day}`,
          config, {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          }
        }
        )
        this.attendances = response.data.data
        this.sreachAll = ''
      } catch (error) {
        console.error('Error fetching attendance data:', error)
      }
    },
    async searchMonth(year, month) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
            'Content-Type': 'application/json',
          },
        }

        const response = await axios.get(
          `http://localhost:8000/api/attendance?month=${month}&year=${year}`,
          config, {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          }
        }
        )
        this.attendances = response.data.data
        this.sreachAll = ''
      } catch (error) {
        console.error('Error fetching attendance data:', error)
      }
    },
    async searchEmployee(sreachAll) {
      try {
        this.isLoading = true

        const result = await axios.post(
          'http://localhost:8000/api/employees/search',
          { name: sreachAll },
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
    formatDate(date) {
      if (date) {
        return format(new Date(date), 'yyyy-MM-dd')
      }
      return ''
    },
    formatTime(date) {
      if (date) {
        return format(new Date(date), 'hh:mm:ss a')
      }
      return ''
    },
    async fetchAttendance(id) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
            'Content-Type': 'application/json',
          },
        }

        const response = await axios.get(`http://localhost:8000/api/attendance/${id}`, config, {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          }
        })
        this.attendances = response.data.data
        this.sreachAll = ''
      } catch (error) {
        console.error('Error fetching attendance data:', error)
      }
    },
  },
  watch: {
    month() {
      this.updateMonthDays()
    },
    year() {
      this.updateMonthDays()
    },
  },
  mounted() {
    this.updateMonthDays()
  },
}
</script>
