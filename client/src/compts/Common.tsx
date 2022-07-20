import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import API from '../lib/api'
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
  const login_or_logout = async (e:React.MouseEvent<HTMLDivElement>) => {
    const action = (e.currentTarget.textContent) as string
    if(action === "로그인") set_isLogin(prev => !prev)
    else if (action === "로그아웃") {
      if(!window.confirm("로그아웃 하시겠습니까?")) return
      if(session) await API.users.logout({session})
      set_session(undefined)
    }
  }
  return(
    <CommonHeader onClick={selectPath}>
      <section>
        <div className={location === "/" ? "current_path" : ""} data-path={"/"}>홈</div>
        <div className={location.includes("/commu") ? "current_path" : ""} data-path={"/commu?search=&index=0&base=1"}>게시판</div>
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
      <Grid col="55px 1fr" row="" gap="5px" placeholder="static">
        <p>제작자</p>
        <div>박성령</div>
        <p>전화번호</p>
        <div>010-6243-7491</div>
        <p>이메일</p>
        <div>ryeong928@naver.com</div>
        <p>깃헙</p>
        <div><a href="https://github.com/ryeong928?tab=repositories" target="_blank">https://github.com/ryeong928?tab=repositories</a></div>
        <p>스택</p>
        <div>react, typescript, axios, styled-components, node, express, mongoDB</div>
        <p>배포</p>
        <div>heroku</div>
      </Grid>
    </CommonFooter>
  )
}
const ScrollToTop = () => {
  const {pathname} = useLocation()
  useEffect(()=>{window.scrollTo(0,0)}, [pathname])
  return null
}
export default {
  Header,
  Footer,
  ScrollToTop,
}