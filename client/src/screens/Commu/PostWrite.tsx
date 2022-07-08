import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import styled from "styled-components"
import Button from "../../compts/Button"
import Input from "../../compts/Input"
import { __me, __pagination, __session } from '../../lib/atom'
import { BaseScreen, PointFont } from "../../lib/styled"
import {IF_req_post} from '../../lib/IF'
import {req_post} from '../../lib/api'

export default () => {
  const navigate = useNavigate()
  const session = useRecoilValue(__session)
  const me = useRecoilValue(__me)
  const reset_pagination = useResetRecoilState(__pagination)
  const [title, set_title] = useState<string>("")
  const [content, set_content] = useState<string>("")
  // 게시글 등록 API
  const [isLoading, set_isLoading] = useState<boolean>(false)
  const reqPost = () => {
    if(isLoading) return
    if(!me || !session) return window.alert("로그인이 필요합니다")
    set_isLoading(prev => true)
    const params:IF_req_post = {
      session,
      _id: me._id,
      title,
      content
    }
    req_post(params).then(res => {
      console.log(res)
      if(!res) return console.log("에러")
      reset_pagination()
      navigate(-1)
    })
  }
  return(
    <BaseScreen>
      <PointFont>글쓰기</PointFont>
      <ResponsiveCol>
        <Input.Title value={title} setValue={set_title} placeholder={"제목"}/>
        <Input.Area value={content} setValue={set_content} placeholder={"내용..."}/>
        <button>이미지등록</button>
        <Button.Main onClick={reqPost}>작성하기</Button.Main>
      </ResponsiveCol>
    </BaseScreen>
  )
}

const ResponsiveCol = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 900px;
  margin: 20px 0;
`