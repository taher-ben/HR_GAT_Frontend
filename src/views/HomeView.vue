<template>
  <div class="bg-white md:h-screen w-full overscroll-none">
    <div
      class="flex justify-center p-1 md:h-full overscroll-none overflow-x-hidden overflow-scroll"
    >
      <VeeForm
        @submit="submitForm"
        :validation-schema="schema"
        class="border border-gray-100 space-y-3 w-[100rem] mx-auto my-auto rounded-md bg-white p-6 shadow-xl lg:p-10 md:grid md:grid-cols-2 flex flex-col gap-4"
      >
        <h1 class="mb-10 ml-5 text-3xl font-bold col-span-2">تسجيل بيانات الموظفين</h1>
        <div
          class="mt-1 w-fit rounded-md bg-blue-600 py-2 px-1 text-center font-semibold text-white cursor-pointer col-span-2"
        >
          <label for="profile-picture" class="form-label cursor-pointer">صورة الشخصية</label>
          <VeeField name="profilePicture">
            <input
              type="file"
              id="profile-picture"
              v-bind="field"
              @change="handleFileUpload"
              class="hidden"
            />
          </VeeField>
          <ErrorMessage class="text-red-600" name="profilePicture" />
          <div v-if="previewUrl" class="mt-2">
            <img :src="previewUrl" alt="صورة الشخصية" class="w-24 h-24 rounded-full object-cover" />
          </div>
        </div>

        <div>
          <label> الرقم الوظيفي </label>
          <VeeField
            name="employeeId"
            v-model="form.employeeId"
            type="text"
            placeholder="رقم الموظف"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="employeeId" />
        </div>
        <div>
          <label> الاسم الأول </label>
          <VeeField
            name="firstName"
            v-model="form.firstName"
            type="text"
            placeholder="أحمد"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="firstName" />
        </div>
        <div>
          <label> اسم الأب </label>
          <VeeField
            name="middleName"
            v-model="form.middleName"
            type="text"
            placeholder="خالد"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="middleName" />
        </div>
        <div>
          <label> اسم العائلة </label>
          <VeeField
            name="lastName"
            v-model="form.lastName"
            type="text"
            placeholder="المصري"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="lastName" />
        </div>
        <div>
          <label> الجنس </label>
          <VeeField
            name="gender"
            v-model="form.gender"
            as="select"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          >
            <option value="" disabled>اختر الجنس</option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </VeeField>
          <ErrorMessage class="text-red-600" name="gender" />
        </div>
        <div>
          <label> تاريخ الميلاد </label>
          <VeeField
            name="dateOfBirth"
            v-model="form.dateOfBirth"
            type="date"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="dateOfBirth" />
        </div>
        <div>
          <label> رقم الهاتف </label>
          <VeeField
            name="phone"
            v-model="form.phone"
            type="text"
            placeholder="0912345678"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="phone" />
        </div>
        <div>
          <label> نوع التوظيف</label>
          <VeeField
            name="gender"
            v-model="form.gender"
            as="select"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          >
            <option value="" disabled>اختر نوع التوظيف</option>
            <option value="ذكر">عقد</option>
            <option value="أنثى">تعين</option>
          </VeeField>
          <ErrorMessage class="text-red-600" name="gender" />
        </div>
        <div>
          <label>القسم </label>
          <VeeField
            name="department"
            v-model="form.department"
            as="select"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          >
            <option value="" disabled>اختر القسم</option>
            <option
              v-for="department in dataFordepartments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.departmentName }}
            </option>
          </VeeField>
          <ErrorMessage class="text-red-600" name="department" />
        </div>
        <div>
          <label> البريد الإلكتروني </label>
          <VeeField
            name="email"
            v-model="form.email"
            type="email"
            placeholder="example@example.com"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="email" />
        </div>
        <div>
          <label> تاريخ التعيين </label>
          <VeeField
            name="hireDate"
            v-model="form.hireDate"
            type="date"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="hireDate" />
        </div>
        <div>
          <label> العنوان </label>
          <VeeField
            name="address"
            v-model="form.address"
            type="text"
            placeholder="عنوان الموظف"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
          <ErrorMessage class="text-red-600" name="address" />
        </div>
        <div>
          <button
            type="submit"
            class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
          >
            تسجيل
          </button>
        </div>
      </VeeForm>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import API_ENDPOINTS from '../stores/api'

export default {
  name: 'ProfilePictureUploader',
  data() {
    return {
      schema: {
        employeeId: 'required',
        firstName: 'required|min:2|max:50|alpha_spaces',
        middleName: 'required|min:2|max:50|alpha_spaces',
        lastName: 'required|min:2|max:50|alpha_spaces',
        dateOfBirth: 'required',
        phone: 'required|numeric|length:10',
        email: 'required|email|max:100',
        hireDate: 'required',
        address: 'required|min:5|max:100',
        gender: 'required',
      },
      previewUrl: null,
      form: {
        // employeeId: '',
        // firstName: '',
        // middleName: '',
        // lastName: '',
        // gender: '',
        // dateOfBirth: '',
        // phone: '',
        // email: '',
        // address: '',
        // hireDate: '',
        // profilePicture: null,
        employeeId: '1212',
        firstName: 'أحميد',
        middleName: 'خايلد',
        lastName: 'المصيري',
        gender: 'ذكر',
        dateOfBirth: '1990-05-15',
        nationalId: '19900515123456',
        phone: '0912345678',
        email: 'ahmed.khaled@example.com',
        address: 'طرابلس، شارع الاستقلال',
        photoUrl:
          'https://images.pexels.com/photos/2014773/pexels-photo-2014773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        hireDate: '2022-03-01',
        fingerprint: 'F12345',
        contractType: 'full-time',
        salaryPeriod: 'monthly',
        positionPositionId: '10',
        departmentDepartmentId: '5',
      },
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        if (!allowedTypes.includes(file.type)) {
          alert('الرجاء رفع صورة بصيغة JPG أو PNG أو GIF فقط.')
          return
        }
        if (file.size > 2 * 1024 * 1024) {
          alert('حجم الصورة يجب أن لا يتجاوز 2 ميجابايت.')
          return
        }
        this.previewUrl = URL.createObjectURL(file)
        this.form.profilePicture = file
      }
    },
    async submitForm() {
      if (this.isLoading) return

      this.isLoading = true
      try {
        const formData = new FormData()
        Object.keys(this.form).forEach((key) => {
          formData.append(key, this.form[key])
        })

        const myToken = localStorage.getItem('authToken')
        const response = await axios.post(API_ENDPOINTS.employees, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${myToken}`,
          },
        })

        alert('تم تسجيل الموظف بنجاح!')
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء تسجيل الموظف.'
        alert(errorMessage)
      } finally {
        this.isLoading = false
      }
    },
    async departments() {
      if (this.isLoading) return

      this.isLoading = true
      try {
        const myToken = localStorage.getItem('authToken')

        const response = await axios.get(API_ENDPOINTS.departments, {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        })

        this.dataFordepartments = response.data.data.departments
      } catch (error) {
        console.error('حدث خطأ أثناء جلب البيانات:', error.response?.data?.message || error.message)
        this.dataFordepartments = []
      } finally {
        this.isLoading = false
      }
    },
  },
  mounted() {
    this.departments()
  },
}
</script>

<style>
/* تحسين مظهر النموذج */
img {
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
