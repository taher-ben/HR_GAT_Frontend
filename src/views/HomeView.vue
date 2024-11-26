<script></script>
<template>
  <div></div>
  <div class="bg-white md:h-screen h-fit w-full flex md:flex-row flex-col">
    <div class="w-full my-auto p-1 md:h-full h-screen overflow-x-hidden overflow-scroll">
      <form
        class="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10"
      >
        <h1 class="mb-6 text-xl font-semibold lg:text-2xl">تسجيل بيانات الموظفين</h1>
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
          <label class=""> الرقم الوظيفي </label>
          <input
            type="text"
            placeholder="رقم الموظف"
            class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 focus:outline-none focus:ring-sky-600 focus:ring-2"
          />
        </div>
        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <label class=""> الاسم الأول واسم الاب</label>
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
    <!-- <div class="md:w-4/12 w-full p-3 bg-gray-200 flex justify-between">
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow m-auto">
        <div class="flex flex-col justify-end px-4 pt-4 absolute">
          <font-awesome-icon
            class="w-5 h-5 cursor-pointer"
            @click="modalStore.toggleModalEditMenu"
            :icon="['fas', 'ellipsis']"
          />
          <div
            :class="modalStore.isOpenEditMenu ? 'block' : 'hidden'"
            class="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          >
            <ul class="py-2" aria-labelledby="dropdownButton">
              <li @click="modalStore.toggleModalEditMenu">
                <RouterLink class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >تعديل</RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col items-center py-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="../assets/person.png"
            alt="Bonnie image"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900">أحمد محمد</h5>
          <span class="text-sm text-gray-500">دكتور</span>
          <div class="grid gap-4 grid-cols-2 w-full px-4 mt-4 md:mt-6">
            <div class="mb-3">
              <p class="text-blue-500 font-bold">الرقم الوظيفي</p>
              <p class="text-zinc-700 mt-1">326545</p>
            </div>
            <div class="mb-2">
              <p class="text-blue-500 font-bold">الاسم الأول واسم الاب</p>
              <p class="text-zinc-700 mt-1">أحمد محمد</p>
            </div>
            <div class="mb-2">
              <p class="text-blue-500 font-bold">اسم العائلة</p>
              <p class="text-zinc-700 mt-1">أحمد محمد</p>
            </div>
            <div class="mb-2">
              <p class="text-blue-500 font-bold">الجنس</p>
              <p class="text-zinc-700 mt-1">ذكر</p>
            </div>
            <div class="mb-2">
              <p class="text-blue-500 font-bold">تاريخ الميلاد</p>
              <p class="text-zinc-700 mt-1">2024/11/10</p>
            </div>
            <div class="mb-2">
              <p class="text-blue-500 font-bold">الرقم الوطني</p>
              <p class="text-zinc-700 mt-1">21221222220</p>
            </div>
            <div class="mb-2">
              <p class="text-blue-500 font-bold">البريد الإلكتروني</p>
              <p class="text-zinc-700 mt-1">email@gmail.com</p>
            </div>
            <div class="mb-2">
              <p class="text-blue-500 font-bold">العنوان</p>
              <p class="text-zinc-700 mt-1">ليبيا</p>
            </div>
            <div class="mb-2">
              <p class="text-blue-500 font-bold">تاريخ التعين</p>
              <p class="text-zinc-700 mt-1">2024/11/10</p>
            </div>
            <div class="mb-2">
              <p class="text-blue-500 font-bold">الهاتف</p>
              <p class="text-zinc-700 mt-1">091000000</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<style>
/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 50px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
