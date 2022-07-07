import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { req_logout } from '../lib/api'
import {__me, __session} from '../lib/atom'
import {CommonHeader, CommonFooter, CommonLoading, Font20M, Grid} from '../lib/styled'
import Modal from './Modal'

const Header = () => {
  const [session, set_session] = useRecoilState(__session)
  const me = useRecoilValue(__me)
  const location = useLocation().pathname
  const navigate = useNavigate()
  // 로그인 모달창
  const [isLogin, set_isLogin] = useState<boolean>(false)
  // 페이지 변경
  const selectPath = (e:React.MouseEvent<HTMLDivElement>) => {
    const path = (e.target as HTMLDivElement).dataset.path as string
    if(!path) return
    navigate(path)
  }
  // 로그인 | 로그아웃
  const login_or_logout = (e:React.MouseEvent<HTMLDivElement>) => {
    const action = (e.currentTarget.textContent) as string
    if(action === "로그인") set_isLogin(prev => !prev)
    else if (action === "로그아웃") req_logout(session).finally(()=>{set_session(undefined)})
  }
  return(
    <CommonHeader onClick={selectPath}>
      <section>
        <div className={location === "/" ? "current_path" : ""} data-path={"/"}>홈</div>
        <div className={location.includes("/products") ? "current_path" : ""} data-path={"/products"}>제품</div>
        <div className={location.includes("/ranking") ? "current_path" : ""} data-path={"/ranking"}>랭킹</div>
        <div className={location.includes("/about") ? "current_path" : ""} data-path={"/about"}>어바웃</div>
      </section>
      {me ? (
        <section>
          <div onClick={login_or_logout}>로그아웃</div>
          <div className={location.includes("/mypage") ? "current_path" : ""} data-path={"/mypage"}>마이페이지</div>
        </section>
      ) : (
        <section>
          <div onClick={login_or_logout}>로그인</div>
          <div className={location.includes("/register") ? "current_path" : ""} data-path={"/register"}>회원가입</div>
        </section>
      )}
      {isLogin && (<Modal.Login isOpened={isLogin} setIsOpened={set_isLogin}/>)}
    </CommonHeader>
  )
}
const Footer = () => {
  return (
    <CommonFooter>
      <Font20M>풀스택 포트폴리오</Font20M>
      <div />
      <Grid col="55px 1fr" gap="5px">
        <div className="footer_field">제작자</div>
        <div>박성령</div>
        <div className="footer_field">전화번호</div>
        <div>010-6243-7491</div>
        <div className="footer_field">이메일</div>
        <div>ryeong928@naver.com</div>
        <div className="footer_field">깃헙</div>
        <div>https://github.com/ryeong928?tab=repositories</div>
        <div className="footer_field">스택</div>
        <div>react, axios, styled-components, node, express, mongoDB</div>
        <div className="footer_field">제작기간</div>
        <div>2022-07-07 ~ ...</div>
      </Grid>
    </CommonFooter>
  )
}
const ScrollToTop = () => {
  const {pathname} = useLocation()
  useEffect(()=>{window.scrollTo(0,0)}, [pathname])
  return null
}
interface LoadingProps {
  isLoading: boolean
  set_isLoading: React.Dispatch<React.SetStateAction<boolean>>
  count: number
}
const Loading = (props:LoadingProps) => {
  // 로딩관련 로직
  useEffect(()=>{
    let timer:undefined | ReturnType<typeof setTimeout>
    if(props.isLoading) timer = setTimeout(()=>{props.set_isLoading(prev => false)}, props.count)
    return ()=>{timer && clearTimeout(timer)}
  }, [props.isLoading])
  // 외부 클릭 방지
  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
  }
  // 외부 스크롤 방지
  useEffect(()=>{
    document.body.style = `overflow: hidden`;
    return () => {document.body.style = `overflow: auto`}
  }, [])

  return <CommonLoading onClick={onClick}>로딩중...</CommonLoading>
}
export default {
  Header,
  Footer,
  ScrollToTop,
  Loading
}