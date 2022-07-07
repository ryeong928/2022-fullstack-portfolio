import {Route, Routes, useLocation} from 'react-router-dom'
import useGetMe from './lib/hooks/useGetMe'
import About from './screens/About'
import Commu from './screens/Commu'
import Home from './screens/Home'
import MyPage from './screens/MyPage'
import Products from './screens/Products'
import Ranking from './screens/Ranking'
import Register from './screens/Register'

export default () => {
  const location = useLocation()
  useGetMe()
  return(
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/commu" element={<Commu />} />
      <Route path="/about" element={<About />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  )
}