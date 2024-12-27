<template>
  <div class="bg-white md:h-screen w-full overscroll-none">
    <div class="flex justify-center relative p-1 md:h-full overscroll-none overflow-x-hidden overflow-scroll">
      <VeeForm @submit="submitForm" :validation-schema="schema"
        class="border border-gray-100 space-y-3 mx-auto my-auto rounded-md bg-white p-6 shadow-xl lg:p-10 md:grid md:grid-cols-2 flex flex-col gap-4">
        <h1 class="mb-10 ml-5 text-3xl font-bold col-span-2">تسجيل بيانات الموظف</h1>

        <div>
          <label>رقم تعريف البصمة</label>
          <VeeField name="employeeId" v-model="form.employeeId" type="text" placeholder="أدخل رقم تعريف البصمة"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="employeeId" />
        </div>

        <div>
          <label>الاسم الأول</label>
          <VeeField name="firstName" v-model="form.firstName" type="text" placeholder="أدخل الاسم الأول"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="firstName" />
        </div>

        <div>
          <label>اسم الأب</label>
          <VeeField name="middleName" v-model="form.middleName" type="text" placeholder="أدخل اسم الأب"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="middleName" />
        </div>

        <div>
          <label>اسم العائلة</label>
          <VeeField name="lastName" v-model="form.lastName" type="text" placeholder="أدخل اسم العائلة"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="lastName" />
        </div>

        <div>
          <label>الرقم الوطني</label>
          <VeeField name="nationalId" v-model="form.nationalId" type="number" placeholder="أدخل الرقم الوطني"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="nationalId" />
        </div>

        <div>
          <label>الجنس</label>
          <VeeField name="gender" v-model="form.gender" as="select"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2">
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </VeeField>
          <ErrorMessage class="text-red-600" name="gender" />
        </div>

        <div>
          <label>تاريخ الميلاد</label>
          <VeeField name="dateOfBirth" v-model="form.dateOfBirth" type="date"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="dateOfBirth" />
        </div>

        <div>
          <label>رقم الهاتف</label>
          <VeeField name="phone" v-model="form.phone" type="text" placeholder="أدخل رقم الهاتف"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="phone" />
        </div>

        <div>
          <label>نوع التوظيف</label>
          <VeeField name="contractType" v-model="form.contractType" as="select"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2">
            <option value="عقد">عقد</option>
            <option value="تعيين">تعيين</option>
          </VeeField>
          <ErrorMessage class="text-red-600" name="contractType" />
        </div>

        <div>
          <label>القسم</label>
          <VeeField name="department" v-model="form.departmentId" as="select"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2">
            <option disabled>اختر القسم</option>
            <option v-for="department in dataFordepartments" :key="department.departmentId"
              :value="department.departmentId">
              {{ department.departmentName }}
            </option>
          </VeeField>
        </div>

        <div>
          <label>البريد الإلكتروني</label>
          <VeeField name="email" v-model="form.email" type="email" placeholder="أدخل البريد الإلكتروني"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="email" />
        </div>

        <div>
          <label>تاريخ التعيين</label>
          <VeeField name="hireDate" v-model="form.hireDate" type="date"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="hireDate" />
        </div>

        <div>
          <label>شهري أو سنوي</label>
          <VeeField name="salaryPeriod" v-model="form.salaryPeriod" type="text" placeholder="أدخل نوع الراتب"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="salaryPeriod" />
        </div>

        <div>
          <label>قيمة الراتب الشهري</label>
          <VeeField name="salary" v-model="form.salary" type="text"
            placeholder="أدخل قيمة الراتب الشهري بالدينار الليبي"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="salary" />
        </div>


        <div>
          <label>العنوان</label>
          <VeeField name="address" v-model="form.address" type="text" placeholder="أدخل عنوان الموظف"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2" />
          <ErrorMessage class="text-red-600" name="address" />
        </div>

        <div>
          <button type="submit"
            class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white hover:bg-white hover:text-blue-500 border hover:border-blue-500 transition duration-150 ease-in-out">
            تسجيل
          </button>
        </div>
      </VeeForm>
    </div>
    <div class="relative bottom-24 right-6 text-white text-xl z-10 w-fit px-4 py-2 bg-blue-700 rounded-full">
      <div @click="toggleText" class="cursor-pointer transition duration-150 ease-in-out flex items-center space-x-2">
        <div :class="[isTextVisible ? 'rotate-45' : 'rotate-0']"
          class="transition duration-150 ease-in-out font-extrabold">
          +
        </div>
      </div>
      <transition name="fade-slide" enter-active-class="transition duration-300 ease-out"
        leave-active-class="transition duration-300 ease-in">
        <div @click="toggleText" v-show="isTextVisible"
          class="mt-2 bg-white absolute -top-28 text-black px-4 py-2 rounded shadow">
          <router-link to="/ManagemenSPEC"> إضافة قسم </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import API_ENDPOINTS from '../stores/api'
import Swal from 'sweetalert2'

export default {
  name: 'ProfilePictureUploader',
  data() {
    return {
      isTextVisible: false,
      dataFordepartments: [],
      schema: {
        salaryPeriod: 'required',
        employeeId: 'required',
        firstName: 'required',
        middleName: 'required',
        lastName: 'required',
        dateOfBirth: 'required',
        phone: 'required',
        department: 'required',
        email: '',
        salary: '',
        hireDate: 'required',
        address: 'required',
        gender: 'required',
        nationalId: 'required',
      },
      previewUrl: null,
      form: {
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
        photoURL: '',
        hireDate: '',
        fingerprint: '',
        contractType: '',
        salary: '',
        salaryPeriod: '',
        position: '',
        departmentId: ''
      },
    }
  },
  methods: {
    toggleText() {
      this.isTextVisible = !this.isTextVisible
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        if (!allowedTypes.includes(file.type)) {
          Swal.fire({
            position: "center-center",
            icon: "warning",
            title: 'الرجاء رفع صورة بصيغة JPG أو PNG أو GIF فقط.',
            showConfirmButton: false,
            timer: 1500
          });
          return
        }
        if (file.size > 2 * 1024 * 1024) {
          Swal.fire({
            position: "center-center",
            icon: "warning",
            title: 'حجم الصورة يجب أن لا يتجاوز 2 ميجابايت.',
            showConfirmButton: false,
            timer: 1500
          });
          return
        }
        this.previewUrl = URL.createObjectURL(file)
        this.form.photo = file
      }
    },
    async submitForm() {
      if (this.isLoading) return
      console.log('emlopp');
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
        console.log(this.form.contractType);
        response;
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: 'تم تسجيل الموظف بنجاح!',
          showConfirmButton: false,
          timer: 1500
        });
        this.form = []
      } catch (error) {
        console.error(error.response);
        const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء تسجيل الموظف.'
          Swal.fire({
          position: "center-center",
          icon: error,
          title: errorMessage,
          showConfirmButton: false,
          timer: 2000
        });
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
    console.log(this.dataFordepartments)
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
img {
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
<style scoped>
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
