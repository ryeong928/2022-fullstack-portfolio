import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { __me } from "../../lib/atom"
import Constants from "../../lib/Constants"
import { BaseScreen, PointFont, ProfileImage } from "../../lib/styled"
import Profile from '../../resources/Profile.svg'

export default () => {
  const me = useRecoilValue(__me)
  useEffect(()=>{
    if(me){

    }
  }, [me])
  return(
    <BaseScreen>
      <PointFont>마이페이지</PointFont>
      <ProfileImage>{me?.img ? <img src={`${Constants.URI.images}${me.img}`} /> : <img src={Profile} />}</ProfileImage>
    </BaseScreen>
  )
}