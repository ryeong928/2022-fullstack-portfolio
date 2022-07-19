import React, { useContext } from 'react'
import {useState, useEffect, useRef} from 'react'
import {ModalMain, ModalLogin, ModalExit, PointFont} from '../lib/styled'
import {__session} from '../lib/atom'
import { IF_exit, IF_reqLogin } from '../lib/IF';
import API from '../lib/api';
import Button from './Button'
import Input from './Input'
import { LoadingContext } from '../context/LoadingContext';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}
const Main = (props: MainProps) => {
    // 모달 컨테이너 클릭시 닫기
    const clickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement
      if (target.dataset.container) props.setIsOpened(false)
    };
    return (
      <ModalMain onClick={clickOutside} data-container={"true"}>
        <main style={props.style}>{props.children}</main>
      </ModalMain>
    )
}
// 모달창: 로그인
const Login = (props: MainProps) => {
  const {isLoading, set_isLoading} = useContext(LoadingContext)
  const set_session = useSetRecoilState(__session)
  const loginRef = useRef<HTMLFormElement>(null)
  const [id, set_id] = useState<string>("")
  const [ps, set_ps] = useState<string>("")
  // 로그인 API
  const reqLogin = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(isLoading) return
    const clean_id = id.replace(/\s/gi, "")
    if(!id){
      window.alert("아이디를 입력해주세요")
      const parent = loginRef.current
      if(!parent) return
      return (parent.children[0] as HTMLInputElement).focus()
    }
    const clean_ps = ps.replace(/\s/gi, "")
    if(!clean_ps){
      window.alert("비밀번호를 입력해주세요")
      const parent = loginRef.current
      if(!parent) return
      return (parent.children[1] as HTMLInputElement).focus()
    }
    set_isLoading(prev => true)
    const params:IF_reqLogin = {id: clean_id, ps: clean_ps}
    API.users.login(params).then(res => {
      if(!res) return 
      set_session(res.session)
      props.setIsOpened(false)
    })
  }
      return (
        <ModalLogin style={props.style} ref={loginRef} onSubmit={reqLogin}>
          <Input.Main value={id} setValue={set_id} placeholder="아이디" />
          <Input.Main value={ps} setValue={set_ps} placeholder="비밀번호" type="password"/>
          <section>
            <Button.Sub type="submit">로그인</Button.Sub>
            <Button.Sub type="button" color="white" onClick={()=>{props.setIsOpened(false)}}>닫기</Button.Sub>
          </section>
        </ModalLogin>
      )
}
// 모달창: 회원탈퇴
const Exit = (props:MainProps) => {
  const navigate = useNavigate()
  const {isLoading, set_isLoading} = useContext(LoadingContext)
  const [session, set_session] = useRecoilState(__session)
  const exitRef = useRef<HTMLFormElement>(null)
  const [id, set_id] = useState<string>("")
  const [ps, set_ps] = useState<string>("")
  // 회원탈퇴 API
  const reqExit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!session) return window.alert("재 로그인 해주세요")
    if(isLoading) return
    const clean_id = id.replace(/\s/gi, "")
    if(!id){
      window.alert("아이디를 입력해주세요")
      const parent = exitRef.current
      if(!parent) return
      return (parent.children[1] as HTMLInputElement).focus()
    }
    const clean_ps = ps.replace(/\s/gi, "")
    if(!clean_ps){
      window.alert("비밀번호를 입력해주세요")
      const parent = exitRef.current
      if(!parent) return
      return (parent.children[2] as HTMLInputElement).focus()
    }
    const params:IF_exit = {
      session, id: clean_id, ps: clean_ps
    }
    set_isLoading(prev => true)
    API.users.exit(params).then(res => {
      if(!res) return
      window.alert("회원탈퇴가 되었습니다")
      set_session(undefined)
      navigate('/')
    })
  }
  return(
    <Main isOpened={props.isOpened} setIsOpened={props.setIsOpened} style={{maxWidth: 400}}>
      <ModalExit style={props.style} ref={exitRef} onSubmit={reqExit}>
        <PointFont>회원탈퇴</PointFont>
        <Input.Main value={id} setValue={set_id} placeholder="아이디" />
        <Input.Main value={ps} setValue={set_ps} placeholder="비밀번호" type="password"/>
        <section>
          <Button.Sub type="submit">회원탈퇴</Button.Sub>
          <Button.Sub type="button" color="white" onClick={()=>{props.setIsOpened(false)}}>닫기</Button.Sub>
        </section>
      </ModalExit>
    </Main>
  )
}
export default {
  Main,
  Login,
  Exit,
}