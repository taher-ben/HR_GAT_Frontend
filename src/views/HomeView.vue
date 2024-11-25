<template>
  <div class="bg-white h-full w-full flex">
    <div class="w-8/12 my-auto p-3">
      <form
        class="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10"
      >
        <h1 class="mb-6 text-xl font-semibold lg:text-2xl">تسجيل بيانات الموظفين</h1>
        <div>
          <label class=""> الرقم الوظيفي </label>
          <input
            type="text"
            placeholder="رقم الموظف"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <label class=""> الاسم الأول </label>
            <input
              type="text"
              placeholder="اسمك"
              class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
            />
          </div>
          <div>
            <label class=""> اسم العائلة </label>
            <input
              type="text"
              placeholder="اسم العائلة"
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
        </div>
        <div>
          <label class=""> تاريخ الميلاد </label>
          <input
            type="date"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <label class=""> الرقم الوطني </label>
          <input
            type="text"
            placeholder="12345678901234"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
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
        <div>
          <label class=""> العنوان </label>
          <input
            type="text"
            placeholder="عنوانك"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <label class=""> تاريخ التعيين </label>
          <input
            type="date"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div>
          <button
            type="submit"
            class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
          >
            ابدأ الآن
          </button>
        </div>
      </form>
    </div>
    <div class="w-4/12 p-3 bg-gray-300"></div>
  </div>
</template>
