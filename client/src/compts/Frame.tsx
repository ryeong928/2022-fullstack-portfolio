import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import { __pagination } from "../lib/atom"
import { IF_pagination } from "../lib/IF"
import {FrameSelectBox, FramePostPagination} from '../lib/styled'
import {ReactComponent as ArrowLeft} from '../resources/ArrowLeft.svg'
import {ReactComponent as ArrowRight} from '../resources/ArrowRight.svg'

interface SelectBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  list: string[]
  option: string[] | undefined
  setOption: React.Dispatch<React.SetStateAction<string[] | undefined>>
  // 단일 선택 | 복수 선택
  multiple?: boolean
  row?: string
  col?: string
  gap?: string
}
const SelectBox = (props: SelectBoxProps) => {
  const selectItem = (e:React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement)
    if(target?.localName !== "button") return
    const item = target.textContent as string
    const index = props.option?.indexOf(item)
    if(index === -1 || index === undefined) {
      if(props.multiple) props.setOption(prev => prev ? [...prev, item] : [item])
      else props.setOption([item])
    } else if(props.option) {
      if(props.option.length === 1) props.setOption(undefined)
      else {
        const temp = [...props.option]
        temp.splice(index, 1)
        props.setOption([...temp])
      }
    }
  }
  return(
    <FrameSelectBox style={props.style} onClick={selectItem} row={props.row} col={props.col} gap={props.gap}>
      {props.list.map(item => <button key={`selectBox_item_${item}`} className={props.option?.includes(item) ? "selectBox_selected" : ""}>{item}</button>)}
    </FrameSelectBox>
  )
}
const PostPagination = () => {
  const [pagination, set_pagination] = useRecoilState(__pagination)
  // pageLength가 기존에 설정한 pageCount보다 작으면 pageLength값을 pageCount로 설정
  const pageLength = Math.ceil(pagination.count/pagination.countPerPage)
  useEffect(()=>{
    if(pageLength < pagination.pageCount) set_pagination(prev => ({...prev, pageCount: pageLength}))
  }, [pageLength])
  // 화살표 클릭시
  const clickArrow = (e:React.MouseEvent<HTMLOrSVGElement>) => {
    const action = e.currentTarget.dataset.action as string
    // 감소
    if(action === "-1"){
      if(pagination.currentIndex !== 0) set_pagination(prev => ({...prev, currentIndex: prev.currentIndex -1}))
      else if(pagination.base !== 1) set_pagination(prev => ({...prev, base: pagination.base -1}))
    }
    // 증가
    if(action === "1"){
      if(pagination.currentIndex !== (pagination.pageCount -1)) set_pagination(prev => ({...prev, currentIndex: prev.currentIndex +1}))
      else if((pagination.currentIndex + pagination.base) !== pageLength) set_pagination(prev => ({...prev, base: pagination.base +1}))
    }
  }
  // 페이지 인덱스 클릭시
  const clickPageIndex = (e:React.MouseEvent<HTMLDivElement>) => {
    const index = e.currentTarget.textContent as string
    if(!index) console.log("잉, 그럴리가?")
    set_pagination(prev => ({...prev, currentIndex: parseInt(index) - pagination.base}))
  }
  return(
    <FramePostPagination>
      <ArrowLeft data-action={"-1"} onClick={clickArrow}/>
      <section>{Array.from({length: pagination.pageCount}).map((item, index) => (
        <div 
          key={`post_pagination_${index}`} 
          className={pagination.currentIndex === index ? "pagination_current_index" : ""} 
          onClick={clickPageIndex} 
        >{index + pagination.base}</div>))}
      </section>
      <ArrowRight data-action={"1"} onClick={clickArrow}/>
    </FramePostPagination>
  )
}
export default {
  SelectBox,
  PostPagination,
}