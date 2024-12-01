import apiClient from './api'

export const getUser = (userId) => {
  return apiClient.get(`/users/${userId}`)
}

export const createUser = (userData) => {
  return apiClient.post('/users', userData)
}

export const updateUser = (userId, userData) => {
  return apiClient.put(`/users/${userId}`, userData)
}

export const deleteUser = (userId) => {
  return apiClient.delete(`/users/${userId}`)
}
