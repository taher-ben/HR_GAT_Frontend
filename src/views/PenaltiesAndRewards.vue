<template>
  <div class="p-6 w-full bg-white">
    <header class="flex flex-col flex-end mb-6 w-fit">
      <h1 class="mt-4 mb-10 ml-5 text-3xl font-bold">إدارة الخصومات والمكافآت</h1>
      <div class="flex md:flex-row flex-col gap-4">
        <form
          class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center md:w-full w-fit"
          @submit.prevent="fetchData"
        >
          <input
            v-model="searchQuery"
            type="text"
            class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
            placeholder="ادخل اسم الموظف"
          />
          <button class="px-4 py-4 me-1 bg-blue-500 text-white">بحث</button>
        </form>
        <!-- <select v-model="filterType" class="p-2 border rounded md:w-full xs:w-96">
          <option  value="">الكل</option>
          <option value="reward">مكافأة</option>
          <option value="penalty">عقوبة</option>
        </select> -->
        <div class="bg-red-500 px-3" @click="fetchData">all</div>
      </div>
    </header>

    <section class="mb-6 overflow-y-scroll">
      <table class="md:w-full w-fit table-auto border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">رقم السجل</th>
            <th class="border border-gray-300 px-4 py-2">اسم الموظف</th>
            <th class="border border-gray-300 px-4 py-2">النوع</th>
            <th class="border border-gray-300 px-4 py-2">الرقم الواظيفي</th>
            <th class="border border-gray-300 px-4 py-2">المبلغ</th>
            <th class="border border-gray-300 px-4 py-2">التاريخ</th>
            <th class="border border-gray-300 px-4 py-2">السبب</th>
            <th class="border border-gray-300 px-4 py-2">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in filteredRecords" :key="record.recordId" class="hover:bg-gray-50">
            <td class="border border-gray-300 px-4 py-2">{{ record.recordId }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ record.employee.firstName }}</td>
            <td class="border border-gray-300 px-4 py-2">
              {{ record.type === 'reward' ? 'مكافأة' : 'عقوبة' }}
            </td>
            <td class="border border-gray-300 px-4 py-2">{{ record.employee.employeeId }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ record.amount }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ record.date }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ record.reason }}</td>
            <td class="border border-gray-300 px-4 py-2 flex gap-2">
              <button
                @click="editRecord(record)"
                class="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                تعديل
              </button>
              <button
                @click="deleteRecord(record.recordId)"
                class="bg-red-500 text-white px-2 py-1 rounded"
              >
                حذف
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2 class="text-xl font-bold mb-4">
        {{ formMode === 'add' ? 'إضافة سجل جديد' : 'تعديل السجل' }}
      </h2>
      <form
        @submit.prevent="submitForm"
        class="flex flex-col md:grid grid-cols-2 gap-4 md:w-full xs:w-[50%]"
      >
        <div>
          <label class="block mb-1">الموظف:</label>
          <input
            v-model="form.employeeEmployeeId"
            type="number"
            class="p-2 border rounded md:w-full sm:w-96 w-fit"
            placeholder="رقم الموظف"
          />
        </div>

        <div>
          <label class="block mb-1">النوع:</label>
          <div class="flex gap-4">
            <label class="flex items-center">
              <input type="radio" value="reward" v-model="form.type" class="mr-2" /> مكافأة
            </label>
            <label class="flex items-center">
              <input type="radio" value="penalty" v-model="form.type" class="mr-2" /> عقوبة
            </label>
          </div>
        </div>
        <div>
          <label class="block mb-1">الموظف:</label>
          <input
            v-model="form.recordId"
            type="number"
            class="p-2 border rounded md:w-full sm:w-96 w-fit"
            placeholder="رقم الموظف"
          />
        </div>
        <div>
          <label class="block mb-1">المبلغ:</label>
          <input
            v-model="form.amount"
            type="number"
            class="p-2 border rounded md:w-full sm:w-96 w-fit"
          />
        </div>
        <div>
          <label class="block mb-1">التاريخ:</label>
          <input
            v-model="form.date"
            type="date"
            class="p-2 border rounded md:w-full sm:w-96 w-fit"
          />
        </div>
        <div class="md:col-span-2">
          <label class="block mb-1">السبب:</label>
          <textarea
            v-model="form.reason"
            class="p-2 border rounded md:w-full sm:w-96 w-fit"
          ></textarea>
        </div>
        <div class="col-span-2 flex justify-strat gap-4">
          <button
            v-if="formMode === 'add'"
            type="submit"
            class="bg-green-500 text-white px-4 py-2 rounded"
          >
            {{ formMode === 'add' ? 'إضافة' : 'تحديث' }}
          </button>
          <button v-else type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
            تعديل
          </button>
          <button @click="resetForm" type="button" class="bg-gray-500 text-white px-4 py-2 rounded">
            إلغاء
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchQuery: '',
      filterType: '',
      records: [],
      form: {
        recordId: null,
        type: '',
        amount: '',
        date: '',
        reason: '',
        employeeEmployeeId: null,
      },
      formMode: 'add',
      isLoading: false,
    }
  },
  computed: {
    filteredRecords() {
      let filtered = this.records
      if (this.filterType) {
        filtered = filtered.filter((record) => record.type === this.filterType)
      }
      if (this.searchQuery) {
        filtered = filtered.filter((record) =>
          this.getEmployeeName(record.employeeEmployeeId)
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()),
        )
      }
      return filtered
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/penalty-and-reward/')
        this.records = response.data.data.penaltyRewards
        console.log(this.records)
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    },
    async editRecord(record) {
      this.form = { ...record }
      this.formMode = 'edit'
      this.form.employeeEmployeeId = record.employee.employeeId
    },

    async submitForm() {
      try {
        const url = 'http://localhost:8000/api/penalty-and-reward/'
        const payload = { ...this.form }

        if (this.formMode === 'add') {
          // إضافة سجل جديد
          await axios.post(url, payload)
          alert('تمت الإضافة بنجاح!')
        } else if (this.formMode === 'edit') {
          // تعديل سجل موجود
          await axios.patch(`${url}${this.form.recordId}/`, payload)
          alert('تم التحديث بنجاح!')
        }

        // إعادة تحميل البيانات وإعادة ضبط النموذج
        this.fetchData()
        this.resetForm()
      } catch (error) {
        console.error('Error submitting form:', error.message)
        alert('حدث خطأ أثناء إرسال البيانات. الرجاء المحاولة مرة أخرى.')
      }
    },

    async deleteRecord(recordId) {
      try {
        await axios.delete(`http://localhost:8000/api/penalty-and-reward/${recordId}/`)
        alert('تم الحذف بنجاح!')
        this.fetchData()
      } catch (error) {
        console.error('Error deleting record:', error.message)
      }
    },
    resetForm() {
      this.form = {
        recordId: null,
        type: '',
        amount: '',
        date: '',
        reason: '',
        employeeEmployeeId: null,
      }
      this.formMode = 'add'
    },
    getEmployeeName(employeeId) {
      // هذه الدالة تحتاج إلى تعديل حسب البيانات المتوفرة لديك
      return ` الموظف ${employeeId}`
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>

<style scoped>
/* أضف تنسيقاتك هنا */
</style>
