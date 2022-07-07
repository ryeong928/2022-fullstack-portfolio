import {useState, useEffect, useRef} from 'react'
import {ModalMain, ModalLogin} from '../lib/styled'
import {useSetRecoilState} from 'recoil'
import {__session} from '../lib/atom'
import { IF_req_login } from '../lib/IF';
import { req_login } from '../lib/api';
import Button from './Button'
import Input from './Input'
import Common from './Common'

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
  const set_session = useSetRecoilState(__session)
  const loginRef = useRef<HTMLFormElement>(null)
  const [id, set_id] = useState<string>("")
  const [ps, set_ps] = useState<string>("")
  const [isLoading, set_isLoading] = useState<boolean>(false)
  // 로그인 API
  const login = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(isLoading) return
    set_isLoading(true)
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
    const params:IF_req_login = {id: clean_id, ps: clean_ps}
    req_login(params).then(res => {
      if(res) set_session(res.session)
      props.setIsOpened(false)
    })
  }
      return (
        <ModalLogin style={props.style} ref={loginRef} onSubmit={login}>
          <Input.Main value={id} setValue={set_id} placeholder="아이디" />
          <Input.Main value={ps} setValue={set_ps} placeholder="비밀번호" type="password"/>
          <section>
            <Button.Sub type="submit">로그인</Button.Sub>
            <Button.Sub type="button" color="white" onClick={()=>{props.setIsOpened(false)}}>닫기</Button.Sub>
          </section>
          {isLoading && <Common.Loading isLoading={isLoading} set_isLoading={set_isLoading} count={1000}/>}
        </ModalLogin>
      )
}
export default {
  Main,
  Login
}