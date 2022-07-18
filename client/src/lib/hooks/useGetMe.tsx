import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import API from "../api"
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
          if(me) return console.log("me 존재")
          console.log("me 요청")
          const res = await API.users.me({session})
          if(!res) return set_session(undefined)
          set_me(res)
        }else{
          console.log("session 없음: 초기화")
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
  }, [session, me])
  return null
}