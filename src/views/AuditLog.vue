<template>
  <div class="w-full h-full bg-white">
    <h2 class="font-bold text-2xl py-4 mx-8">تتبع جميع عمليات المستخدمين</h2>
    <div class="w-[90%] shadow-xl border-xl mx-auto p-4">
      <div class="px-2 py-2 bg-blue-400">
        <div class="font-bold mb-2 ">اسم الجدول</div>
        <select v-model="selectedTable" class="p-2 rounded border">
          <option value="">جميع الجداول</option>
          <option v-for="(translation, key) in translations" :key="key" :value="key">
            {{ translation }}
          </option>
        </select>
      </div>
      <div class="overflow-x-auto">
        <table class="table-auto w-full border-collapse border border-gray-200 text-right">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2">#</th>
              <th class="border px-4 py-2">رقم الإجراء</th>
              <th class="border px-4 py-2">اسم الجدول</th>
              <th class="border px-4 py-2">رقم السجل</th>
              <th class="border px-4 py-2">تاريخ الإجراء</th>
              <th class="border px-4 py-2">الإجراء</th>
              <th class="border px-4 py-2">التفاصيل</th>
              <th class="border px-4 py-2">المستخدم</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(log, index) in filteredRecords" :key="log.logId">
              <td class="border px-4 py-2">{{ index + 1 }}</td>
              <td class="border px-4 py-2">{{ log.logId }}</td>
              <td class="border px-4 py-2">{{ translateTableName(log.tableName) }}</td>
              <td class="border px-4 py-2">{{ log.recordId }}</td>
              <td class="border px-4 py-2">{{ new Date(log.actionDate).toLocaleString() }}</td>
              <td class="border px-4 py-2">{{ getActionType(log.actionType) }}</td>
              <td class="border px-4 py-2">
                <button @click="toggleDetails(log.logId)" class="text-blue-500 hover:underline">
                  عرض التفاصيل
                </button>
                <div v-if="log.showDetails" class="bg-gray-50 p-2 rounded mt-2">
                  <h4 class="font-semibold mb-2">التفاصيل:</h4>
                  <div class="mb-2">
                    <h5 class="font-semibold text-gray-700">القيمة القديمة:</h5>
                    <ul class="text-sm">
                      <li v-for="(value, key) in log.oldValue || {}" :key="'old-' + key">
                        <strong>{{ translateKey(key) }}:</strong>
                        <span>{{ typeof value === 'object' ? JSON.stringify(value, null, 2) : value }}</span>
                      </li>
                      <li class="text-red-400" v-if="!log.oldValue">لا توجد قيمة قديمة</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-semibold text-gray-700">القيمة الجديدة:</h5>
                    <ul class="text-sm">
                      <li v-for="(value, key) in log.newValue || {}" :key="'new-' + key">
                        <strong>{{ translateKey(key) }}:</strong>
                        <div v-if="typeof value === 'object' && value !== null">
                          <ul class="ml-4">
                            <li v-for="(subValue, subKey) in value" :key="'sub-' + subKey">
                              <strong class="px-1">{{ translateKey(subKey) }}:</strong>
                              <span>{{ subValue }}</span>
                            </li>
                          </ul>
                        </div>
                        <span v-else>{{ value }}</span>
                      </li>
                      <li class="text-red-400" v-if="!log.newValue">لا توجد قيمة جديدة</li>
                    </ul>
                  </div>
                </div>
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
      record: [],
      selectedTable: '',
      translations: {
        Users: "المستخدمون",
        Employees: "الموظفون",
        Attendance: "الحضور",
        PenaltiesAndRewards: "العقوبات والمكافآت",
        Leaves: "الإجازات",
        Departments: "الاقسام",
      },
    };
  },
  computed: {
    filteredRecords() {
      if (!this.selectedTable) {
        return this.record;
      }
      return this.record.filter(log => log.tableName === this.selectedTable);
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/audit-logs', {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          },
        });
        this.record = response.data.data.reverse().map((log) => ({
          ...log,
          showDetails: false,
        }));
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
      }
    },
    toggleDetails(logId) {
      const log = this.record.find((item) => item.logId === logId);
      if (log) log.showDetails = !log.showDetails;
    },
    getActionType(actionType) {
      const actions = {
        INSERT: 'إضافة',
        UPDATE: 'تحديث',
        DELETE: 'حذف',
      };
      return actions[actionType] || actionType;
    },
    translateTableName(tableName) {
      const translations = {
        Users: 'المستخدمون',
        Employees: 'الموظفون',
        Attendance: 'الحضور',
        PenaltiesAndRewards: 'العقوبات والمكافآت',
        Leaves: 'الإجازات',
        Departments: 'الاقسام',
      };
      return translations[tableName] || tableName;
    },
    translateKey(key) {
      const translations = {
        username: 'اسم المستخدم',
        passwordHash: 'كلمة المرور المشفرة',
        role: 'الدور',
        employeeId: 'رقم الموظف',
        firstName: 'الاسم الأول',
        middleName: 'الاسم الأوسط',
        lastName: 'الاسم الأخير',
        dateOfBirth: 'تاريخ الميلاد',
        address: 'العنوان',
        hireDate: 'تاريخ التوظيف',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        nationalId: 'الرقم الوطني',
        fingerprint: 'البصمة',
        checkDate: 'تاريخ الحضور',
        employee: 'الموظف',
        reason: 'السبب',
        type: 'النوع',
        department: 'الاقسام',
        leaveId: 'رقم العملية',
        startDate: 'تاريخ بداية الاجازة',
        endDate: 'تاريخ نهاية الاجازة',
        gender: 'الجنس',
        contractType: 'نوع التوظيف',
        salaryPeriod: 'رابت الشهري',
        date: 'التاريخ',
        attendanceId: 'معرف الحضور',
        amount: 'الفيمة',
        departmentName:'اسم القسم',
        departmentId:'رقم القسم',
        photoUrl:' ',
        annual:'تعب'
      };
      return translations[key] || key;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
