import React, {useState} from 'react'
import { IF_ImageData } from '../lib/IF'
import {InputMain, InputImage, InputDate} from '../lib/styled'
import IconCalendar from '../resources/IconCalendar.svg'
import Profile from '../resources/Profile.svg'
import IconCamera from '../resources/IconCamera.svg'

interface InputMainProps extends React.HTMLAttributes<HTMLInputElement>{
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
  readOnly?: boolean
  type?: string
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
interface InputImageProps extends React.HTMLAttributes<HTMLInputElement>{
  value: IF_ImageData[] | undefined
  setValue: React.Dispatch<React.SetStateAction<IF_ImageData[] | undefined>>
  count: number
}
const Image = (props: InputImageProps) => {
  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTag = e.currentTarget as HTMLInputElement
    const files = inputTag.files as FileList
    if(files){
      // 업로드용
      const uploadFile = files[0]
      // 미리보기용
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        // props useState
        const temp:IF_ImageData = {
          FormData: uploadFile,
          preview: event.currentTarget.result
        }
        props.setValue([temp])
        inputTag.value = ""
      }
      fileReader.readAsDataURL(files[0])
    }
  }
  return (
    <InputImage style={props.style}>
      <img src={Profile} />
      <img src={IconCamera} />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={selectImage}
        multiple={props.count === 1 ? false : true}
      />
    </InputImage>
  );
};
const Date = (props: InputMainProps) => {
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.currentTarget.value)
  }
  return (
    <InputDate placeholder={props.value ? "" : "true"}>
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
export default {
  Main,
  Image,
  Date,
}