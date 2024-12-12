<template>
  <div class="md:p-6 px-10 bg-white">
    <h1 class="mt-20 mb-10 ml-5 text-3xl font-bold">إحصائيات الموظفين</h1>

    <!-- أزرار التنقل -->
    <div dir="rtl" class="flex md:flex-row flex-col justify-center md:space-x-4 mb-6">
      <div>
        <select
          @change="activeChart = $event.target.value"
          class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-500 focus:outline-none my-2 mx-auto"
        >
          <option v-for="(chart, index) in chartTypes" :key="index" :value="chart.id">
            {{ chart.label }}
          </option>
        </select>
      </div>
      <div v-for="(chart, index) in chartTypes" :key="index">
        <button
          v-if="activeChart === chart.id"
          @click="activeChart = chart.id"
          class="px-4 py-2 rounded-lg text-white bg-blue-700 focus:outline-none my-1 mx-auto"
        >
          {{ chart.label }}
        </button>
      </div>
    </div>

    <!-- الرسومات البيانية -->
    <div class="md:w-full w-[30rem] h-full flex md:justify-center mx-auto">
      <div
        v-for="(chart, index) in chartTypes"
        :key="index"
        v-show="activeChart === chart.id"
        class="bg-white shadow-xl rounded-lg p-6 w-1/2"
      >
        <h2 class="text-xl font-semibold text-center mb-4">{{ chart.label }}</h2>
        <canvas class="w-full" :id="chart.canvasId"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'

export default {
  name: 'EmployeeStatistics',
  setup() {
    const activeChart = ref('employeeBarChart')
    const chartInstances = ref({})
    const chartData = ref({ departments: [], monthlyEvolution: [] })

    const chartTypes = [
      {
        id: 'employeeBarChart',
        label: 'عدد الموظفين حسب الأقسام',
        canvasId: 'employeeBarChart',
        createChart: createBarChart,
      },
      {
        id: 'employeeLineChart',
        label: 'النمو الشهري في التوظيف',
        canvasId: 'employeeLineChart',
        createChart: createLineChart,
      },
    ]

    async function fetchDepartmentsStats() {
      const { data } = await axios.get('/api/departments')
      chartData.value.departments = data.data
    }

    async function fetchMonthlyHireEvolution() {
      const { data } = await axios.get('/api/monthly-hire-evolution')
      chartData.value.monthlyEvolution = data.data
    }

    function createBarChart(ctx) {
      const labels = chartData.value.departments.map((dept) => dept.departmentName)
      const counts = chartData.value.departments.map((dept) => dept.count)

      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'عدد الموظفين',
              data: counts,
              backgroundColor: ['#4bc0c0', '#36a2eb', '#ff6384'],
              borderColor: ['#4bc0c0', '#36a2eb', '#ff6384'],
              borderWidth: 1,
            },
          ],
        },
        options: { responsive: true },
      })
    }

    function createLineChart(ctx) {
      const labels = chartData.value.monthlyEvolution.map((item) => `الشهر ${item.month}`)
      const counts = chartData.value.monthlyEvolution.map((item) => item.count)

      return new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'النمو الشهري في التوظيف',
              data: counts,
              backgroundColor: '#9966ff',
              borderColor: '#9966ff',
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: { responsive: true },
      })
    }

    onMounted(async () => {
      await Promise.all([fetchDepartmentsStats(), fetchMonthlyHireEvolution()])

      chartTypes.forEach(({ canvasId, createChart }) => {
        const ctx = document.getElementById(canvasId).getContext('2d')
        chartInstances.value[canvasId] = createChart(ctx)
      })
    })

    return {
      activeChart,
      chartTypes,
    }
  },
}
</script>

<style scoped>
button:focus {
  outline: none;
}
</style>
