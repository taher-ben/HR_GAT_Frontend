<template>
  <div class="p-6 w-full bg-white">
    <header class="flex flex-col flex-end mb-6 w-fit">
      <h1 class="mt-4 mb-10 ml-5 text-3xl font-bold">إدارة الخصومات والمكافآت</h1>
      <div class="flex md:flex-row flex-col gap-4">
        <div class="flex gap-4">
          <form
            class="bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex flex-row-reverse md:max-w-2xl items-center md:w-full w-fit"
            @submit.prevent="fetchData">
            <input v-model="searchQuery" type="text"
              class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
              placeholder="ادخل اسم الموظف" />
            <button class="px-4 py-4 me-1 bg-blue-500 text-white">بحث</button>
          </form>
          <button @click="printTable"
            class="px-4 py-4 my-auto bg-green-500 rounded-xl text-white cursor-pointer h-full">
            طباعة
          </button>
          <div>
            <h4>العنوان الاول </h4>
            <input v-model="title" type="text">
          </div>
          <div>
            <h4>العنوان الثاني </h4>
            <input v-model="suject" type="text">
          </div>
          <div>
            <h4>النص الرئيسي </h4>
            <input v-model="paragraph" type="text">
          </div>
        </div>
      </div>
    </header>
    <section class="mb-6 overflow-y-scroll">
      <table class="md:w-full w-fit table-auto border-collapse border border-gray-300 main-tabale">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">رقم السجل</th>
            <th class="border border-gray-300 px-4 py-2">اسم الموظف</th>
            <th class="border border-gray-300 px-4 py-2">النوع</th>
            <th class="border border-gray-300 px-4 py-2">الرقم الواظيفي</th>
            <th class="border border-gray-300 px-4 py-2">المبلغ</th>
            <th class="border border-gray-300 px-4 py-2">التاريخ</th>
            <th class="border border-gray-300 px-4 py-2">السبب</th>
            <th class="border border-gray-300 px-4 py-2 bootmes">إجراءات</th>
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
            <td class="border border-gray-300 px-4 py-2">{{ formatDate(record.date) }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ record.reason }}</td>
            <td class="border bootmes border-gray-300 px-4 py-2 flex gap-2 ">
              <button @click="editRecord(record)" class="bg-yellow-500 text-white px-2 py-1 rounded">
                تعديل
              </button>
              <button @click="deleteRecord(record.recordId)" class="bg-red-500 text-white px-2 py-1 rounded">
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
      <form @submit.prevent="submitForm" class="flex flex-col md:grid grid-cols-2 gap-4 md:w-[100%] mx-auto xs:w-[50%]">
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
              <input v-model="sreach" type="text" class="p-2 border rounded md:w-full sm:w-96 w-fit"
                placeholder="رقم الموظف" />
            </div>
            <div class="px-4 py-2 cursor-pointer bg-blue-500 mx-2 text-white" @click="searchEmployee(sreach)">
              بحث
            </div>
          </div>
          <div v-if="sreach.length > 0"
            class="absolute px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <div v-for="(item, index) in responseid" :key="index"
              class="flex items-center justify-between py-2 px-3 border-b last:border-none hover:bg-gray-100 transition duration-150 ease-in-out">
              <div class="flex items-center space-x-3">
                <span class="font-semibold text-gray-700">{{ item.lastName }}</span>
                <span class="text-gray-500">{{ item.firstName }}</span>
                <span class="text-gray-500 px-2">{{ item.employeeId }}</span>
              </div>
              <button @click="selectedId(item.employeeId)" class="text-sm text-blue-500 hover:text-blue-900">
                اختيار
              </button>
            </div>
          </div>
        </div>
        <div>
          <label class="block font-bold mb-1">المبلغ:</label>
          <input v-model="form.amount" type="number" class="p-2 border rounded md:w-full sm:w-96 w-fit" />
        </div>
        <div>
          <label class="block font-bold mb-1">التاريخ:</label>
          <input v-model="form.date" type="date" class="p-2 border rounded md:w-full sm:w-96 w-fit" />
        </div>
        <div class="md:col-span-2">
          <label class="block font-bold mb-1">السبب:</label>
          <textarea v-model="form.reason" class="p-2 border rounded md:w-full sm:w-96 w-fit"></textarea>
        </div>
        <div class="col-span-2 flex flex-row justify-strat gap-4">
          <button v-if="formMode === 'add'" type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
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
import Swal from 'sweetalert2'
import { format } from 'date-fns'

export default {
  data() {
    return {
      title: 'title',
      suject: 'subject',
      paragraph: '',
      allRecords: '',
      myToken: localStorage.getItem('authToken'),
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
    formatDate(date) {
      if (date) {
        return format(new Date(date), 'yyyy-MM-dd')
      }
      return ''
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
            .bootmes {
      display: none !important;
      }

  </style>
</head>
<body>
  <div class="container">
    <!-- Header Section -->
    <div class="flex">
      <div class="header" style="max-width: 100px;">
        <img src="public/0.png" alt="Logo">
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
    <div class="">
    <h3></h3>
      </div>
  </div>
</body>
</html>

  `);
      newWindow.document.close();
      newWindow.print();
    },
    selectedId(x) {
      this.form.employeeId = x
      this.sreach = this.form.employeeId
    },
    async searchEmployee(sreach) {
      try {
        this.isLoading = true

        const result = await axios.post(
          'http://localhost:88/api/employees/search',
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
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 2300
        });
      } finally {
        this.isLoading = false
      }
    },
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:88/api/penalty-and-reward/', {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          }
        },
        );
        this.allRecords = response.data.data.penaltyRewards;

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
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: 'حدث خطأ أثناء جلب البيانات. الرجاء المحاولة لاحقًا.',
          showConfirmButton: false,
          timer: 2300
        });
      }
    },
    async editRecord(record) {
      this.form = { ...record };
      this.formMode = 'edit';
      this.sreach = record.employee.employeeId;
      this.form.employeeId = record.employee.employeeId;
    },

    async submitForm() {
      try {
        const url = 'http://localhost:88/api/penalty-and-reward/'
        const payload = { ...this.form }

        if (this.formMode === 'add') {
          await axios.post(url, payload, {
            headers: {
              Authorization: `Bearer ${this.myToken}`,
            }
          })
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: 'تمت الإضافة بنجاح!',
            showConfirmButton: false,
            timer: 1500
          });
        } else if (this.formMode === 'edit') {
          await axios.patch(`${url}${this.form.recordId}/`, payload, {
            headers: {
              Authorization: `Bearer ${this.myToken}`,
            }
          })
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: 'تم التحديث بنجاح!',
            showConfirmButton: false,
            timer: 1500
          });
        }

        this.fetchData()
        this.resetForm()
      } catch (error) {
        console.error('Error submitting form:', error.message)
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: 'حدث خطأ أثناء إرسال البيانات. الرجاء المحاولة مرة أخرى.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    },

    async deleteRecord(recordId) {
      try {
        await axios.delete(`http://localhost:88/api/penalty-and-reward/${recordId}/`, {
          headers: {
            Authorization: `Bearer ${this.myToken}`,
          }
        })
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: 'تم الحذف بنجاح!',
          showConfirmButton: false,
          timer: 1500
        });
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
        ; (this.sreach = ''), (this.formMode = 'add')
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
