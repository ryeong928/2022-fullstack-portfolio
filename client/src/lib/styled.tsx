import styled, {css} from "styled-components";
import Constants from './Constants'
import {GridProps} from './IF'

export const Row = styled.div`
  display: flex;
`
export const RowCen = styled(Row)`
  align-items: center;
`
export const Col = styled.div`
  display: flex;
  flex-direction: column;
`
export const ColCen = styled(Col)`
  align-items: center;
`
export const Center = styled(RowCen)`
  justify-content: center;
`
export const BaseScreen = styled.div`
  flex: 1;
  padding: 100px 40px 40px;
  @media (max-width: 450px){
    padding: 100px 20px 40px;
  }
`
export const Grid = styled.div<GridProps>`
  width: 100%;
  display: grid;
  grid-template-rows: ${(props) => props.row || ""};
  grid-template-columns: ${(props) => props.col || ""};
  gap: ${(props) => props.gap || "0"};
`;

// Common
export const CommonHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  z-index: 50;
  background-color: rgba(255,255,255,0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 6px 6px rgba(0,0,0,0.1);
  & > section{
    display: flex;
    gap: 10px;
    & > div{
      font-size: 15px;
      border: 2px solid transparent;
      transition: 0.2s;
      cursor: pointer;
      padding: 5px;
      &:hover{
        transform: translateY(-2px);
        color: ${Constants.colors.pointColor1};
      }
      @media (max-width: 450px){
        padding: 5px 0;
      }
    }
    & > div.current_path{
      font-weight: bold;
      border-bottom: 2px solid ${Constants.colors.pointColor1};
    }
  }
  @media (max-width: 450px){
    padding: 0 10px;
  }
`
export const CommonFooter = styled.div`
  background-color: ${Constants.colors.baseColor6};
  padding: 30px;
  & > div:nth-of-type(1){
    color: ${Constants.colors.baseColor2};
  }
  & > div:nth-of-type(2){
    width: 100%;
    height: 1px;
    background-color: ${Constants.colors.baseColor5};
    margin: 20px 0;
  }
  & > div:nth-of-type(3){
    & > div{
      font-size: 12px;
      color: ${Constants.colors.baseColor3};
    }
    & > div.footer_field{
      font-weight: 500;
      color: ${Constants.colors.baseColor2};
    }
  }
`
export const CommonLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255,255,255,0.5);
  color: ${Constants.colors.pointColor1};
  z-index: 999;
  text-align: center;
  line-height: 99vh;
  font-size: 20px;
  font-weight: 700;
`
// Modal
export const ModalMain = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  & > main {
    position: relative;
    overflow: hidden;
    width: 100%;
    margin: 20px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
`;
export const ModalLogin = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  top: 75px;
  right: 10px;
  z-index: 98;
  padding: 20px;
  background-color: white;
  border: 1px solid ${Constants.colors.baseColor6};
  border-radius: 8px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  & > section{
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
`
// Button
export const ButtonMain = styled.button`
  display: block;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  line-height: 47px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  pointer-events: ${props => props.disabled ? "none" : "auto"};
  outline: none;
  border-radius: 25px;
  border: 1px solid
  ${(props) => {
    switch (props.color) {
      case "gray":
        return Constants.colors.baseColor7;
      case "white":
        return Constants.colors.baseColor6;
      case "deep":
        return Constants.colors.pointDeep;
      default:
        return Constants.colors.pointColor1;
    }
  }};
  background-color: ${(props) => {
    switch (props.color) {
      case "gray":
        return Constants.colors.baseColor7;
      case "deep":
        return Constants.colors.pointDeep;
      case "white":
        return Constants.colors.baseColor9;
      default:
        return Constants.colors.pointColor1;
    }
  }};
  color: ${(props) => {
    switch (props.color) {
      case "gray":
        return Constants.colors.baseColor4;
      case "white":
        return Constants.colors.baseColor3;
      default:
        return Constants.colors.baseColor9;
    }
  }};
  -webkit-transition: 0.2s;
  &:hover{
    border: 1px solid
    ${(props) => {
      switch (props.color) {
        case "gray":
          return Constants.colors.baseColor7;
        case "white":
          return Constants.colors.pointColor1;
        default:
          return Constants.colors.pointDeep;
      }
    }};
  background-color: ${(props) => {
    switch (props.color) {
      case "gray":
        return Constants.colors.baseColor7;
      case "white":
        return Constants.colors.baseColor9;
      default:
        return Constants.colors.pointDeep;
    }
  }};
  color: ${(props) => {
    switch (props.color) {
      case "gray":
        return Constants.colors.baseColor4;
      case "white":
        return Constants.colors.pointColor1;
    }
  }};
  }
`
export const ButtonSub = styled(ButtonMain)`
  height: 30px;
  line-height: 28px;
  font-size: 14px;
  border-radius: 6px;
`
export const ButtonNotice1 = styled.button`
  display: block;
  font-size: 12px;
  font-weight: 500;
  width: 44px;
  height: 24px;
  line-height: 22px;
  border: 1px solid transparent;
  border-radius: 12px;
  color: ${Constants.colors.baseColor9};
  background-color: ${props => {
    switch (props.color) {
      case "gray":
        return Constants.colors.baseColor5;
      case "red":
        return Constants.colors.red2;
      case "green":
        return Constants.colors.green;
      case "orange":
        return Constants.colors.orange;
      default:
        return Constants.colors.pointColor1;
    }
  }}
`
export const ButtonNotice2 = styled.button`
  display: block;
  font-size: 12px;
  width: ${props => props.placeholder || "36px"};
  height: 20px;
  line-height: 18px;
  border-radius: 10px;
  border: 1px solid ${Constants.colors.purple2};
  color: ${Constants.colors.purple1};
  background-color: ${Constants.colors.baseColor9};
`
// Input
export const InputMain = styled.input`
  font-size: 14px;
  letter-spacing: 0.5px;
  width: 100%;
  height: 40px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.value ? Constants.colors.baseColor2 : Constants.colors.baseColor5};
  padding: 0 10px;
  &::placeholder {
    font-size: 13px;
    color: ${Constants.colors.baseColor5};
  }
  &:focus,
  &:hover{
    border-color: ${Constants.colors.pointColor1};
  }
`
export const InputImage = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  & > img:nth-of-type(1){
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    border-radius: 50%;
  }
  & > img:nth-of-type(2){
    position: absolute;
    right: 0;
    bottom: 0;
  }
  & > input{
    cursor: pointer;
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
`
export const InputDate = styled.div`
position: relative;
max-width: 400px;
height: 40px;
display: flex;
align-items: center;
font-size: ${props => props.placeholder ? "13px" : "14px"};
letter-spacing: 0.5px;
outline: none;
border: none;
border-bottom: 1px solid ${(props) => props.placeholder ? Constants.colors.baseColor5 : Constants.colors.baseColor2};
padding: 10px;
color: ${props => props.placeholder ? Constants.colors.baseColor5 : "inherit"};
& > img{
  position: absolute;
  width: 21px;
  height: 21px;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
}
& > input{
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  ::-webkit-calendar-picker-indicator{
    width: 100%;
    height: 100%;
  }
}
`
// Frame
export const FrameSelectBox = styled(Grid)`
  & > button{
    font-size: 16px;
    padding: 7px;
    outline: none;
    border-radius: 8px;
    border: 1px solid ${Constants.colors.baseColor5};
    background-color: white;
    cursor: pointer;
    -webkit-transition: 0.2s;
    &:hover{
      background-color: ${Constants.colors.pointColor4};
    }
  }
  & > button.selectBox_selected{
    color: white;
    border: 1px solid ${Constants.colors.pointColor1};
    background-color: ${Constants.colors.pointColor1};
  }
`
// ETC
export const ProfileImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div{
    opacity: ${props => props.placeholder === "hide" ? '0' : '1'};
  }
  & > button{
    position: absolute;
    bottom: 0;
    left: calc(50% + 50px);
    width: 60px;
  }
  & > img {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
  }
`
// Font
export const BaseFont = styled.div`
  ${props => props.placeholder === "ellipsis" && css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  `}
`
export const Font10 = styled(BaseFont)`
  font-size: 10px;
`
export const Font10L = styled(Font10)`
  font-weight: 300;
`
export const Font10M = styled(Font10)`
  font-weight: 500;
`
export const Font10B = styled(Font10)`
  font-weight: 700;
`
export const Font11 = styled(BaseFont)`
  font-size: 11px;
`
export const Font11L = styled(Font11)`
  font-weight: 300;
`
export const Font11M = styled(Font11)`
  font-weight: 500;
`
export const Font11B = styled(Font11)`
  font-weight: 700;
`
export const Font12 = styled(BaseFont)`
  font-size: 12px;
`
export const Font12L = styled(Font12)`
  font-weight: 300;
`
export const Font12M = styled(Font12)`
  font-weight: 500;
`
export const Font12B = styled(Font12)`
  font-weight: 700;
`
export const Font13 = styled(BaseFont)`
  font-size: 13px;
`
export const Font13L = styled(Font13)`
  font-weight: 300;
`
export const Font13M = styled(Font13)`
  font-weight: 500;
`
export const Font13B = styled(Font13)`
  font-weight: 700;
`
export const Font14 = styled(BaseFont)`
  font-size: 14px;
`
export const Font14L = styled(Font14)`
  font-weight: 300;
`
export const Font14M = styled(Font14)`
  font-weight: 500;
`
export const Font14B = styled(Font14)`
  font-weight: 700;
`
export const Font15 = styled(BaseFont)`
  font-size: 15px;
`
export const Font15L = styled(Font15)`
  font-weight: 300;
`
export const Font15M = styled(Font15)`
  font-weight: 500;
`
export const Font15B = styled(Font15)`
  font-weight: 700;
`
export const Font16 = styled(BaseFont)`
  font-size: 16px;
`
export const Font16L = styled(Font16)`
  font-weight: 300;
`
export const Font16M = styled(Font16)`
  font-weight: 500;
`
export const Font16B = styled(Font16)`
  font-weight: 700;
`
export const Font17 = styled(BaseFont)`
  font-size: 17px;
`
export const Font17L = styled(Font17)`
  font-weight: 300;
`
export const Font17M = styled(Font17)`
  font-weight: 500;
`
export const Font17B = styled(Font17)`
  font-weight: 700;
`
export const Font18 = styled(BaseFont)`
  font-size: 18px;
`
export const Font18L = styled(Font18)`
  font-weight: 300;
`
export const Font18M = styled(Font18)`
  font-weight: 500;
`
export const Font18B = styled(Font18)`
  font-weight: 700;
`
export const Font19 = styled(BaseFont)`
  font-size: 19px;
`
export const Font19L = styled(Font19)`
  font-weight: 300;
`
export const Font19M = styled(Font19)`
  font-weight: 500;
`
export const Font19B = styled(Font19)`
  font-weight: 700;
`
export const Font20 = styled(BaseFont)`
  font-size: 20px;
`
export const Font20L = styled(Font20)`
  font-weight: 300;
`
export const Font20M = styled(Font20)`
  font-weight: 500;
`
export const Font20B = styled(Font20)`
  font-weight: 700;
`
export const PointFont = styled(Font20)`
  padding: 10px 0;
  color: ${Constants.colors.pointColor1};
  white-space: nowrap;
`