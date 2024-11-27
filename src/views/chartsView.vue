<template>
  <div class="p-6 w-screen bg-white">
    <h1 class="text-2xl font-bold text-center mb-6">إحصائيات الموظفين</h1>

    <!-- أزرار التنقل -->
    <div dir="ltr" class="flex md:flex-row flex-col justify-center md:space-x-4 mb-6">
      <button
        v-for="(chart, index) in chartTypes"
        :key="index"
        @click="activeChart = chart.id"
        class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 focus:outline-none"
      >
        {{ chart.label }}
      </button>
    </div>

    <!-- الرسومات البيانية -->
    <div class="w-full flex justify-center">
      <div
        v-for="(chart, index) in chartTypes"
        :key="index"
        v-show="activeChart === chart.id"
        class="bg-white shadow-xl rounded-lg p-6 w-1/2"
      >
        <h2 class="text-xl font-semibold text-center mb-4">{{ chart.label }}</h2>
        <canvas :id="chart.canvasId"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'EmployeeStatistics',
  setup() {
    const activeChart = ref('employeeBarChart')
    const chartInstances = ref({})
    const chartTypes = [
      {
        id: 'employeeBarChart',
        label: 'عدد الموظفين حسب الأقسام',
        canvasId: 'employeeBarChart',
        createChart: createBarChart,
      },
      {
        id: 'employeePieChart',
        label: 'نسبة الأقسام',
        canvasId: 'employeePieChart',
        createChart: createPieChart,
      },
      {
        id: 'employeeLineChart',
        label: 'النمو الشهري في التوظيف',
        canvasId: 'employeeLineChart',
        createChart: createLineChart,
      },
      {
        id: 'employeeHorizontalBarChart',
        label: 'التوزيع الأفقي للموظفين',
        canvasId: 'employeeHorizontalBarChart',
        createChart: createHorizontalBarChart,
      },
      {
        id: 'employeeDoughnutChart',
        label: 'تفاصيل النسبة حسب الأقسام',
        canvasId: 'employeeDoughnutChart',
        createChart: createDoughnutChart,
      },
    ]

    function createBarChart(ctx) {
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['قسم نساء وولادة', 'قسم الاشعة', 'قسم الموارد البشرية'],
          datasets: [
            {
              label: 'عدد الموظفين',
              data: [12, 19, 7],
              backgroundColor: ['#4bc0c0', '#36a2eb', '#ff6384'],
              borderColor: ['#4bc0c0', '#36a2eb', '#ff6384'],
              borderWidth: 1,
            },
          ],
        },
        options: { responsive: true },
      })
    }

    function createPieChart(ctx) {
      return new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['قسم التسويق', 'قسم المبيعات', 'قسم الموارد البشرية'],
          datasets: [
            {
              label: 'نسبة الأقسام',
              data: [12, 19, 7],
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
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
          datasets: [
            {
              label: 'النمو الشهري في التوظيف',
              data: [5, 10, 15, 20, 25, 30],
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

    function createHorizontalBarChart(ctx) {
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['قسم التسويق', 'قسم المبيعات', 'قسم الموارد البشرية'],
          datasets: [
            {
              label: 'عدد الموظفين',
              data: [12, 19, 7],
              backgroundColor: ['#ffce56', '#4bc0c0', '#ff6384'],
              borderColor: ['#ffce56', '#4bc0c0', '#ff6384'],
              borderWidth: 1,
            },
          ],
        },
        options: { indexAxis: 'y', responsive: true },
      })
    }

    function createDoughnutChart(ctx) {
      return new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['قسم التسويق', 'قسم المبيعات', 'قسم الموارد البشرية'],
          datasets: [
            {
              label: 'نسبة الأقسام',
              data: [12, 19, 7],
              backgroundColor: ['#ff9f40', '#36a2eb', '#4bc0c0'],
              borderColor: ['#ff9f40', '#36a2eb', '#4bc0c0'],
              borderWidth: 1,
            },
          ],
        },
        options: { responsive: true },
      })
    }

    onMounted(() => {
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
