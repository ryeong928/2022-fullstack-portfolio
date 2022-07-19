import React, { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE, useRecoilValue } from "recoil"
import { LoadingContext } from "../../context/LoadingContext"
import API from "../../lib/api"
import { __me, __session } from "../../lib/atom"
import { IF_ImageData, IF_postDetail, IF_reqPostModify, IF_reqPostWrite } from "../../lib/IF"
import { BaseScreen, PointFont, PostWriteContainer } from "../../lib/styled"
import Input from '../../compts/Input'
import Constants from "../../lib/Constants"
import Button from "../../compts/Button"

export default () => {
  const {isLoading, set_isLoading} = useContext(LoadingContext)
  const navigate = useNavigate()
  const props = useLocation().state as IF_postDetail | null
  const me = useRecoilValue(__me)
  const session = useRecoilValue(__session)
  const [title, set_title] = useState<string>("")
  const [content, set_content] = useState<string>("")
  const [img, set_img] = useState<IF_ImageData[]>([])
  const [deleteImg, set_deleteImg] = useState<string[]>([])
  // 게시글 등록 | 수정
  const reqWrite = (e:React.MouseEvent<HTMLButtonElement>) => {
    if(!session) return window.alert("로그인이 필요합니다")
    if(isLoading) return
    if(!title) return window.alert("제목을 작성해주세요")
    if(!content) return window.alert("내용을 작성해주세요")
    const formData = new FormData()
    for(let image of img){
      if(image.file) formData.append('img', image.file)
    }
    if(props){
      const params:IF_reqPostModify = {_id: props._id, session, title, content, deleteImg}
      formData.append('params', JSON.stringify(params))
      API.posts.modify(formData).then(res => {
        if(!res) return
        navigate(`/commu/${props._id}`)
      })
    }else{
      const params:IF_reqPostWrite = {session, title, content}
      formData.append('params', JSON.stringify(params))
      API.posts.write(formData).then(res => {
        if(!res) return
        navigate('/commu?search=&index=0&base=1')
      })
    }
    set_isLoading(prev => true)
  }
  // 등록한 이미지 삭제
  const imgDelete = (preview:string) => {
    const temp = [...img]
    const index = img.findIndex(image => image.preview === preview)
    const deleted = temp.splice(index, 1)
    if(!deleted[0].preview?.startsWith('data:')) set_deleteImg(prev => deleted[0].preview ? [...prev, deleted[0].preview] : [...prev])
    set_img(prev => temp)
  }
  // 게시글 수정 props 할당
  useEffect(()=>{
    if(!props) return
    set_title(props.title)
    set_content(props.content)
    if(props.img[0]){
      const temp:IF_ImageData[] = props.img.map(image => ({file: undefined, preview: image}))
      set_img(temp)
    }
  }, [props])
  return(
    <BaseScreen placeholder="800px">
      <PointFont>{props ? "글 수정" : "글 쓰기"}</PointFont>
      <PostWriteContainer>
        <section><Input.Main value={title} setValue={set_title} placeholder="제목" border={true}/></section>
        <section><Input.Area value={content} setValue={set_content} placeholder="제목" /></section>
        <section>
          <sub>이미지를 영역에 드래그하거나<br/>영역을 클릭하여 파일을 올려주세요</sub>
          <Input.Image value={img} setValue={set_img} count={3} />
          {img.map((image, index) => (
            <div key={'preview_' + index} className={image.preview ? "preview_img" : ""}>
              {image.preview && (
                <>
                <img src={image.preview.startsWith("data:") ? image.preview : Constants.URI.img + image.preview} />
                <div onClick={()=>{image.preview && imgDelete(image.preview)}}>이미지 삭제</div>
                </>
              )}
            </div>
          ))}
        </section>
        <section><Button.Main onClick={reqWrite}>{props ? "글 수정" : "글 쓰기"}</Button.Main></section>
      </PostWriteContainer>
    </BaseScreen>
  )
}