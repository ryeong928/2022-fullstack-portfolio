import axios, {AxiosError} from 'axios'
import Constants from './Constants'
import {
  IF_exit,
  IF_member,
  IF_private,
  IF_reqLogin,
  IF_session,
  IF_getPosts,
  IF_postDetail,
  IF_reqPostLike,
  IF_reqPostDelete,
  IF_comment,
  IF_reqCommentWrite,
  IF_reqCommentModify,
  IF_reqCommentDelete,
} from "./IF"

const Axios = axios.create({
  baseURL: "/", // 배포용
  // baseURL: Constants.URI.base, // 배포전
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
const posts = {
  write: async (params: FormData) => {
    try{
      const res = await Axios.post('/posts', params, {headers: {'Content-Type':'multipart/form-data'}})
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  modify: async (params: FormData) => {
    try{
      const res = await Axios.patch('/posts', params, {headers: {'Content-Type':'multipart/form-data'}})
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  posts: async (search: string, page: number) => {
    try{
      const res = await Axios.get<IF_getPosts>(`/posts?search=${search}&page=${page}`)
      console.log(res)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  post: async (_id:string, user_id:string|undefined) => {
    try{
      const res = await Axios.get<IF_postDetail>(`/posts/${_id}?user_id=${user_id}`)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  like: async (params: IF_reqPostLike) => {
    try{
      const res = await Axios.patch(`/posts/like`, params)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  delete: async (params:IF_reqPostDelete) => {
    try{
      const {session, _id} = params
      const res = await Axios.delete(`/posts/${_id}/${session}`)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  my: async(writer_id:string, page:string) => {
    try{
      const res = await Axios.get(`/posts/my?writer_id=${writer_id}&page=${page}`)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  }
}
const comments = {
  write: async (params:IF_reqCommentWrite) => {
    try{
      const res = await Axios.post<IF_comment[]>(`/comments`, params)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  modify: async (params:IF_reqCommentModify) => {
    try{
      const {_id, ...rest} = params
      const res = await Axios.patch<IF_comment[]>(`/comments/${_id}`, rest)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  },
  delete: async (params:IF_reqCommentDelete) => {
    try{
      const {_id, post_id, session} = params
      const res = await Axios.delete(`/comments/${_id}?post_id=${post_id}&session=${session}`)
      if(res.data) return res.data
    }catch(err){
      handleError(err)
    }
  }
}
export default {users, posts, comments}