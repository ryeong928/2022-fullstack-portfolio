import React from "react"

// 세션
export interface IF_session {
  session: string
}
// 회원정보
export interface IF_member {
  _id: string
  id: string
  nickname: string
  img: string
  date: string
}
// 사적정보
export interface IF_private {
  sex: string
  birth: string
  address: string
}
// 이미지 등록 형식
export interface IF_ImageData{
  file: File | undefined
  preview: string | undefined
}
// 페이지네이션 props
export interface IF_paginationConstants{
  count: number
  countPerPage: number
  pageCount: number
  variation: number
}
// 페이지네이션 변수
export interface IF_paginationVariables {
  index: number
  base: number
}
// 페이지네이션
export interface IF_pagination {
  count: number // 글 전체 갯수
  countPerPage: number // 한 페이지 당 글 갯수
  pageCount: number // 페이지네이션에 나열할 최대 페이지 인덱스 수
  variation: number // 화살표 클릭시 증감량
  index: number // 현재 활성화된 페이지 인덱스
  base: number // 페이지 이동량
}
// 로딩
export interface IF_loading {
  isLoading: boolean
  set_isLoading: React.Dispatch<React.SetStateAction<boolean>>
  set_loadingTime: React.Dispatch<React.SetStateAction<number>>
}
// API

// 회원가입
export interface IF_register {
  id: string
  ps: string
  nickname: string
  private: IF_private
}
// 로그인
export interface IF_reqLogin {
  id: string
  ps: string
}
// 회원수정
export interface IF_modify {
  session: string
  ps: string
  nickname: string
  deleteImg: string[]
  private: IF_private
  img?: ""
}
// 회원탈퇴
export interface IF_exit {
  session: string
  id: string
  ps: string
}
// 글쓰기
export interface IF_reqPostWrite {
  session: string
  title: string
  content: string
}
// 글쓴이
export interface IF_writer {
  _id: string
  nickname: string
  img: string
}
// 댓글
export interface IF_comment{
  _id: string
  post_id: string
  writer: IF_writer
  content: string
  likes: number
  date: string
}
// 게시글
export interface IF_postDetail {
  _id: string
  writer: IF_writer
  title: string
  content: string
  img: string[]
  likes: number
  isLike: boolean
  views: number
  date: string
  comments: IF_comment[]
}
// 게시글 리스트
export interface IF_post {
  _id: string
  writer: IF_writer
  title: string
  commentCount: number
  likes: string
  views: string
  date: string
}
export interface IF_getPosts {
  posts: IF_post[]
  count: number
}
// 게시글 좋아요/취소
export interface IF_reqPostLike {
  _id: string
  session: string
  isLike: boolean
}
// 게시글 수정
export interface IF_reqPostModify {
  _id: string
  session: string
  title?: string
  content?: string
  deleteImg: string[] // 
}
// 게시글 삭제
export interface IF_reqPostDelete {
  session: string
  _id: string
}
// 댓글 생성
export interface IF_reqCommentWrite {
  post_id: string
  session: string
  content: string
}
// 댓글 수정/좋아요
export interface IF_reqCommentModify{
  _id: string
  post_id: string
  session: string
  content?: string // 내용 수정일 경우 입력
  isLike?: boolean // 좋아요/취소일 경우 입력
}
// 댓글 삭제
export interface IF_reqCommentDelete{
  _id: string
  post_id: string
  session: string
}


// 스타일
export interface IF_grid extends React.HTMLAttributes<HTMLDivElement> {
  row: string
  col: string
  gap: string
}