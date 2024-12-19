<template>
  <div class="bg-white h-full">
    <div>
      <div class="ps-12">
        <h2 class="text-3xl font-bold mt-4 text-blue-500">بيانات الحضور والانصراف</h2>
      </div>
    </div>
    <div>
      <div class="mt-4 w-full flex justify-between items-center">
        <div
          class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center mt-8 md:w-full w-fit"
        >
          <font-awesome-icon
            class="w-4 h-4 absolute left-2 text-gray-500"
            :icon="['fas', 'magnifying-glass']"
          />
          <div
            @click="fetchAttendance(sreach)"
            class="px-4 py-4 me-1 bg-blue-500 text-white cursor-pointer"
          >
            بحث
          </div>
          <input
            @keyup.enter="fetchAttendance(sreach)"
            v-model="sreach"
            type="text"
            name="search"
            class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
            placeholder="ادخل بيانات الموظف"
          />
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

export default {
  data() {
    return {
      attendances: [],
      myToken: localStorage.getItem('authToken'),
      sreach: '',
    }
  },
  methods: {
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
    async fetchAttendance() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
            'Content-Type': 'application/json',
          },
        }

        const response = await axios.get(
          `http://localhost:8000/api/attendance/${this.sreach}`,
          config,
        )
        this.attendances = response.data.data
        console.log(this.attendances)
      } catch (error) {
        console.error('Error fetching attendance data:', error)
      }
    },
  },
  mounted() {
    // this.fetchAttendance();
  },
}
</script>
