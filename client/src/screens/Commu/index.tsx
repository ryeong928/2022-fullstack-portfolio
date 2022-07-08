import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useRecoilState } from 'recoil'
import styled from 'styled-components'
import Button from '../../compts/Button'
import Frame from '../../compts/Frame'
import Card from '../../compts/Card'
import Input from '../../compts/Input'
import { __me, __pagination, __session } from '../../lib/atom'
import Constants from '../../lib/Constants'
import {IF_member, IF_post, IF_pagination} from '../../lib/IF'
import { BaseScreen, Col, Font12, PointFont, Row } from "../../lib/styled"

const fakes_writer:IF_member = {
  _id: "1203djlas",
  id: "bori",
  nickname: "보리",
  img: `${Constants.URI.images}21ae1ed5-59ed-4c63-8d2b-a9341118a91c.jpeg`,
  points: 1546,
  date: "2022-04-59",
}
const fakes_posts_hot:IF_post[] = [
  {
    _id: "askdlaksdl0120",
    writer: fakes_writer,
    title: "첫 게시글입니다",
    content: "첫 게시글입니다",
    img: undefined,
    views: 10,
    date: "2022-07-08",
    likes: 9,
    comments: undefined
  },
  {
    _id: "askdlaksdl0120123",
    writer: fakes_writer,
    title: "두번째 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 ",
    content: "두번째 게시글입니다2",
    img: [`${Constants.URI.images}21ae1ed5-59ed-4c63-8d2b-a9341118a91c.jpeg`],
    views: 15,
    date: "2022-07-09",
    likes: 1,
    comments: undefined
  },
  {
    _id: "askdl12120123",
    writer: fakes_writer,
    title: "세번째 게시글입니다2 ",
    content: "세번째 게시글입니다2",
    img: undefined,
    views: 15,
    date: "2022-07-10",
    likes: 5,
    comments: undefined
  },
  {
    _id: "a12ksdl0120",
    writer: fakes_writer,
    title: "1 게시글입니다",
    content: "1 게시글입니다",
    img: undefined,
    views: 10,
    date: "2022-07-08",
    likes: 9,
    comments: undefined
  },
  {
    _id: "askdla123120123",
    writer: fakes_writer,
    title: "2 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 두번째 게시글입니다2 ",
    content: "2 게시글입니다2",
    img: [`${Constants.URI.images}21ae1ed5-59ed-4c63-8d2b-a9341118a91c.jpeg`],
    views: 15,
    date: "2022-07-09",
    likes: 1,
    comments: undefined
  },
]
export default () => {
  const navigate = useNavigate()
  const session = useRecoilValue(__session)
  const me = useRecoilValue(__me)
  const [pagination, set_pagination] = useRecoilState(__pagination)
  const [posts, set_posts] = useState<IF_post[] | undefined>(fakes_posts_hot)
  const [posts_hot, set_posts_hot] = useState<IF_post[] | undefined>(fakes_posts_hot)
  const [search, set_search] = useState<string>("")
  useEffect(()=>{
    const reqPosts = async () => {
      console.log("reqPosts")
      // 게시글 전체 갯수 받아와서 set_pagination(prev => ({...prev, count: res.count}))
    }
    const reqHotPosts = async () => {
      console.log("reqHotPosts")
    }
    Promise.all([reqPosts, reqHotPosts])
  }, [])
  // 글쓰기 페이지로 이동
  const changePage = () => {
    if(!me || !session) return window.alert("로그인이 필요합니다")
    navigate('write')
  }
  return(
    <BaseScreen>
      <PointFont>HOT</PointFont>
      <Row style={{gap: 10, flexWrap: "wrap", marginBottom: 40}}>
        {posts_hot?.map((post, index) => <Card.HotPost key={`hot_post_${index}`} {...post}/>)}
      </Row>
      <PointFont>게시판</PointFont>
      <Col style={{gap: 10, marginBottom: 10}}>
        {posts?.map((post, index) => <Card.Post key={post._id} {...post}/>)}
      </Col>
      <ResponsiveRow>
        <Input.Main value={search} setValue={set_search} placeholder="제목 검색" style={{width: 150}}>검색</Input.Main>
        {pagination.count !== 0 && <section><Frame.PostPagination /></section>}
        <Button.Sub width="80px" onClick={changePage}>글쓰기</Button.Sub>
      </ResponsiveRow>
    </BaseScreen>
  )
}

const ResponsiveRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > section{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 550px){
    margin-top: 40px;
    & > section{
      top: -40%;
    }
  }
`