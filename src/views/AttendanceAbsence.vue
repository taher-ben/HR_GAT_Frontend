<template>
  <div class="bg-white h-full">
    <div>
      <div class="ps-12">
        <h2 class="text-3xl font-bold mt-4 text-blue-500">بيانات الحضور والانصراف</h2>
      </div>
    </div>
    <div>
      <div class="mt-4 w-full flex justify-between items-center">
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
            <button v-if="day === 0" class="bg-blue-500 my-auto px-3 py-1 text-white rounded-md"
              @click="searchMonth(this.year, this.month)">
              بحث بتاريخ
            </button>
            <button v-else @click="searchDay(this.year, this.month, this.day)">
              بحث بتاريخ
            </button>
          </div>
        </div>
        <div>
          <button
            class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-200"
            @click="printTable"
          >
            طباعة الجدول
          </button>
        </div>
      </div>
      <div class="mt-6 rounded-xl bg-white shadow px-12 py-4 mx-3 max-h-screen overflow-x-scroll">
        <table class="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2">الاسم</th>
              <th class="border border-gray-300 px-4 py-2">اسم العائلة</th>
              <th class="border border-gray-300 px-4 py-2">رقم تعريف البصمة</th>
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
import axios from "axios";
import { format } from "date-fns";

export default {
  data() {
    return {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      day: 0,
      days: [],
      attendances: [],
      myToken: localStorage.getItem("authToken"),
    };
  },
  computed: {
    yearsRange() {
      const startYear = 2020;
      const endYear = 2100;
      return Array.from(
        { length: endYear - startYear + 1 },
        (_, index) => startYear + index
      );
    },
  },
  methods: {
    updateMonthDays() {
      const daysInMonth = new Date(this.year, this.month, 0).getDate();
      this.days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    },
    async searchDay(year, month, day) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          },
        };

        const response = await axios.get(
          `http://localhost:88/api/attendance?date=${year}-${month}-${day}`,
          config
        );
        this.attendances = response.data.data;
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    },
    async searchMonth(year, month) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          },
        };

        const response = await axios.get(
          `http://localhost:88/api/attendance?month=${month}&year=${year}`,
          config
        );
        this.attendances = response.data.data;
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    },
    formatDate(date) {
      return date ? format(new Date(date), "yyyy-MM-dd") : "";
    },
    formatTime(date) {
      return date ? format(new Date(date), "hh:mm:ss a") : "";
    },
    printTable() {
      const printContent = document.querySelector("table").outerHTML;
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>طباعة الجدول</title>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 16px;
                text-align: left;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
              }
              th {
                background-color: #f4f4f4;
                color: #333;
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    },
  },
  mounted() {
    this.updateMonthDays();
  },
};
</script>
