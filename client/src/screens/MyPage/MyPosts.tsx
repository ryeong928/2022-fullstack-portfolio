import React, {useState, useEffect, useContext, useRef, useLayoutEffect} from "react"
import {useNavigate, useSearchParams} from 'react-router-dom'
import { useRecoilValue } from "recoil"
import { LoadingContext } from "../../context/LoadingContext"
import API from "../../lib/api"
import Constants from "../../lib/Constants"
import { __me, __session } from "../../lib/atom"
import { IF_post} from "../../lib/IF"
import { BaseScreen, PointFont, Font13, PostsContainer, Font12, Font16, Center } from "../../lib/styled"

export default () => {
  const navigate = useNavigate()
  const targetRef = useRef<HTMLDivElement>(null)
  const me = useRecoilValue(__me)
  const [posts, set_posts] = useState<IF_post[] | undefined>()
  const [page, set_page] = useState<number>(1)
  const [count, set_count] = useState<number>(0)
  useEffect(()=>{
    if(!me || !page) return
    if(count === posts?.length) return
    console.log(page, '페이지 불러오기')
    API.posts.my(me._id, String(page)).then(res => {
      if(!res) return
      if(res.count !== count) set_count(res.count)
      if(res.posts.length === 0) return
      set_posts(prev => {
        if(prev) return [...prev, ...res.posts]
        else return res.posts
      })
    })
  }, [page])
  useEffect(()=>{
    if(!targetRef.current) return
    const observer = new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        set_page(prev => prev + 1)
      }
    })
    observer.observe(targetRef.current)
    return () => observer.disconnect()
  }, [posts])
  return(
    <BaseScreen placeholder="800px">
      <PointFont>내가 쓴 글</PointFont>
      <Font13 style={{marginBottom: 10}}>총 {count}개의 게시글</Font13>
        <PostsContainer>
          {posts && posts.length !== 0 && posts.map((post, index) => (
            <section key={post._id} onClick={()=>{navigate(`/commu/${post._id}`)}} ref={index+1===posts.length ? targetRef : undefined}>
              <Font16>{post.title}</Font16>
              <div>
                <Font12>{post.writer.nickname}</Font12>
                <Font12>댓글: {post.commentCount}</Font12>
                <Font12>좋아요: {post.likes}</Font12>
                <Font12>조회수: {post.views}</Font12>
                <Font12>{post.date}</Font12>
              </div>
            </section>
          ))}
        </PostsContainer>
        {posts?.length === 0 && <Center style={{height: "calc(100% - 200px)"}}><div style={{color: Constants.colors.baseColor5}}>게시글이 없습니다</div></Center>}
    </BaseScreen>
  )
}