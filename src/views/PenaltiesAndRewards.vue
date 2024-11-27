<template>
  <div class="p-6 w-full bg-white h-screen">
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">إدارة الخصومات والمكافآت</h1>
      <div class="flex md:flex-row flex-col gap-4">
        <form
          class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center mx-8 md:w-full w-fit"
        >
          <font-awesome-icon
            class="w-4 h-4 absolute left-2 text-gray-500"
            :icon="['fas', 'magnifying-glass']"
          />
          <button @click="fetchData" class="px-4 py-4 me-1 bg-blue-500 text-white">بحث</button>
          <input
            type="name"
            name="search"
            class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
            placeholder="ادخل بيانات الموظف"
          />
        </form>
        <select v-model="filterType" class="p-2 border rounded">
          <option value="">الكل</option>
          <option value="reward">مكافأة</option>
          <option value="penalty">عقوبة</option>
        </select>
      </div>
    </header>

    <section class="mb-6">
      <table class="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">رقم السجل</th>
            <th class="border border-gray-300 px-4 py-2">اسم الموظف</th>
            <th class="border border-gray-300 px-4 py-2">النوع</th>
            <th class="border border-gray-300 px-4 py-2">المبلغ</th>
            <th class="border border-gray-300 px-4 py-2">التاريخ</th>
            <th class="border border-gray-300 px-4 py-2">السبب</th>
            <th class="border border-gray-300 px-4 py-2">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in filteredRecords" :key="record.RecordID" class="hover:bg-gray-50">
            <td class="border border-gray-300 px-4 py-2">{{ record.RecordID }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ record.EmployeeName }}</td>
            <td class="border border-gray-300 px-4 py-2">
              {{ record.Type === 'reward' ? 'مكافأة' : 'عقوبة' }}
            </td>
            <td class="border border-gray-300 px-4 py-2">{{ record.Amount }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ record.Date }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ record.Reason }}</td>
            <td class="border border-gray-300 px-4 py-2 flex gap-2">
              <button
                @click="editRecord(record)"
                class="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                تعديل
              </button>
              <button
                @click="deleteRecord(record.RecordID)"
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
      <form @submit.prevent="submitForm" class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-1">الموظف:</label>
          <select v-model="form.EmployeeID" class="p-2 border rounded w-full">
            <option
              v-for="employee in employees"
              :key="employee.EmployeeID"
              :value="employee.EmployeeID"
            >
              {{ employee.FirstName }} {{ employee.LastName }}
            </option>
          </select>
        </div>
        <div>
          <label class="block mb-1">النوع:</label>
          <div class="flex gap-4">
            <label class="flex items-center">
              <input type="radio" value="reward" v-model="form.Type" class="mr-2" />
              مكافأة
            </label>
            <label class="flex items-center">
              <input type="radio" value="penalty" v-model="form.Type" class="mr-2" />
              عقوبة
            </label>
          </div>
        </div>
        <div>
          <label class="block mb-1">المبلغ:</label>
          <input v-model="form.Amount" type="number" class="p-2 border rounded w-full" />
        </div>
        <div>
          <label class="block mb-1">التاريخ:</label>
          <input v-model="form.Date" type="date" class="p-2 border rounded w-full" />
        </div>
        <div class="col-span-2">
          <label class="block mb-1">السبب:</label>
          <textarea v-model="form.Reason" class="p-2 border rounded w-full"></textarea>
        </div>
        <div class="col-span-2 flex justify-end gap-4">
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
            {{ formMode === 'add' ? 'إضافة' : 'تحديث' }}
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
export default {
  data() {
    return {
      filteredRecords: [
        {
          RecordID: 1,
          EmployeeName: 'أحمد علي',
          Type: 'reward',
          Amount: 500,
          Date: '2024-11-01',
          Reason: 'إتمام مشروع بنجاح',
        },
        {
          RecordID: 2,
          EmployeeName: 'سارة محمد',
          Type: 'penalty',
          Amount: 200,
          Date: '2024-11-05',
          Reason: 'تأخير في الحضور',
        },
        {
          RecordID: 3,
          EmployeeName: 'محمد أحمد',
          Type: 'reward',
          Amount: 750,
          Date: '2024-11-10',
          Reason: 'تحقيق هدف المبيعات',
        },
        {
          RecordID: 4,
          EmployeeName: 'ريم حسن',
          Type: 'penalty',
          Amount: 100,
          Date: '2024-11-15',
          Reason: 'تقصير في الأداء',
        },
        {
          RecordID: 5,
          EmployeeName: 'خالد يوسف',
          Type: 'reward',
          Amount: 300,
          Date: '2024-11-20',
          Reason: 'مبادرة ممتازة',
        },
      ],
      searchQuery: '',
      filterType: '',
      records: [],
      employees: [],
      form: {
        RecordID: null,
        EmployeeID: '',
        Type: 'reward',
        Amount: '',
        Date: '',
        Reason: '',
      },
      formMode: 'add', // يمكن أن تكون "add" أو "edit"
    }
  },
  computed: {
    // filteredRecords() {
    //   return this.records.filter((record) => {
    //     const matchesSearch = record.EmployeeName.includes(this.searchQuery)
    //     const matchesType = this.filterType ? record.Type === this.filterType : true
    //     return matchesSearch && matchesType
    //   })
    // },
  },
  methods: {
    fetchData() {
      // جلب البيانات من API
      // مثال: axios.get('/api/penalties_rewards')
      console.log('Fetching data...')
    },
    submitForm() {
      if (this.formMode === 'add') {
        // إضافة سجل جديد
        console.log('Adding record:', this.form)
      } else {
        // تحديث سجل موجود
        console.log('Updating record:', this.form)
      }
      this.resetForm()
    },
    editRecord(record) {
      this.form = { ...record }
      this.formMode = 'edit'
    },
    deleteRecord(recordId) {
      console.log('Deleting record:', recordId)
    },
    resetForm() {
      this.form = {
        RecordID: null,
        EmployeeID: '',
        Type: 'reward',
        Amount: '',
        Date: '',
        Reason: '',
      }
      this.formMode = 'add'
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>
