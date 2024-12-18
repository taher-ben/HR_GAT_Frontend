<template>
  <div class="h-screen overflow-hidden bg-white">
    <div class="md:w-full w-fit h-full overflow-scroll">
      <h1 class="mt-4 mb-10 ml-5 text-3xl font-bold px-8">جدول الحضور</h1>
      <div class="mt-4 w-full flex justify-between items-center">
        <div
          class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center mt-8 md:w-full w-fit"
        >
          <font-awesome-icon
            class="w-4 h-4 absolute left-2 text-gray-500"
            :icon="['fas', 'magnifying-glass']"
          />
          <div
            @click="registerEmployee()"
            class="px-4 py-4 me-1 bg-blue-500 text-white cursor-pointer"
          >
            بحث
          </div>
          <input
            v-model="sreach"
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
              </div>
              <button class="text-sm text-blue-500 hover:text-blue-900">تفاصيل</button>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:flex lg:h-full lg:flex-col md:p-8 p-4">
        <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <!-- days of week -->
          <div
            class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none"
          >
            <div class="flex justify-center bg-white py-2">الإثنين</div>
            <div class="flex justify-center bg-white py-2">الثلاثاء</div>
            <div class="flex justify-center bg-white py-2">الأربعاء</div>
            <div class="flex justify-center bg-white py-2">الخميس</div>
            <div class="flex justify-center bg-white py-2">الجمعة</div>
            <div class="flex justify-center bg-white py-2">السبت</div>
            <div class="flex justify-center bg-white py-2">الأحد</div>
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
                  <p v-if="day.isPresent" class="text-sm font-medium text-green-500">
                    {{ day.isPresent }}

                  </p>
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
    month: 12, // الشهر الحالي
    year: 2024, // السنة الحالية
    attendanceData: [],
    myToken: localStorage.getItem('authToken'),
    updatedMonthDays: [],  // إضافة هذه الخاصية
    attedacedays:[]
  }
},
methods: {
  // طريقة لتحديث `updatedMonthDays` بناءً على الشهر والسنة الحالية
  updateMonthDays() {
    this.updatedMonthDays = this.generateMonthDays(this.month, this.year)
  },
  async registerEmployee() {
    try {
      const attendanceResult = await axios.get('http://localhost:8000/api/attendance/1', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.myToken}`,
        },
      })
      this.attendanceData = attendanceResult.data.data
      this.filterAttendace()  // تحديث بيانات الحضور بعد جلبها
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء البحث عن الموظف.'
      alert(errorMessage)
    }
  },
  // نفس دالة generateMonthDays كما هي
  generateMonthDays(month, year) {
    const days = []
    const lastDay = new Date(year, month, 0).getDate()
    const firstDayOfMonth = new Date(year, month - 1, 0).getDay()

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ date: null, day: null, currentMonth: false, isToday: false })
    }

    for (let i = 1; i <= lastDay; i++) {
      const date = new Date(year, month - 1, i)
      days.push({
        date: date.toISOString().split('T')[0],
        day: i,
        currentMonth: true,
        isToday: date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0],
        events: [],
      })
    }
    return days
  },
  // دالة لتصفية الحضور
  filterAttendace() {
    this.attendanceData
  },
},
mounted() {
  // عند تحميل المكون، نقوم بتحديث أيام الشهر
  this.updateMonthDays()
  this.filterAttendace()
}


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
