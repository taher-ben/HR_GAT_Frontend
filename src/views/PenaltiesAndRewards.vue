<template>
  <div class="p-6 w-full bg-white">
    <header class="flex flex-col flex-end mb-6 w-fit">
      <h1 class="mt-4 mb-10 ml-5 text-3xl font-bold">إدارة الخصومات والمكافآت</h1>
      <div class="flex md:flex-row flex-col gap-4">
        <form
          class="bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex flex-row-reverse md:max-w-2xl items-center md:w-full w-fit"
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
          <tr v-for="record in allRecords" :key="record.recordId" class="hover:bg-gray-50">
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
        class="flex flex-col md:grid grid-cols-2 gap-4 md:w-[100%] mx-auto xs:w-[50%]"
      >
        <div v-if="form.recordId">
          <label class="block font-bold mb-1">رقم السجل :</label>
          <h3>{{ form.recordId }}</h3>
        </div>
        <div>
          <label class="block font-bold mb-1">النوع:</label>
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
          <div class="relative flex items-end">
            <div>
              <label class="block font-bold mb-1">الموظف:</label>
              <input
                v-model="sreach"
                type="text"
                class="p-2 border rounded md:w-full sm:w-96 w-fit"
                placeholder="رقم الموظف"
              />
            </div>
            <div
              class="px-4 py-2 cursor-pointer bg-blue-500 mx-2 text-white"
              @click="searchEmployee(sreach)"
            >
              بحث
            </div>
          </div>
          <div
            v-if="sreach.length > 0"
            class="absolute px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
          >
            <div
              v-for="(item, index) in responseid"
              :key="index"
              class="flex items-center justify-between py-2 px-3 border-b last:border-none hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <div class="flex items-center space-x-3">
                <span class="font-semibold text-gray-700">{{ item.lastName }}</span>
                <span class="text-gray-500">{{ item.firstName }}</span>
                <span class="text-gray-500 px-2">{{ item.employeeId }}</span>
              </div>
              <button
                @click="selectedId(item.employeeId)"
                class="text-sm text-blue-500 hover:text-blue-900"
              >
                اختيار
              </button>
            </div>
          </div>
        </div>
        <div>
          <label class="block font-bold mb-1">المبلغ:</label>
          <input
            v-model="form.amount"
            type="number"
            class="p-2 border rounded md:w-full sm:w-96 w-fit"
          />
        </div>
        <div>
          <label class="block font-bold mb-1">التاريخ:</label>
          <input
            v-model="form.date"
            type="date"
            class="p-2 border rounded md:w-full sm:w-96 w-fit"
          />
        </div>
        <div class="md:col-span-2">
          <label class="block font-bold mb-1">السبب:</label>
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
      allRecords:'',
      searchQuery: '',
      responseid: '',
      sreach: '',
      filterType: '',
      records: [],
      originalRecords: [],
      form: {
        recordId: null,
        type: '',
        amount: '',
        date: '',
        reason: '',
        employeeId: null,
      },
      formMode: 'add',
      isLoading: false,
    }
  },

  methods: {
    selectedId(x) {
      this.form.employeeId = x
      this.sreach = this.form.employeeId
    },
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
        this.responseid = result.data.data
      } catch (error) {
        const errorMessage = error.responseid?.data?.message || 'حدث خطأ أثناء البحث عن الموظف.'
        alert(errorMessage)
      } finally {
        this.isLoading = false
      }
    },
    async fetchData() {
    try {
      const response = await axios.get('http://localhost:8000/api/penalty-and-reward/');
      this.allRecords = response.data.data.penaltyRewards;

      // فلترة البيانات حسب اسم الموظف أو الرقم

      this.records = this.allRecords.filter((record) => {
        const employeeName = `${record.employee.firstName} ${record.employee.lastName}`;
        return (
          employeeName.includes(this.searchQuery) || // البحث عن الاسم
          record.employee.employeeId.toString().includes(this.searchQuery) // البحث عن الرقم
        );
      });
      this.allRecords = this.records
    } catch (error) {
      console.error('Error fetching data:', error.message);
      alert('حدث خطأ أثناء جلب البيانات. الرجاء المحاولة لاحقًا.');
    }
  },
    async editRecord(record) {
      this.form = { ...record }
      this.formMode = 'edit'
      this.sreach = record.employee.employeeId
      this.form.employeeId = record.employee.employeeId
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
        employeeId: null,
      }
      ;(this.sreach = ''), (this.formMode = 'add')
    },
    getEmployeeName(employeeId) {
      return ` الموظف ${employeeId}`
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>

<style scoped></style>
