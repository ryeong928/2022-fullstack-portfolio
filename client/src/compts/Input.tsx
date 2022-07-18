import React, {useState} from 'react'
import { IF_ImageData } from '../lib/IF'
import {InputMain, InputImage, InputDate, InputTitle, InputArea, InputSearch, InputProfileImage} from '../lib/styled'
import Constants from '../lib/Constants'
import IconCalendar from '../resources/IconCalendar.svg'
import SVGProfile from '../resources/SVGProfile.svg'
import IconCamera from '../resources/IconCamera.svg'

interface InputMainProps extends React.HTMLAttributes<HTMLInputElement>{
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
  readOnly?: boolean
  type?: string
  reqSearch?: () => void // InputSearch
}
const Main = (props: InputMainProps) => {
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.currentTarget.value)
  }
  return(
    <InputMain 
    value={props.value} 
    onChange={onChange} 
    placeholder={props.placeholder || ""} 
    readOnly={props.readOnly}
    type={props.type || "text"} 
    spellCheck={false}
    style={props.style}
    />
  )
}
const Search = (props:InputMainProps) => {
  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.reqSearch()
  }
  return(
    <InputSearch onSubmit={onSubmit}>
      <Main value={props.value} setValue={props.setValue} placeholder={props.placeholder}/>
      <button type="submit">검색</button>
    </InputSearch>
  )
}
const Area = (props:InputMainProps) => {
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setValue(e.currentTarget.value)
  }
  return(
    <InputArea 
    value={props.value} 
    onChange={onChange} 
    placeholder={props.placeholder || ""} 
    readOnly={props.readOnly}
    spellCheck={false}
    style={props.style}
    />
  )
}
interface InputImageProps extends React.HTMLAttributes<HTMLInputElement>{
  value: IF_ImageData[]
  setValue: React.Dispatch<React.SetStateAction<IF_ImageData[]>>
  count: number
  setDeleteImg?: React.Dispatch<React.SetStateAction<string[]>>
}
const Image = (props:InputImageProps) => {
  const selectImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    const inputTag = e.currentTarget as HTMLInputElement
    const files = inputTag.files as FileList
    if(!files) return
    for(let i=0; i<files.length ;i++){
      // 업로드용
      const uploadFile = files[i]
      // 미리보기용
      const fileReader = new FileReader()
      fileReader.onload = (event: any) => {
        // state로 관리
        const temp:IF_ImageData = {
          file: uploadFile,
          preview: event.currentTarget.result
        }
        // 단일 | 복수 에 따른 로직 분리
        if(props.count === 1) props.setValue([temp])
        else if(props.count > 1) props.setValue(prev => [...prev, temp])
        // input value 초기화
        inputTag.value = ""
      }
      fileReader.readAsDataURL(files[i])
    }
  }
  return (
    <input
      type="file"
      accept="image/png, image/jpeg"
      onChange={selectImage}
      multiple={props.count === 1 ? false : true}
    />
  )
}
const ProfileImage = (props:InputImageProps) => {
  const previewImg:string | undefined = props.value[0].preview
  // 이미지 선택 로직
  const selectImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    const inputTag = e.currentTarget as HTMLInputElement
    const files = inputTag.files as FileList
    if(!files) return
    // 업로드용
    props.setValue(prev => [{...prev[0], file: files[0]}])
    // 미리보기용
    const fileReader = new FileReader()
    fileReader.onload = (event:any) => {
      props.setValue(prev => [{...prev[0], preview: event.currentTarget.result}])
      // input value 초기화
      inputTag.value = ""
    }
    fileReader.readAsDataURL(files[0])
  }
  // 이미지 선택 취소
  const deleteImage = () => {
    if(props.setDeleteImg && props.value[0].preview && !props.value[0].preview.startsWith('data:')) props.setDeleteImg([props.value[0].preview])
    props.setValue([{file: undefined, preview: undefined}])
  }
  return(
    <InputProfileImage style={props.style} placeholder={props.value ? "image" : ""}>
      {previewImg ? (
        <img src={previewImg.startsWith("data:") ? previewImg : Constants.URI.img + previewImg} />
        ) : <img src={SVGProfile} />
      }
      <input type="file" accept="image/png, image/jpeg" onChange={selectImage} />
      {previewImg && <button onClick={deleteImage}>이미지 삭제</button>}
    </InputProfileImage>
  )
}
const Date = (props: InputMainProps) => {
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.currentTarget.value)
  }
  return (
    <InputDate style={props.style} placeholder={props.value ? "" : "true"}>
      <div>{props.value || props.placeholder}</div>
      <img src={IconCalendar} />
      <input 
        value={props.value} 
        onChange={onChange} 
        type="date"
        spellCheck={false}
      />
    </InputDate>
  )
}
const Title = (props: InputMainProps) => {
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.currentTarget.value)
  }
  return(
    <InputTitle
    value={props.value} 
    onChange={onChange} 
    placeholder={props.placeholder || ""} 
    readOnly={props.readOnly}
    type={"text"} 
    spellCheck={false}
    style={props.style}
    />
  )
}
export default {
  Main,
  Search,
  Area,
  Image,
  ProfileImage,
  Date,
  Title,
}