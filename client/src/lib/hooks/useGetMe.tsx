import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { req_me } from "../api"
import { __me, __session } from "../atom"

export default () => {
  const navigate = useNavigate()
  const [me, set_me] = useRecoilState(__me)
  const [session, set_session] = useRecoilState(__session)
  // 새로고침 대응
  useEffect(()=>{
    const refresh = async () => {
      try{
        console.log("session 탐색")
        if(session){
          console.log("session 존재")
          const res = await req_me(session)
          set_me(res)
        }else{
          set_me(undefined)
        }
      }catch(err){
        console.log("session 오류")
        console.log(err)
        window.alert(err)
        set_session(undefined)
        set_me(undefined)
      }
    }
    refresh()
  }, [session])
  // me 없으면 홈으로 이동
  useEffect(()=>{
    if(!me) navigate('/', {replace: true})
  }, [me])
  return null
}