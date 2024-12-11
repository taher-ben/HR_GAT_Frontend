import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // القاعدة الأساسية لجميع الطلبات
  headers: {
    'Content-Type': 'application/json',
  },
})

// إضافة التوكن إذا كان موجودًا
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
