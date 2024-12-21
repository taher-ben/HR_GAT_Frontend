<template>
  <div class="w-full h-full bg-white">
    <h2 class="font-bold text-2xl py-4 mx-8">تتبع جميع عمليات المستخدمين</h2>
    <div class="w-[90%] shadow-xl border-xl mx-auto p-4">
      <div class="overflow-x-auto">  <!-- إضافة التمرير الأفقي هنا -->
        <table class="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2">#</th>
              <th class="border px-4 py-2">رقم الاجراء</th>
              <th class="border px-4 py-2">اسم صحفة الاجراء</th>
              <th class="border px-4 py-2">رقم العملية بين العمليات</th>
              <th class="border px-4 py-2">تاريخ الاجراء</th>
              <th class="border px-4 py-2">القيمة القديمة</th>
              <th class="border px-4 py-2">القيمة الجديدة</th>
              <th class="border px-4 py-2">المستخدم الذي قام بتغيير أو الإضافة</th>
            </tr>
          </thead>
          <tbody>
            <!-- عرض السجلات المسترجعة من الـ API -->
            <tr v-for="(log, index) in record" :key="log.logId">
              <td class="border px-4 py-2">{{ index + 1 }}</td>
              <td class="border px-4 py-2">{{ log.logId }}</td>
              <td class="border px-4 py-2">{{ log.tableName }}</td>
              <td class="border px-4 py-2">{{ log.recordId }}</td>
              <td class="border px-4 py-2">{{ new Date(log.actionDate).toLocaleString() }}</td>
              <td class="border px-4 py-2">
                <pre>{{ JSON.stringify(log.newValue, null, 2) }}</pre>
              </td>
              <td class="border px-4 py-2">
                <pre>{{ JSON.stringify(log.newValue, null, 2) }}</pre>
              </td>
              <td class="border px-4 py-2">{{ log.user ? log.user.username : "غير موجود" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      myToken: localStorage.getItem('authToken'),
      record: [], // لحفظ السجلات المسترجعة من الـ API
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/audit-logs', {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          },
        });

        this.record = response.data.data.reverse();
        console.log(this.record);
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
      }
    },
  },
  mounted() {
    this.fetchData(); // استدعاء دالة جلب البيانات عند تحميل المكون
  },
};
</script>
