<script setup>
import { useModalStore } from '@/stores/model'
const modalStore = useModalStore()
</script>
<template>
  <div class="about w-full z-50 bg-gray-50">
    <div
      class="flex md:flex-row flex-col bg-white md:w-full w-screen h-screen overflow-y-scroll z-40"
    >
      <div class="md:w-9/12 w-full my-4 px-4">
        <div class="mx-auto max-w-screen-xl bg-white">
          <h1 class="mt-20 mb-10 ml-5 text-3xl font-bold">البحث عن موضف</h1>
          <div class="bg-white py-2 px-3"></div>
        </div>
        <div class="bg-gray-50">
          <div class="mx-auto px-2 py-10">
            <div class="mt-4 w-full">
              <form
                class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center mt-8 md:w-full w-fit"
              >
                <font-awesome-icon
                  class="w-4 h-4 absolute left-2 text-gray-500"
                  :icon="['fas', 'magnifying-glass']"
                />
                <button class="px-4 py-4 me-1 bg-blue-500 text-white">بحث</button>
                <input
                  type="name"
                  name="search"
                  class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
                  placeholder="ادخل بيانات الموظف"
                />
              </form>
            </div>

            <div class="mt-6 rounded-xl bg-white shadow overflow-x-scroll">
              <table class="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 px-4 py-2">الاسم</th>
                    <th class="border border-gray-300 px-3 py-2">الاسم الاوسط</th>
                    <th class="border border-gray-300 px-4 py-2">اللقب</th>
                    <th class="border border-gray-300 px-4 py-2">الرقم الوطني</th>
                    <th class="border border-gray-300 px-4 py-2">الجنس</th>
                    <th class="border border-gray-300 px-4 py-2">الرقم الوظيفي</th>
                    <th class="border border-gray-300 px-4 py-2">تاريخ التوظيف</th>
                    <th class="border border-gray-300 px-4 py-2">العنوان</th>
                    <th class="border border-gray-300 px-4 py-2">تاريخ الميلاد</th>
                    <th class="border border-gray-300 px-4 py-2">الهاتف</th>
                    <th class="border border-gray-300 px-4 py-2">البريد الإلكتروني</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="hover:bg-gray-50 md:flex-row">
                    <td class="border border-gray-300 px-4 py-2">محمد</td>
                    <td class="border border-gray-300 px-4 py-2">خالط</td>
                    <td class="border border-gray-300 px-4 py-2">أحمد</td>
                    <td class="border border-gray-300 px-4 py-2">123456789012</td>
                    <td class="border border-gray-300 px-4 py-2">ذكر</td>
                    <td class="border border-gray-300 px-4 py-2">56789</td>
                    <td class="border border-gray-300 px-4 py-2">15 مارس 2019</td>
                    <td class="border border-gray-300 px-4 py-2">شارع الجامعة، طرابلس</td>
                    <td class="border border-gray-300 px-4 py-2">1 يناير 1990</td>
                    <td class="border border-gray-300 px-4 py-2">0912345678</td>
                    <td class="border border-gray-300 px-4 py-2">mohamed.ahmed@example.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-3/12 w-fit bg-gray-100 flex">
        <div class="max-w-sm border bg-white my-auto rounded-lg shadow overflow-x-scroll m-auto">
          <button class="flex flex-col justify-end px-4 pt-4 relative">
            <font-awesome-icon
              class="w-5 h-5 cursor-pointer"
              @click="modalStore.toggleModalEditMenu"
              :icon="['fas', 'ellipsis']"
            />
            <div
              :class="modalStore.isOpenEditMenu ? 'block' : 'hidden'"
              class="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-10"
            >
              <ul class="py-2" aria-labelledby="dropdownButton">
                <li @click="modalStore.toggleModalEditMenu">
                  <RouterLink class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >تعديل</RouterLink
                  >
                </li>
              </ul>
            </div>
          </button>
          <div class="flex flex-col items-center py-10 bg-white">
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
      </div>
    </div>
  </div>
</template>
