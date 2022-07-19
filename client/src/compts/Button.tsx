import React from 'react'
import {ButtonMain, ButtonSub, ButtonNotice1, ButtonNotice2, ButtonMove} from '../lib/styled'
import {ReactComponent as ArrowRight} from '../resources/ArrowRight.svg'

// 타입지정 ({children, ...rest}:{children: React.ReactNode} & React.HTMLAttributes<HTMLDivElement>)
interface ButtonMainProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  color?: "gray" | "white" | "deep"
  width?: string
}
const Main = (props:ButtonMainProps) => {
  const {color, width, ...rest} = props
  return(
    <ButtonMain color={color || ""} placeholder={width || ""} {...rest}>{props.children}</ButtonMain>
  )
}
const Sub = (props:ButtonMainProps) => {
  const {color, width, ...rest} = props
  return(
    <ButtonSub color={color || ""} placeholder={width || ""} {...rest}>{props.children}</ButtonSub>
  )
}
interface ButtonNoticeProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  color?: "blue" | "orange" | "red" | "green" | "gray"
  width?: string
}
const Notice1 = (props:ButtonNoticeProps) => {
  const {color, width, ...rest} = props
  return(
    <ButtonNotice1 color={color || ""} placeholder={width || ""} {...rest}>{props.children}</ButtonNotice1>
  )
}
const Notice2 = (props:ButtonNoticeProps) => {
  const {color, width, ...rest} = props
  return(
    <ButtonNotice2 color={color || ""} placeholder={width || ""} {...rest}>{props.children}</ButtonNotice2>
  )
}
const Move = (props:React.HTMLAttributes<HTMLDivElement>) => {
  return(
    <ButtonMove {...props}>
      <div>{props.children}</div>
      <ArrowRight />
    </ButtonMove>
  )
}
export default {
  Main,
  Sub,
  Notice1,
  Notice2,
  Move
}