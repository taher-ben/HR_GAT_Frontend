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
        </div>
      </div>
      <div class="mt-6 rounded-xl bg-white shadow px-12 py-4 mx-3 max-h-screen overflow-x-scroll">
        <table class="w-full table-auto border-collapse border border-gray-300 main-tabale">
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
      ISOPEN: true,
      title: '',
      suject: '',
      yourDepartment: '',
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
    openPrint() {
      this.ISOPEN = !this.ISOPEN;
    },
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
          `http://192.168.1.250:88/api/attendance?date=${year}-${month}-${day}`,
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
          `http://192.168.1.250:88/api/attendance?month=${month}&year=${year}`,
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
  },
  mounted() {
    this.updateMonthDays();
  },
};
</script>
