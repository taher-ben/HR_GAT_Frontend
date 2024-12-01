<!-- <script></script>
<template>
  <div class="bg-white md:h-screen h-fit w-full flex md:flex-row flex-col">
    <div class="w-full my-auto p-1 md:h-full h-screen overflow-x-hidden overflow-scroll">
      <form
        class="relative border border-gray-100 space-y-3 max-w-screen-xl mx-auto my-auto rounded-md bg-white p-6 shadow-xl lg:p-10"
      >
        <h1 class="mb-10 ml-5 text-3xl font-bold">تسجيل بيانات الموظفين</h1>
        <div>
          صورة الشخصية
          <div
            class="mt-1 w-fit rounded-md bg-blue-600 py-2 px-1 text-center font-semibold text-white cursor-pointer"
          >
            <label for="profile-picture" class="form-label cursor-pointer">صورة الشخصية</label>
            <div>
              <input
                type="file"
                id="profile-picture"
                class="hidden"
                aria-label="رفع الصورة الشخصية"
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <label class=""> الرقم الوظيفي </label>
            <input
              type="text"
              placeholder="رقم الموظف"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
            />
          </div>
          <div>
            <label class=""> الاسم الأول </label>
            <input
              type="text"
              placeholder="أحمد خالد"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
            />
          </div>
        </div>
        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <label class=""> اسم الاب </label>
            <input
              type="text"
              placeholder="أحمد خالد"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
            />
          </div>
          <div>
            <label class=""> اسم العائلة </label>
            <input
              type="text"
              placeholder="اللقب"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
            />
          </div>
        </div>
        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <label class=""> الجنس </label>
            <select
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
            >
              <option value="">اختر الجنس</option>
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
            </select>
          </div>
          <div>
            <label class=""> تاريخ الميلاد </label>
            <input
              type="date"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
            />
          </div>
        </div>
        <div>
          <label class=""> الرقم الوطني </label>
          <input
            type="text"
            placeholder="12345678901234"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <label class=""> الهاتف </label>
            <input
              type="text"
              placeholder="0910000000"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
            />
          </div>
          <div>
            <label class=""> البريد الإلكتروني </label>
            <input
              type="email"
              placeholder="example@example.com"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
            />
          </div>
        </div>
        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <label class=""> تاريخ التعين </label>
            <input
              type="date"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
            />
          </div>
          <div>
            <label class=""> العنوان </label>
            <input
              type="text"
              placeholder="عنوانك"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
          >
            تسجيل
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
::-webkit-scrollbar {
  width: 10px;
  margin: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style> -->

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        profilePicture: null, // صورة الشخصية
        employeeId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        nationalId: '',
        phone: '',
        email: '',
        address: '',
        hireDate: '',
      },
    }
  },
  methods: {
    async submitForm() {
      try {
        const formData = new FormData()

        // إضافة البيانات إلى FormData
        formData.append('profilePicture', this.form.profilePicture)
        formData.append('employeeId', this.form.employeeId)
        formData.append('firstName', this.form.firstName)
        formData.append('middleName', this.form.middleName)
        formData.append('lastName', this.form.lastName)
        formData.append('gender', this.form.gender)
        formData.append('dateOfBirth', this.form.dateOfBirth)
        formData.append('nationalId', this.form.nationalId)
        formData.append('phone', this.form.phone)
        formData.append('email', this.form.email)
        formData.append('address', this.form.address)
        formData.append('hireDate', this.form.hireDate)

        // إرسال البيانات باستخدام Axios
        const response = await axios.post('http://localhost:3000/api/employees', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer YOUR_JWT_TOKEN`,
          },
        })

        console.log('تم تسجيل الموظف بنجاح:', response.data)
        alert('تم تسجيل الموظف بنجاح!')
      } catch (error) {
        console.error('خطأ أثناء تسجيل الموظف:', error.response?.data || error.message)
        alert('حدث خطأ أثناء تسجيل الموظف.')
      }
    },
    handleFileUpload(event) {
      this.form.profilePicture = event.target.files[0]
    },
  },
}
</script>

<template>
  <div class="bg-white md:h-screen h-fit w-full flex md:flex-row flex-col">
    <div class="w-full my-auto p-1 md:h-full h-screen overflow-x-hidden overflow-scroll">
      <form
        @submit.prevent="submitForm"
        class="relative border border-gray-100 space-y-3 max-w-screen-xl mx-auto my-auto rounded-md bg-white p-6 shadow-xl lg:p-10"
      >
        <h1 class="mb-10 ml-5 text-3xl font-bold">تسجيل بيانات الموظفين</h1>
        <div>
          <label for="profile-picture">صورة الشخصية</label>
          <div
            class="mt-1 w-fit rounded-md bg-blue-600 py-2 px-1 text-center font-semibold text-white cursor-pointer"
          >
            <label for="profile-picture" class="form-label cursor-pointer">رفع الصورة</label>
            <input
              type="file"
              id="profile-picture"
              @change="handleFileUpload"
              class="hidden"
              aria-label="رفع الصورة الشخصية"
            />
          </div>
        </div>
        <div>
          <label>الرقم الوظيفي</label>
          <input
            v-model="form.employeeId"
            type="text"
            placeholder="رقم الموظف"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <label>الاسم الأول</label>
          <input
            v-model="form.firstName"
            type="text"
            placeholder="أحمد خالد"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <label>اسم الأب</label>
          <input
            v-model="form.middleName"
            type="text"
            placeholder="اسم الأب"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <label>اسم العائلة</label>
          <input
            v-model="form.lastName"
            type="text"
            placeholder="اللقب"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <label>الجنس</label>
          <select
            v-model="form.gender"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          >
            <option value="">اختر الجنس</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>
        <div>
          <label>تاريخ الميلاد</label>
          <input
            v-model="form.dateOfBirth"
            type="date"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <label>الرقم الوطني</label>
          <input
            v-model="form.nationalId"
            type="text"
            placeholder="12345678901234"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <label>الهاتف</label>
          <input
            v-model="form.phone"
            type="text"
            placeholder="0910000000"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <label>البريد الإلكتروني</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="example@example.com"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <label>تاريخ التعين</label>
          <input
            v-model="form.hireDate"
            type="date"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <label>العنوان</label>
          <input
            v-model="form.address"
            type="text"
            placeholder="عنوانك"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <button
            type="submit"
            class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
          >
            تسجيل
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
/* لإعداد شريط التمرير */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
