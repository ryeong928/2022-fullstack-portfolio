import axios, {AxiosError} from 'axios'
import Constants from './Constants'
import {
  IF_req_login, 
  IF_res_login,
  IF_member,
  IF_req_post,
} from "./IF"

const Axios = axios.create({
  // baseURL: "/"
  baseURL: Constants.URI.base,
  withCredentials: true,
})

// 에러로직 일괄처리
const handleError = (err) => {
  const error = err as Error | AxiosError
  console.log(error)
  if(axios.isAxiosError(error)) window.alert(error.response.data)
  else window.alert(error.message)
}
// 회원가입
export const req_register = async (params: FormData) => {
  try{
    const res = await Axios.post<IF_res_login>("/user", params, {headers: {'Content-Type':'multipart/form-data'}})
    console.log(res)
    if(res.data) return res.data
  }catch(err){
    handleError(err)
  }
}
// 로그인
export const req_login = async (params:IF_req_login) => {
  try{
    const res = await Axios.post<IF_res_login>("/user/login", params)
    console.log(res)
    if(res.data) return res.data
  }catch(err) {
    handleError(err)
  }
}
// 개인정보
export const req_me = async (session: string) => {
  try{
    const res = await Axios.get<IF_member>(`/user/${session}`)
    console.log(res)
    if(res.data) return res.data
  }catch(err){
    handleError(err)
  }
}
// 로그아웃
export const req_logout = async (session: string) => {
  try{
    const res = await Axios.patch('/user/logout', {session})
    if(res.data.result) return true
  }catch(err){
    handleError(err)
  }
}
// 게시글 업로드
export const req_post = async (params:IF_req_post) => {
  try{
    const res = await Axios.post('/post', params)
    if(res.data.result) return true
  }catch(err){
    handleError(err)
  }
}