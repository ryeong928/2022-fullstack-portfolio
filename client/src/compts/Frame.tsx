import React, { useEffect } from "react"
import {FrameSelectBox} from '../lib/styled'

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
export default {
  SelectBox,
}