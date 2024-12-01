<template>
  <div class="h-screen overflow-hidden bg-white">
    <div class="md:w-full w-fit h-full overflow-scroll">
      <h1 class="mt-4 mb-10 ml-5 text-3xl font-bold px-8">جدول الحضور</h1>
      <form
        class="relative bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out pe-2 flex md:max-w-2xl items-center mx-8 mt-8 md:w-full w-fit"
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
      <div class="lg:flex lg:h-full lg:flex-col md:p-8 p-4">
        <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <!-- days of week  -->
          <div
            class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none"
          >
            <div class="flex justify-center bg-white py-2">الإثنين</div>
            <div class="flex justify-center bg-white py-2">الثلاثاء</div>
            <div class="flex justify-center bg-white py-2">الأربعاء</div>
            <div class="flex justify-center bg-white py-2">الخميس</div>
            <div class="flex justify-center bg-white py-2">الجمعة</div>
            <div class="flex justify-center bg-white py-2">السبت</div>
            <div class="flex justify-center bg-white py-2">الأحد</div>
          </div>
          <!-- 30 days of the month -->
          <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div class="w-full grid grid-cols-7 lg:grid-rows-6 gap-px">
              <template v-for="day in monthDays" :key="day.date">
                <div
                  class="relative px-3 py-2"
                  :class="{
                    'bg-white': day.currentMonth,
                    'bg-gray-50 text-gray-500': !day.currentMonth,
                  }"
                >
                  <time
                    :datetime="day.date"
                    :class="{
                      'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white':
                        day.isToday,
                    }"
                  >
                    {{ day.day }}
                  </time>
                  <ul v-if="day.events.length > 0" class="mt-2 mx-auto">
                    <li v-for="event in day.events" :key="event.id" class="mb-1 md:block hidden">
                      <p class="text-sm font-medium text-gray-900">{{ event.title }}</p>
                      <p class="text-xs text-gray-500">{{ event.description }}</p>
                    </li>
                    <li class="mb-1 flex justify-center md:hidden">
                      <font-awesome-icon class="text-blue-400" :icon="['fas', 'circle']" />
                    </li>
                  </ul>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeCalendar',
  data() {
    return {
      // بيانات أيام الشهر
      monthDays: [
        { date: '2022-12-01', day: 1, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-02', day: 2, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-03', day: 3, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-04', day: 4, currentMonth: true, isToday: false, events: [] },
        {
          date: '2022-12-05',
          day: 5,
          currentMonth: true,
          isToday: false,
          events: [{ id: 1, title: 'اجتماع فريق', description: 'الساعة 10:00 صباحًا' }],
        },
        {
          date: '2022-12-05',
          day: 6,
          currentMonth: true,
          isToday: false,
          events: [{ id: 1, title: 'اجتماع فريق', description: 'الساعة 10:00 صباحًا' }],
        },
        // {
        //   date: '2022-12-07',
        //   day: 7,
        //   currentMonth: true,
        //   isToday: true,
        //   events: [{ id: 2, title: 'إجازة سنوية', description: 'موظف: أحمد علي' }],
        // },
        { date: '2022-12-08', day: 7, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-08', day: 8, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-09', day: 9, currentMonth: true, isToday: false, events: [] },
        {
          date: '2022-12-10',
          day: 10,
          currentMonth: true,
          isToday: false,
          events: [{ id: 3, title: 'تسليم تقرير', description: 'الساعة 5:00 مساءً' }],
        },
        // تكملة بقية الشهر
        { date: '2022-12-11', day: 11, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-12', day: 12, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-13', day: 13, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-14', day: 14, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-15', day: 15, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-16', day: 16, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-17', day: 17, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-18', day: 18, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-19', day: 19, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-20', day: 20, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-21', day: 21, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-22', day: 22, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-23', day: 23, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-24', day: 24, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-25', day: 25, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-26', day: 26, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-27', day: 27, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-28', day: 28, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-29', day: 29, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-30', day: 30, currentMonth: true, isToday: false, events: [] },
        { date: '2022-12-31', day: 31, currentMonth: true, isToday: false, events: [] },
      ],
    }
  },
}
</script>

<style>
/* تنسيقات إضافية حسب الحاجة */
</style>
