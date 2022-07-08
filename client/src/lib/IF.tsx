// 회원가입
export interface IF_req_register {
  
}
// 로그인
export interface IF_req_login {
  id: string
  ps: string
}
export interface IF_res_login {
  session: string
}
// 개인정보
export interface IF_member {
  _id: string
  id: string
  nickname: string
  img: string
  points: number
  date: string
  private?: IF_private
}
export interface IF_private {
  sex: string
  birth: string
  address: string
  email: string
  phone: string
  spending: number
}
export interface IF_Schedule {
  
}
export interface IF_ImageData{
  FormData: File
  preview: string
}
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  row?: string;
  col?: string;
  gap?: string;
}
// 게시글 업로드 요청
export interface IF_req_post {
  session: string
  _id: string
  title: string
  content: string
}
// 댓글
export interface IF_comment {
  writer: IF_member
  content: string
  date: string
}
// 게시글
export interface IF_post {
  _id: string
  writer: IF_member
  title: string
  content: string
  img: string[] | undefined
  views: number
  date: string
  likes: number
  comments: IF_comment[] | undefined
}
// 게시판 페이지네이션
export interface IF_pagination {
  count: number // 글 전체 갯수
  countPerPage: number // 한 페이지 당 글 갯수
  pageCount: number // 나열할 최대 페이지 수
  currentIndex: number // 현재 활성화된 페이지 인덱스: 0 ~ pageCount
  base: number // 페이지 이동량
  variation: number // 화살표 클릭시 증감량
}