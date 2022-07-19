import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import useGetMe from './lib/hooks/useGetMe'
import About from './screens/About'
import Commu from './screens/Commu'
import PostDetail from './screens/Commu/PostDetail'
import PostWrite from './screens/Commu/PostWrite'
import Home from './screens/Home'
import Register from './screens/Register'
import MyPage from './screens/MyPage'
import MyPosts from './screens/MyPage/MyPosts'

export default () => {
  const location = useLocation()
  useGetMe()
  return(
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/commu" element={<Commu />} />
      <Route path="/commu/:_id" element={<PostDetail />} />
      <Route path="/commu/write" element={<PostWrite />} />
      <Route path="/commu/modify" element={<PostWrite />} />
      <Route path="/about" element={<About />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/modify" element={<Register />} />
      <Route path="/mypage/posts" element={<MyPosts />} />
    </Routes>
  )
}

