import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import Modal from "../../compts/Modal"
import { __me } from "../../lib/atom"
import { BaseScreen, Row } from "../../lib/styled"

export default () => {
  const navigate = useNavigate()
  const me = useRecoilValue(__me)
  const [modal_exit, set_modal_exit] = useState<boolean>(false)
  const changePage = (e:React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLDivElement).textContent as string
    if(target === "회원정보수정") navigate('modify', {state: me})
    if(target === "내가 쓴 글") navigate('posts')
    if(target === "구매기록") navigate('purchase')
    if(target === "회원탈퇴") set_modal_exit(true)
  }
  return(
    <BaseScreen>
      <Row onClick={changePage} style={{backgroundColor: "red", justifyContent: "space-between"}}>
        <div>회원정보수정</div>
        <div>내가 쓴 글</div>
        <div>구매기록</div>
        <div>회원탈퇴</div>
      </Row>
      {modal_exit && <Modal.Exit isOpened={modal_exit} setIsOpened={set_modal_exit}/>}
    </BaseScreen>
  )
}