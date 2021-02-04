import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}


// * Crops requests:
export function getAllCrops() {
  return axios.get(`${baseUrl}/crops/`)
}

export function getSingleCrop(id) {
  return axios.get(`${baseUrl}/crops/${id}`)
}

export function createCrop(formdata) {
  return axios.post(`${baseUrl}/crops/`, formdata, headers())
}

export function deleteCrop(id) {
  return axios.delete(`${baseUrl}/crops/${id}/`, headers())
}

export function editCrop(id, formdata) {
  return axios.put(`${baseUrl}/crops/${id}/`, formdata, headers())
}

// Crop Tags 

export function getAllCropTags() {
  return axios.get(`${baseUrl}/crop_tags/`)
}

// * Auth Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/auth/register/`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/auth/login/`, formdata)
}

export function showUserProfile() {
  return axios.get(`${baseUrl}/auth/profile/`, headers())
}

export function editUserProfile(formdata) {
  return axios.put(`${baseUrl}/update-profile/`, formdata, headers())
}

export function getAllUsers() {
  return axios.get(`${baseUrl}/auth/users/`, headers())
}

// COMMENTS : add, delete, view all comments. also crop tags and companion groups

export function createCropComment(formdata, id) {
  return axios.post(`${baseUrl}/comments/`, formdata, headers(), id)
}

export function deleteCropComment(id, commentId) {
  return axios.delete(`${baseUrl}/crops/${id}/comments/${commentId}/`, headers())
}

export function getAllComments() {
  return axios.get(`${baseUrl}/comments/`)
}

export function getSingleComment(id) {
  return axios.get(`${baseUrl}/comments/${id}/`)
}