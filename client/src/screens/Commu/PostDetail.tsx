import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { BaseScreen, PointFont } from "../../lib/styled"

export default () => {
  const {_id} = useParams()
  useEffect(()=>{
    if(_id){
      window.alert(_id, "불러오기!!")
    }
  }, [])
  return(
    <BaseScreen>
      <PointFont>게시글</PointFont>
    </BaseScreen>
  )
}