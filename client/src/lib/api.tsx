import axios, {AxiosError} from 'axios'
import Constants from './Constants'
import {
  IF_exit,
  IF_member,
  IF_private,
  IF_reqLogin,
  IF_session,
} from "./IF"

const Axios = axios.create({
  // baseURL: "/" // 배포후
  baseURL: Constants.URI.base, // 배포전
  withCredentials: true,
})

// 에러로직 일괄처리
const handleError = (err:any) => {
  const error = err as Error | AxiosError
  console.log(error)
  if(axios.isAxiosError(error) && error.response) window.alert(error.response.data)
  else window.alert(error.message)
}

const users = {
  // 회원가입
  register: async (params:FormData) => {
    try{
      const res = await Axios.post<IF_session>("/users", params, {headers: {'Content-Type': 'multipart/form-data'}})
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  // 로그인
  login: async (params:IF_reqLogin) => {
    try{
      const res = await Axios.patch<IF_session>('/users/login', params)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  // 회원정보 요청
  me: async (params:IF_session) => {
    try{
      const res = await Axios.get<IF_member>(`/users/${params.session}`)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  // 사적정보 요청
  private: async (params:IF_session) => {
    try{
      const res = await Axios.get<IF_private>(`/users/private/${params.session}`)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  // 로그아웃
  logout: async (params:IF_session) => {
    try{
      const res = await Axios.patch('/users/logout', {session: params.session})
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  // 회원수정
  modify: async (params:FormData) => {
    try{
      const res = await Axios.patch('/users', params, {headers: {'Content-Type': 'multipart/form-data'}})
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  // 회원탈퇴
  exit: async (params:IF_exit) => {
    try{
      const res = await Axios.delete(`/users/${params.session}?id=${params.id}&ps=${params.ps}`)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  }
}

export default {users}