import {Route, Routes, useLocation} from 'react-router-dom'
import useGetMe from './lib/hooks/useGetMe'
import About from './screens/About'
import Commu from './screens/Commu'
import PostDetail from './screens/Commu/PostDetail'
import PostWrite from './screens/Commu/PostWrite'
import Home from './screens/Home'
import Products from './screens/Products'
import Register from './screens/Register'

export default () => {
  const location = useLocation()
  useGetMe()
  return(
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/commu" element={<Commu />} />
      <Route path="/commu/:_id" element={<PostDetail />} />
      <Route path="/commu/write" element={<PostWrite />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}