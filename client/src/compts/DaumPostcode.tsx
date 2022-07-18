import React, {useState, useEffect} from 'react'
import DaumPostcode, { Address} from 'react-daum-postcode'
import styled from 'styled-components'
import Constants from '../lib/Constants'

// DaumPostcode props
// onComplete : 주소 선택시 실행되는 함수
// autoClass<boolean> : 주소 선택시 주소검색창 닫힘
// defaultQuery<string> : 검색 기본값
// style<React.CSSProperties : 스타일 객체

interface DaumPostcodeProps {
  setPostCode: React.Dispatch<React.SetStateAction<Address | undefined>>
}
export default (props:DaumPostcodeProps) => {
  const [isOpened, set_isOpened] = useState<boolean>(false)
  // 주소 선택
  const selectAddress = (address: Address) => {
    console.log(address)
    if(props.setPostCode) props.setPostCode(address)
    set_isOpened(false)
  }
  // 외부 스크롤 방지
  useEffect(()=>{
    if(isOpened) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "unset"
  }, [isOpened])
  return (
    <div>
      <OpenButton onClick={()=>{set_isOpened(true)}}>검색</OpenButton>
      {isOpened && (
        <Fixed>
          <DaumPostcode
            style={{height: "calc(100% - 60px)"}}
            onComplete={selectAddress}
            autoClose={false}
          />
          <CloseButton onClick={()=>{set_isOpened(false)}}>닫기</CloseButton>
        </Fixed>
      )}
    </div>
  )
}

const OpenButton = styled.button`
  font-size: 16px;
  width: 76px;
  height: 40px;
  color: ${Constants.colors.pointColor1};
  background-color: ${Constants.colors.baseColor9};
  outline: none;
  border-radius: 10px;
  border: 1px solid ${Constants.colors.pointColor1};
  cursor: pointer;
  -webkit-transition: 0.2s;
  &:hover{
    background-color: ${Constants.colors.pointColor1};
    color: white;
  }
`
const Fixed = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: rgba(0,0,0,0.5);
`
const CloseButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  height: 60px;
  color: white;
  border: none;
  outline: none;
  background-color: ${Constants.colors.pointColor1};
  cursor: pointer;
  -webkit-transition: 0.2s;
  &:hover{
    background-color: ${Constants.colors.pointDeep};
  }
`