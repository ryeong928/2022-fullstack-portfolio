import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import Button from "../../compts/Button"
import Modal from "../../compts/Modal"
import { __me } from "../../lib/atom"
import { BaseScreen, Col, Row } from "../../lib/styled"

export default () => {
  const navigate = useNavigate()
  const me = useRecoilValue(__me)
  const [modal_exit, set_modal_exit] = useState<boolean>(false)
  const changePage = (e:React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLDivElement).textContent as string
    if(target === "회원정보수정") navigate('modify', {state: me})
    if(target === "내가 쓴 글") navigate('posts')
    if(target === "회원탈퇴") set_modal_exit(true)
  }
  return(
    <BaseScreen>
      <Col onClick={changePage} style={{gap: "10px"}}>
        <Button.Move color="red">회원정보수정</Button.Move>
        <Button.Move color="green">내가 쓴 글</Button.Move>
        <Button.Move color="gray">회원탈퇴</Button.Move>
      </Col>
      {modal_exit && <Modal.Exit isOpened={modal_exit} setIsOpened={set_modal_exit}/>}
    </BaseScreen>
  )
}