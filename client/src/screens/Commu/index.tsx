import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import API from "../../lib/api"
import { __me, __session } from "../../lib/atom"
import { IF_post } from "../../lib/IF"
import { BaseScreen, PointFont, PostsContainer, PostActionContainer, FramePostPagination, Center, Font12, Font14, Font16, Font13} from "../../lib/styled"
import Frame from '../../compts/Frame'
import Input from "../../compts/Input"
import Button from "../../compts/Button"
import Constants from "../../lib/Constants"
import { LoadingContext } from "../../context/LoadingContext"
import SVGHeart from '../../resources/SVGHeart.svg'

export default () => {
  const navigate = useNavigate()
  const {isLoading, set_isLoading} = useContext(LoadingContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const {search, index, base} = Object.fromEntries([...searchParams])
  const me = useRecoilValue(__me)
  const session = useRecoilValue(__session)
  const [posts, set_posts] = useState<IF_post[] | undefined>()
  const [count, set_count] = useState<number>(0)
  const [searchValue, set_searchValue] = useState<string>("")
  useEffect(()=>{
    const reqPosts = () => {
      if(search){
        if(isLoading) return
        set_isLoading(prev => true)
      }
      const page = Number(index) + Number(base)
      API.posts.posts(search, page).then(res => {
        if(!res) return
        console.log(res)
        set_searchValue("")
        set_posts(res.posts)
        set_count(res.count)
      })
    }
    reqPosts()
  }, [search, index, base])
  // 제목 검색
  const reqSearch = () => {
    setSearchParams({search: searchValue, index: String(0), base: String(1)})
  }
  // 글쓰기 버튼 클릭
  const postWrite = () => {
    if(!session) return window.alert("로그인이 필요합니다")
    navigate('write')
  }
  console.log(posts)
  return(
    <BaseScreen placeholder="800px">
      <PointFont>게시판</PointFont>
      <Font13 style={{marginBottom: 10}}>총 {count}개의 게시글</Font13>
      {posts && posts.length !== 0 ? (
        <PostsContainer>
          {posts.map(post => (
            <section key={post._id} onClick={()=>{navigate(post._id)}}>
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
      ) : <Center style={{height: "calc(100% - 200px)"}}><div style={{color: Constants.colors.baseColor5}}>게시글이 없습니다</div></Center>}
      <PostActionContainer>
        <section>{count !== 0 && <Frame.Pagination1 count={count} pageCount={3} countPerPage={5} variation={1}/>}</section>
        <section><Input.Search value={searchValue} setValue={set_searchValue} placeholder="제목 검색" reqSearch={reqSearch}/></section>
        <section><Button.Sub color="white" onClick={postWrite}>글쓰기</Button.Sub></section>
      </PostActionContainer>
    </BaseScreen>
  )
}