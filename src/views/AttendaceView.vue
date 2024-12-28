<template>
  <div class="h-screen overflow-hidden bg-white">
    <div class="md:w-full w-fit h-full overflow-scroll">
      <h1 class="mt-4 mb-10 ml-5 text-3xl font-bold px-8">جدول الحضور</h1>
      <div class="mt-4 w-full flex flex-row justify-between md:px-8 px-4 items-center">
        <div
          class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center mt-8 md:w-full w-fit">
          <font-awesome-icon class="w-4 h-4 absolute left-2 text-gray-500" :icon="['fas', 'magnifying-glass']" />
          <div @click="searchEmployee(sreach)" class="px-4 py-4 me-1 bg-blue-500 text-white cursor-pointer">
            بحث
          </div>
          <input v-model="sreach" type="text" name="search"
            class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
            placeholder="ادخل بيانات الموظف" />
          <div v-if="sreach.length > 0"
            class="absolute top-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-lg w-full z-10">
            <div v-for="(item, index) in response" :key="index"
              class="flex items-center justify-between py-2 px-3 border-b last:border-none hover:bg-gray-100 transition duration-150 ease-in-out">
              <div class="flex items-center space-x-3">
                <span class="font-semibold text-gray-700">{{ item.lastName }}</span>
                <span class="text-gray-500">{{ item.firstName }}</span>
                <span class="text-gray-500 px-2">{{ item.employeeId }}</span>
              </div>
              <button @click="registerEmployee(item.employeeId)" class="text-sm text-blue-500 hover:text-blue-900">
                تفاصيل
              </button>
            </div>
          </div>
        </div>
        <button @click="openPrint" class="px-4 py-4 my-auto bg-green-500 rounded-xl text-white cursor-pointer h-full">
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
        <div class="flex items-center space-x-4">
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
        </div>
      </div>
      <div class="lg:flex lg:h-full lg:flex-col md:p-8 p-4 ">
        <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col main-tabale">
          <!-- days of week -->
          <div
            class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
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
                <div class="relative px-3 py-2" :class="{
                  'bg-white': day.currentMonth,
                  'bg-gray-50 text-gray-500': !day.currentMonth,
                }">
                  <time :datetime="day.date" :class="{
                    'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white':
                      day.isToday,
                  }">
                    {{ day.day }}
                  </time>
                  <div v-if="day.checks.length > 0">
                    <p v-for="(check, index) in day.checks" :key="index" class="text-sm text-green-500 mt-1">
                      {{ check }} - بصمة
                    </p>
                  </div>
                  <div v-if="day.isOnLeave" class="text-sm text-red-500 font-bold mt-2">
                    قيد الإجازة
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
import Swal from 'sweetalert2'
export default {
  name: 'EmployeeCalendar',
  data() {
    return {
      ISOPEN: true,
      title: '',
      suject: '',
      yourDepartment: '',
      response: [],
      sreach: '',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      attendanceData: [],
      myToken: localStorage.getItem('authToken'),
      updatedMonthDays: [],
      leaves: [],
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
    openPrint() {
      this.ISOPEN = !this.ISOPEN;
    },
    printTable() {
      const calendar = document.querySelector('.main-tabale');
      const calendarHTML = calendar.outerHTML;

      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .main-tabale {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          border: 1px solid #ddd;
        }
        .grid > div {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }
        .bg-white {
          background-color: #ffffff;
        }
        .bg-gray-50 {
          background-color: #f9fafb;
        }
        .bg-gray-200 {
          background-color: #e5e7eb;
        }
        .text-gray-500 {
          color: #6b7280;
        }
        .text-red-500 {
          color: #ef4444;
        }
        .text-green-500 {
          color: #10b981;
        }
        time {
          display: block;
          font-size: 14px;
          font-weight: bold;
        }
        .rounded-full {
          border-radius: 50%;
        }
        .bg-indigo-600 {
          background-color: #4f46e5;
        }
        .text-white {
          color: #ffffff;
        }
          .container {
      width: 100%;
      margin: 0 auto;
    }
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
    .flexed {
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
    <div class="flexed">
      <div class="header" style="max-width: 100px;">
        <img src="0.png" alt="Logo">
      </div>
      <div class="flexed-col px-2">
        <h3 class="my-2">دولة ليبيا</h3>
        <h4 class="my-2">وزارة الصحة</h4>
        <h4 class="my-2">مستشفى غات العام</h4>
      </div>
    </div>

    <!-- Title Section -->
    <div class="flexed my-4">
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
      ${calendarHTML}
    </div>
    <div class="my-4 flex-col-end">
      <p style=" font-weight: bolder; margin-left:15px;" class="my-4">أعتماد رئيس القسم</p>
      <p>_________________</p>
    </div>
  </div>
    </body>
    </html>
  `);
      newWindow.document.close();
      newWindow.print();
    },
    async searchEmployee(sreach) {
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
    updateMonthDays() {
      this.updatedMonthDays = this.generateMonthDays(this.month, this.year)
    },
    async registerEmployee(empid) {
      try {
        const attendanceResult = await axios.get(`http://192.168.1.250:88/api/attendance/${empid}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.myToken}`,
          },
        })
        this.attendanceData = attendanceResult.data.data
        this.leaves = attendanceResult.data.leaves
        this.filterAttendace()
        this.sreach = ''
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء البحث عن الموظف.'
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    generateMonthDays(month, year) {
      const days = []
      const lastDay = new Date(year, month, 0).getDate()
      const firstDayOfMonth = new Date(year, month - 1, 1).getDay()
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push({
          date: null,
          day: null,
          currentMonth: false,
          isToday: false,
          checks: [],
          isOnLeave: false,
        })
      }
      for (let i = 1; i <= lastDay; i++) {
        const date = new Date(year, month - 1, i)
        days.push({
          date: date.toISOString().split('T')[0],
          day: i,
          currentMonth: true,
          isToday: date.toLocaleDateString() === new Date().toLocaleDateString(),
          checks: [],
          isOnLeave: false,
        })
      }
      return days
    },
    filterAttendace() {
      const mappedAttendance = this.attendanceData.reduce((acc, item) => {
        const adjustedDate = new Date(item.date)
        adjustedDate.setDate(adjustedDate.getDate() - 0)
        const dateKey = adjustedDate.toISOString().split('T')[0]

        acc[dateKey] = {
          checks: item.checks.map((check) => {
            const adjustedCheck = new Date(check)
            adjustedCheck.setDate(adjustedCheck.getDate() - 1)
            return adjustedCheck.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          }),
        }
        return acc
      }, {})

      const leaveDays = this.leaves.flatMap((leave) => {
        if (leave.startDate && leave.endDate) {
          const start = new Date(leave.startDate)
          const end = new Date(leave.endDate)
          const days = []
          while (start <= end) {
            days.push(new Date(start).toISOString().split('T')[0])
            start.setDate(start.getDate() + 1)
          }
          return days
        }
        return []
      })

      this.updatedMonthDays = this.updatedMonthDays.map((day) => {
        if (!day.date) {
          return { ...day, checks: [], isOnLeave: false }
        }
        const dayKey = day.date
        const attendanceInfo = mappedAttendance[dayKey]
        const isOnLeave = leaveDays.includes(dayKey)

        return {
          ...day,
          checks: attendanceInfo ? attendanceInfo.checks : [],
          isOnLeave,
        }
      })
    },
  },
  mounted() {
    this.updateMonthDays()
  },
}
</script>
