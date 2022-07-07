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