<template>
  <div class="h-screen overflow-hidden bg-white">
    <div class="md:w-full w-fit h-full overflow-scroll">
      <h1 class="mt-4 mb-10 ml-5 text-3xl font-bold px-8">جدول الحضور</h1>
      <div class="mt-4 w-full flex flex-row justify-between md:px-8 px-4 items-center">
        <div
          class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center mt-8 md:w-full w-fit"
        >
          <font-awesome-icon
            class="w-4 h-4 absolute left-2 text-gray-500"
            :icon="['fas', 'magnifying-glass']"
          />
          <div
            @click="searchEmployee(sreach)"
           @typing="searchEmployee(sreach)"
            class="px-4 py-4 me-1 bg-blue-500 text-white cursor-pointer"
          >
            بحث
          </div>
          <input
            v-model="sreach"
           @typing="searchEmployee(sreach)"
            type="text"
            name="search"
            class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
            placeholder="ادخل بيانات الموظف"
          />
          <div
            v-if="sreach.length > 0"
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
              <button @click="registerEmployee(item.employeeId)" class="text-sm text-blue-500 hover:text-blue-900">تفاصيل</button>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div>
            <label for="month" class="block text-sm font-medium text-gray-700">الشهر</label>
            <select
              id="month"
              v-model="month"
              @change="updateMonthDays"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>
          <div>
            <label for="year" class="block text-sm font-medium text-gray-700">السنة</label>
            <select
              id="year"
              v-model="year"
              @change="updateMonthDays"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option v-for="y in yearsRange" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="lg:flex lg:h-full lg:flex-col md:p-8 p-4">
        <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <!-- days of week -->
          <div
            class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none"
          >
          <div class="flex justify-center bg-white py-2">الأحد</div>
            <div class="flex justify-center bg-white py-2">الإثنين</div>
            <div class="flex justify-center bg-white py-2">الثلاثاء</div>
            <div class="flex justify-center bg-white py-2">الأربعاء</div>
            <div class="flex justify-center bg-white py-2">الخميس</div>
            <div class="flex justify-center bg-white py-2">الجمعة</div>
            <div class="flex justify-center bg-white py-2">السبت</div>
          </div>
          <!-- 30 days of the month -->
          <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div class="w-full grid grid-cols-7 lg:grid-rows-6 gap-px">
              <template v-for="day in updatedMonthDays" :key="day.date">
                <div
                  class="relative px-3 py-2"
                  :class="{
                    'bg-white': day.currentMonth,
                    'bg-gray-50 text-gray-500': !day.currentMonth,
                  }"
                >
                  <time
                    :datetime="day.date"
                    :class="{
                      'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white':
                        day.isToday,
                    }"
                  >
                    {{ day.day }}
                  </time>
                  <!-- عرض حالة الحضور هنا -->
                  <div v-if="day.checks.length > 0">
                    <p
                      v-for="(check, index) in day.checks"
                      :key="index"
                      class="text-sm text-gray-600"
                    >
                      {{ check }} - بصمة
                    </p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EmployeeCalendar',
  data() {
    return {
      response: [],
      sreach: '',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      attendanceData: [],
      myToken: localStorage.getItem('authToken'),
      updatedMonthDays: [],
      attedacedays: [],
    }
  },
  computed: {
    yearsRange() {
      const startYear = 2020;
      const endYear = 2100;
      return Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
    },
  },
  methods: {
    async searchEmployee(sreach) {
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
        alert(errorMessage)
      } finally {
        this.isLoading = false
      }
    },
    updateMonthDays() {
      this.updatedMonthDays = this.generateMonthDays(this.month, this.year)
    },
    async registerEmployee(empid) {
      try {
        const attendanceResult = await axios.get(
          `http://localhost:8000/api/attendance/${empid}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.myToken}`,
            },
          },
        )
        this.attendanceData = attendanceResult.data.data
        this.filterAttendace()
        this.sreach = ''
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء البحث عن الموظف.'
        alert(errorMessage)
      }
    },
    generateMonthDays(month, year) {
      const days = []
      const lastDay = new Date(year, month, 0).getDate() // استخدام 0 ليتم الحصول على آخر يوم في الشهر السابق
      const firstDayOfMonth = new Date(year, month - 1, 1).getDay() // إصلاح خطأ الحساب في الأيام

      // إضافة الفراغات في الأيام التي تسبق اليوم الأول من الشهر
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push({ date: null, day: null, currentMonth: false, isToday: false, checks: [] })
      }

      // إضافة أيام الشهر الفعلي
      for (let i = 1; i <= lastDay; i++) {
        const date = new Date(year, month - 1, i)
        days.push({
          date: date.toISOString().split('T')[0],
          day: i,
          currentMonth: true,
          isToday: date.toLocaleDateString() === new Date().toLocaleDateString(),
          events: [],
          checks: [],
        })
      }
      return days
    },
    filterAttendace() {
      const mappedAttendance = this.attendanceData.reduce((acc, item) => {
        // تعديل التاريخ لإنقاص يوم واحد
        const adjustedDate = new Date(item.date)
        adjustedDate.setDate(adjustedDate.getDate() - 0)
        const dateKey = adjustedDate.toISOString().split('T')[0] // تنسيق التاريخ لضمان التوافق

        acc[dateKey] = {
          checks: item.checks.map((check) => {
            const adjustedCheck = new Date(check)
            adjustedCheck.setDate(adjustedCheck.getDate() - 1)
            return adjustedCheck.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }),
        }
        return acc
      }, {})

      this.updatedMonthDays = this.updatedMonthDays.map((day) => {
        if (!day.date) {
          return { ...day, checks: [] }
        }
        const dayKey = day.date // لا نعدل اليوم الحالي نفسه، فقط نقارنه مع اليوم المخزن
        const attendanceInfo = mappedAttendance[dayKey]
        return {
          ...day,
          checks: attendanceInfo ? attendanceInfo.checks : [],
        }
      })
    },
  },
  mounted() {
    this.updateMonthDays()
    this.filterAttendace()
  },

  // computed: {
  //   // updatedMonthDays() {
  //   //   return this.generateMonthDays(this.month, this.year).map((day) => {
  //   //     const attendance = this.attendanceData.find((item) => {
  //   //       const date = new Date(item.lastAttendance)
  //   //       const dayDate = new Date(day.date)
  //   //       return (
  //   //         date.getFullYear() === dayDate.getFullYear() &&
  //   //         date.getMonth() === dayDate.getMonth() &&
  //   //         date.getDate() === dayDate.getDate()
  //   //       )
  //   //     })
  //   //     return {
  //   //       ...day,
  //   //       isPresent: attendance ? 'حاضر' : null,
  //   //     }
  //   //   })
  //   // },
  // },
}
</script>

<style>
/* أضف الأنماط هنا إذا لزم الأمر */
</style>
