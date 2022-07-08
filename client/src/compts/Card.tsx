import { useNavigate } from 'react-router-dom'
import {IF_post} from '../lib/IF'
import {CardHotPost, CardPost, Font12, Font15, Font16, Font10, Font14} from '../lib/styled'

const HotPost = (props:IF_post) => {
  return(
    <CardHotPost color={props.img ? "img" : ""}>
      {props.img && <img src={props.img[0]} />}
      <div>
        <Font15>{props.title}</Font15>
        <Font14>{props.likes}</Font14>
        <Font14>{props.views}</Font14>
        <Font12>{props.writer.nickname}</Font12>
      </div>
    </CardHotPost>
  )
}
const Post = (props:IF_post) => {
  const navigate = useNavigate()
  return(
    <CardPost onClick={()=>{navigate(props._id)}}>
      <Font14 placeholder="ellipsis">{props.title}</Font14>
      <section>
        <Font10>{props.writer.nickname}</Font10>
        <Font10>좋아요: {props.likes}</Font10>
        <Font10>조회수: {props.views}</Font10>
        <Font10>{props.date}</Font10>
      </section>
    </CardPost>
  )
}
export default {
  HotPost,
  Post,
}