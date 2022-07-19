import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { LoadingContext } from "../../context/LoadingContext"
import API from "../../lib/api"
import Input from "../../compts/Input"
import Frame from "../../compts/Frame"
import { __me, __session } from "../../lib/atom"
import Constants from "../../lib/Constants"
import { IF_comment, IF_pagination, IF_postDetail, IF_reqPostDelete, IF_reqPostLike, IF_reqCommentModify, IF_reqCommentWrite, IF_reqCommentDelete} from "../../lib/IF"
import { BaseScreen, PostDetailContainer, CommentsBox, ColCen } from "../../lib/styled"
import SVGProfile from '../../resources/SVGProfile.svg'
import SVGHeart from '../../resources/SVGHeart.svg'
import SVGHeartFilled from '../../resources/SVGHeartFilled.svg'
import Button from "../../compts/Button"

export default () => {
  const {isLoading, set_isLoading} = useContext(LoadingContext)
  const navigate = useNavigate()
  const {_id} = useParams()
  const session = useRecoilValue(__session)
  const me = useRecoilValue(__me)
  const [post, set_post] = useState<IF_postDetail | undefined>()
  const [likes, set_likes] = useState<number>(0)
  const [isLike, set_isLike] = useState<boolean>(false)
  const [comments, set_comments] = useState<IF_comment[]>([])
  const [content, set_content] = useState<string>("")
  const [content_modify, set_content_modify] = useState<string>("")
  const [isModify, set_isModify] = useState<string>("")
  const [pagination_comment, set_pagination_comment] = useState<IF_pagination>({count: 0, countPerPage: 3, pageCount: 3, variation: 3, index: 0, base: 1})
  // 게시글 요청
  useEffect(()=>{
    if(!_id) return
    API.posts.post(_id, me?._id).then(res => {
      if(!res) return
      console.log(res)
      const {likes, isLike, comments} = res
      set_likes(likes)
      set_isLike(isLike)
      set_comments(comments)
      set_pagination_comment(prev => ({...prev, count: comments.length}))
      set_post(res)
    })
  }, [_id])
  // 게시글 수정
  const postModify = () => {
    if(!_id || !post) return window.alert("게시글이 없습니다")
    if(!session || !me) return window.alert("로그인이 필요합니다")
    if(post.writer._id !== me._id) return window.alert("권한이 없습니다")
    navigate('/commu/modify', {state: post})
  }
  // 게시글 삭제
  const postDelete = () => {
    if(isLoading) return
    if(!_id || !post) return window.alert("게시글이 없습니다")
    if(!session || !me) return window.alert("로그인이 필요합니다")
    if(post.writer._id !== me._id) return window.alert("권한이 없습니다")
    if(!window.confirm("게시글을 삭제하시겠습니까?")) return
    set_isLoading(prev => true)
    const params:IF_reqPostDelete = {session, _id}
    API.posts.delete(params).then(res => {
      if(!res) return
      navigate('/commu?search=&index=0&base=1', {replace: true})
    })
  }
  // 게시글 좋아요
  const postLike = () => {
    if(!post || !_id) return window.alert("게시글이 없습니다")
    if(!session) return window.alert("로그인이 필요합니다")
    const params:IF_reqPostLike = {_id, session, isLike}
    API.posts.like(params)
    set_isLike(prev => {
      if(prev) set_likes(prev => prev - 1)
      else set_likes(prev => prev + 1)
      return !prev
    })
  }
  // 코멘트 생성
  const commentWrite = () => {
    if(isLoading) return
    if(!content) return window.alert("댓글 내용이 없습니다")
    if(!_id || !post) return window.alert("게시글이 없습니다")
    if(!session || !me) return window.alert("로그인이 필요합니다")
    set_isLoading(prev => true)
    const params:IF_reqCommentWrite = {post_id: _id, session, content}
    API.comments.write(params).then(res => {
      if(!res) return
      window.alert("댓글 생성 완료")
      set_comments(res)
      set_pagination_comment(prev => ({...prev, count: res.length}))
      set_content("")
    })
  }
  // 코멘트 수정모드
  const commentModifyMode = (e:React.MouseEvent<HTMLButtonElement>, comment:IF_comment) => {
    if(!_id || !post) return window.alert("게시글이 없습니다")
    if(!session || !me) return window.alert("로그인이 필요합니다")
    const action = e.currentTarget.textContent
    if(!action) return
    if(action === "수정"){
      set_isModify(comment._id)
      set_content_modify(comment.content)
    }else if(action === "취소"){
      set_isModify("")
      set_content_modify("")
    }
  }
  // 코멘트 수정
  const commentModify = (comment:IF_comment) => {
    if(!_id) return window.alert("게시글이 없습니다")
    if(!session) return window.alert("재 로그인 해주세요")
    const params:IF_reqCommentModify = {
      _id: comment._id, 
      post_id: _id, 
      session, 
      content: content_modify
    }
    API.comments.modify(params).then(res => {
      if(!res) return
      window.alert("댓글 수정 완료")
      set_comments(prev => {
        const temp = [...prev]
        const target = temp.find(item => item._id === comment._id)
        if(!target) return
        target.content = content_modify
        return temp
      })
      set_isModify("")
      set_content_modify("")
    })
  }
  // 코멘트 삭제
  const commentDelete = (comment:IF_comment) => {
    if(!_id || !post) return window.alert("게시글이 없습니다")
    if(!session || !me) return window.alert("로그인이 필요합니다")
    if(me._id !== comment.writer._id) return window.alert("권한이 없습니다")
    if(!window.confirm("댓글을 삭제하시겠습니까?")) return 
    const params:IF_reqCommentDelete = {
      _id: comment._id, 
      post_id: _id, 
      session, 
    }
    API.comments.delete(params).then(res => {
      if(!res) return
      window.alert("댓글 삭제 완료")
      set_comments(prev => {
        const temp = [...prev]
        const idx = temp.findIndex(item => item._id === comment._id)
        if(idx === -1) return
        temp.splice(idx, 1)
        return temp
      })
      set_isModify("")
      set_content_modify("")
    })
  }
  const commentLike = (comment:IF_comment) => {
    if(!_id || !post) return window.alert("게시글이 없습니다")
    if(!session || !me) return window.alert("로그인이 필요합니다")
    window.alert("좋아요!")
  }
  return(
    <BaseScreen placeholder="800px">
    <PostDetailContainer color={isLike ? "like" : ""}>
      {post ? (
        <>
          <section>
            <div>{post.title}</div>
            <div>
              <div><img src={post.writer.img ? Constants.URI.img + post.writer.img : SVGProfile} /></div>
              <div>{post.writer.nickname}</div>
              <div>조회수:{post.views}</div>
              <div>{post.date}</div>
            </div>
          </section>
          <section>
            <div>{post.img.map(image => <img src={Constants.URI.img + image} key={image}/>)}</div>
            <div>{post.content}</div>
            <ColCen onClick={postLike}>
              <img src={isLike ? SVGHeartFilled : SVGHeart} />
              <div>{likes}</div>
            </ColCen>
            {me?._id === post.writer._id ? (
              <>
                <Button.Sub color="white" onClick={postModify}>수정</Button.Sub>
                <Button.Sub color="white" onClick={postDelete}>삭제</Button.Sub>
              </>
            ) : null}
          </section>
          <section>
            {comments?.length !== 0 ? comments.slice((pagination_comment.index + pagination_comment.base - 1)*pagination_comment.countPerPage, ((pagination_comment.index + pagination_comment.base - 1)*pagination_comment.countPerPage) + pagination_comment.countPerPage).map(comment => (
              <CommentsBox key={comment._id}>
                <header>
                  <div>{comment.writer.img ? <img src={Constants.URI.img + comment.writer.img} /> : <img src={SVGProfile} />}</div>
                  <div>{comment.writer.nickname}</div>
                  <div>좋아요:{comment.likes}</div>
                  <div>{comment.date}</div>
                </header>
                <main>
                  {isModify === comment._id ? (
                    <Input.Area value={content_modify} setValue={set_content_modify} style={{height: "100px"}}/>
                  ) : <>{comment.content}</>}
                </main>
                {me?._id === comment.writer._id && (
                  <sub>
                    <Button.Sub color="white" onClick={() => {commentLike(comment)}}>좋아요</Button.Sub>
                    <Button.Sub color="white" onClick={(e)=>{commentModifyMode(e, comment)}}>{isModify === comment._id ? "취소" : "수정"}</Button.Sub>
                    <Button.Sub color="white" onClick={()=>{commentDelete(comment)}}>삭제</Button.Sub>
                  </sub>
                )}
                {isModify === comment._id && <button onClick={()=>{commentModify(comment)}}>수정하기</button>}
              </CommentsBox>
            )) : <div style={{color: 'gray', margin: "20px 0"}}>코멘트가 없습니다</div>}
            <div>
              {comments.length !== 0 && <Frame.Pagination2 pagination={pagination_comment} setPagination={set_pagination_comment}/>}
            </div>
          </section>
          <section>
            <Input.Area value={content} setValue={set_content} placeholder="내용" style={{height: "100px"}} />
            <Button.Sub onClick={commentWrite}>댓글 등록</Button.Sub>
          </section>
        </>
      ) : <sub>게시글이 없습니다</sub>}
    </PostDetailContainer>
    </BaseScreen>
  )
}