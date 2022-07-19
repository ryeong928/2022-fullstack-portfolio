import React, { useEffect, useRef } from 'react'
import { createContext, useState } from 'react'
import {IF_loading} from '../lib/IF'
import styled from 'styled-components'
import Constants from '../lib/Constants'

export const LoadingContext = createContext<IF_loading>({
  isLoading: false,
  set_isLoading: (boolean) => {},
  set_loadingTime: (number) => {},
})

const StyledLoadingComponent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255,255,255,0.7);
  color: ${Constants.colors.pointColor1};
  z-index: 999;
  text-align: center;
  line-height: 99vh;
  font-size: 30px;
  font-weight: 500;
`
const LoadingComponent = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const onClick = (e:React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }
  useEffect(()=>{
    targetRef.current?.focus()
    document.body.setAttribute('style', 'overflow: hidden')
    return () => {document.body.setAttribute('style', 'overflow: auto')}
  }, [])
  return <StyledLoadingComponent onClick={onClick} ref={targetRef}>Loading...</StyledLoadingComponent>
}

export const LoadingStore = (props:any) => {
  const [isLoading, set_isLoading] = useState<boolean>(false)
  const [loadingTime, set_loadingTime] = useState<number>(500)
  useEffect(()=>{
    let timer: undefined | ReturnType<typeof setTimeout>
    if(isLoading) timer = setTimeout(()=>{set_isLoading(prev => false)}, loadingTime)
    return () => {timer && clearTimeout(timer)}
  }, [isLoading])

  return(
    <LoadingContext.Provider value={{isLoading, set_isLoading, set_loadingTime}}>
      {isLoading && <LoadingComponent/>}
      {props.children}
    </LoadingContext.Provider>
  )
}