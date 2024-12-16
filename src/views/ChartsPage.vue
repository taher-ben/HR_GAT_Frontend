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
import { onMounted, ref, onBeforeUnmount } from 'vue'
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

    // جلب بيانات الأقسام
    async function fetchDepartmentsStats() {
      try {
        const { data } = await axios.get('/stats/departments')
        chartData.value.departments = data.data
        console.log('consolechart',chartData)
      } catch (error) {
        console.error('Error fetching departments stats:', error)
      }
    }

    // جلب بيانات النمو الشهري
    async function fetchMonthlyHireEvolution() {
      try {
        const { data } = await axios.get('/stats/monthly-hire-evolution')
        chartData.value.monthlyEvolution = data.Target
      } catch (error) {
        console.error('Error fetching monthly hire evolution:', error)
      }
    }

    // إنشاء الرسم البياني (Bar Chart)
    function createBarChart(ctx) {
      // تحقق من وجود البيانات قبل استخدام map()
      const labels = chartData.value.departments && chartData.value.departments.length > 0
        ? chartData.value.departments.map((dept) => dept.departmentName)
        : []

      const counts = chartData.value.departments && chartData.value.departments.length > 0
        ? chartData.value.departments.map((dept) => dept.count)
        : []

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

    // إنشاء الرسم البياني (Line Chart)
    function createLineChart(ctx) {
      const labels = chartData.value.monthlyEvolution && chartData.value.monthlyEvolution.length > 0
        ? chartData.value.monthlyEvolution.map((item) => `الشهر ${item.month}`)
        : []

      const counts = chartData.value.monthlyEvolution && chartData.value.monthlyEvolution.length > 0
        ? chartData.value.monthlyEvolution.map((item) => item.count)
        : []

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
      try {
        // انتظر جلب البيانات قبل تنفيذ إنشاء الرسوم البيانية
        await Promise.all([fetchDepartmentsStats(), fetchMonthlyHireEvolution()])
      } catch (error) {
        console.error("Error fetching data:", error)
      }

      // أنشئ الرسوم البيانية فقط إذا كانت العناصر موجودة في DOM
      chartTypes.forEach(({ canvasId, createChart }) => {
        const canvasElement = document.getElementById(canvasId)
        if (canvasElement) {
          const ctx = canvasElement.getContext('2d')
          chartInstances.value[canvasId] = createChart(ctx)
        }
      })
    })

    onBeforeUnmount(() => {
      // تنظيف الرسوم البيانية عند مغادرة الصفحة
      Object.keys(chartInstances.value).forEach((key) => {
        chartInstances.value[key].destroy()
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
