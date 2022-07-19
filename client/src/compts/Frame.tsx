import React, { useEffect, useState } from "react"
import {FrameSelectBox, FramePagination} from '../lib/styled'
import {IF_pagination, IF_paginationConstants, IF_paginationVariables} from '../lib/IF'
import { useSearchParams } from "react-router-dom"
import {ReactComponent as ArrowRight} from '../resources/ArrowRight.svg'
import {ReactComponent as ArrowLeft} from '../resources/ArrowLeft.svg'

interface SelectBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  list: string[]
  option: string[]
  setOption: React.Dispatch<React.SetStateAction<string[]>>
  // 단일 선택 | 복수 선택
  multiple?: boolean
  row: string
  col: string
  gap: string
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
      if(props.option.length === 1) props.setOption([])
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
const Pagination1 = (props:IF_paginationConstants) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {search, index, base} = Object.fromEntries([...searchParams])
  const [current, set_current] = useState<IF_paginationVariables>({index: 0, base: 1})
  const {count, countPerPage, variation} = props
  const pageLength = Math.ceil(count/countPerPage)
  const [pageCount, set_pageCount] = useState<number>(props.pageCount)
  // query string 값에 따라 페이지내이션 값 변경
  useEffect(()=>{
    if(index && base) {
      set_pageCount(prev => pageLength < props.pageCount ? pageLength : props.pageCount)
      set_current({index: Number(index), base: Number(base)})
    }
  }, [index, base, count])
  // 화살표 클릭시
  const clickArrow = (e:React.MouseEvent<HTMLOrSVGElement>) => {
    const action = e.currentTarget.dataset.action
    // 왼쪽 클릭시
    if(action === "left"){
      if(current.index !== 0) setSearchParams({search, base, index: String(current.index - 1)})
      else if(current.base !== 1) setSearchParams({search, index, base: String(current.base - variation)})
    }
    // 오른쪽 클릭시
    if(action === "right"){
      if(current.index !== (pageCount -1)) setSearchParams({search, index: String(current.index + 1), base})
      else if((current.index + current.base) !== pageLength) setSearchParams({search, index, base: String(current.base + variation)})
    }
  }
  // 페이지 인덱스 클릭시
  const clickIndex = (e:React.MouseEvent<HTMLDivElement>) => {
    const index = e.currentTarget.textContent
    if(!index) return
    const cleanIndex = Number(index) - current.base
    setSearchParams({search, base, index: String(cleanIndex)})
  }
  return (
    <FramePagination>
      <ArrowLeft data-action={"left"} onClick={clickArrow} />
      <section>{Array.from({length: pageCount}).map((item, index) => (
        <div
          key={`pagination_posts_${index}`}
          className={current.index === index ? "pagination_currentIndex" : ""}
          onClick={clickIndex}
        >
          {index + current.base}
        </div>
      ))}</section>
      <ArrowRight data-action={"right"} onClick={clickArrow} />
    </FramePagination>
  )
}
interface Pagination2Props {
  pagination: IF_pagination
  setPagination: React.Dispatch<React.SetStateAction<IF_pagination>>
}
const Pagination2 = (props:Pagination2Props) => {
  const {count, countPerPage, pageCount, variation, index, base} = props.pagination
  const pageLength = Math.ceil(count/countPerPage)
  // 화살표 클릭시
  const clickArrow = (e:React.MouseEvent<HTMLOrSVGElement>) => {
    const action = e.currentTarget.dataset.action
    if(action === "left"){
      if(base === 1) return
      props.setPagination(prev => ({...prev, index: pageCount - 1, base: (base - variation)}))
    }
    if(action === "right"){
      if((base*pageCount) >= pageLength) return
      props.setPagination(prev => ({...prev, index: 0, base: (base + variation)}))
    }
  }
  // 페이지 인덱스 클릭시
  const clickIndex = (e:React.MouseEvent<HTMLDivElement>) => {
    const clickedIndex = e.currentTarget.textContent
    if(!clickedIndex) return
    props.setPagination(prev => ({...prev, index: Number(clickedIndex) - prev.base}))
  }
  return(
    <FramePagination>
      <ArrowLeft data-action={"left"} onClick={clickArrow} />
      <section>
        {Array.from({length: pageCount}).map((item, idx) => idx + base <= pageLength ? (
          <div
            key={`pagination_comment_${idx}`}
            className={index === idx ? "pagination_currentIndex": ""}
            onClick={clickIndex}
          >{idx + base}</div>
        ) : null)}
      </section>
      <ArrowRight data-action={"right"} onClick={clickArrow} />
    </FramePagination>
  )
}
export default {
  SelectBox,
  Pagination1,
  Pagination2,
}