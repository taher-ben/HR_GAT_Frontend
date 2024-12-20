<template>
  <div class="p-4 bg-white h-full w-full">
    <div class="ps-12">
      <h2 class="text-3xl font-bold mt-4">رفع بيانات الموظفين للمعالجة</h2>
    </div>
    <div class="w-[50%] mx-auto mt-12 shadow-2xl rounded-xl p-8">
      <h3 class="mb-8 text-blue-500 font-bold text-xl">
        ارفع الملف الخاص ببيانات حضور وانصراف الموظفين
      </h3>
      <div
        class="flex items-center justify-center w-full"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
      >
        <label
          for="dropzone-file"
          :class="[
            'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50',
            isDragging
              ? 'bg-blue-50 dark:bg-blue-700 border-blue-300 dark:border-blue-500'
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700',
            'hover:bg-gray-100 dark:hover:bg-gray-600',
          ]"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <font-awesome-icon
              class="text-blue-500 text-4xl mb-8"
              :icon="['fas', 'cloud-arrow-up']"
            />
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">انقر للرفع</span> أو اسحب الملف وأفلته هنا
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">الملفات المسموح بها: Excel فقط</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            accept=".xls,.xlsx"
            @change="onFileChange"
          />
        </label>
      </div>
      <div v-if="uploadMessage" class="mt-4 text-green-500">
        {{ uploadMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      isDragging: false,
      uploadMessage: '',
    }
  },
  methods: {
    onDragOver() {
      this.isDragging = true
    },
    onDragLeave() {
      this.isDragging = false
    },
    onDrop(event) {
      this.isDragging = false
      const files = event.dataTransfer.files
      if (files.length) {
        this.uploadFile(files[0])
      }
    },
    onFileChange(event) {
      const files = event.target.files
      if (files.length) {
        this.uploadFile(files[0])
      }
    },
    async uploadFile(file) {
      const formData = new FormData()
      formData.append('excel', file)

      try {
        const response = await axios.post('http://localhost:8000/api/attendance/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.uploadMessage = 'تم رفع الملف بنجاح!'
        console.log('Upload response:', response.data)
      } catch (error) {
        console.error('Error uploading file:', error)
        this.uploadMessage = 'حدث خطأ أثناء رفع الملف.'
      }
    },
  },
}
</script>
