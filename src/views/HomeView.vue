<script></script>
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
  height: 50px;
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
