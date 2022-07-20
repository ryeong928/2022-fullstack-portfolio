import styled, {css} from "styled-components";
import Constants from './Constants'
import {IF_grid} from './IF'

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
  ${props => props.placeholder && css`
    @media (min-width: ${props.placeholder}){
      width: ${props.placeholder};
      margin: 0 auto;
    }
  `}
`
export const Grid = styled.div<IF_grid>`
  width: 100%;
  display: grid;
  grid-template-rows: ${(props) => props.row || ""};
  grid-template-columns: ${(props) => props.col || ""};
  gap: ${(props) => props.gap || "0"};
  ${props => props.placeholder === "static" && css`
    & > p{
      font-size: 13px;
      font-weight: 500;
      color: ${Constants.colors.baseColor2};
    }
    & > div{
      font-size: 12px;
      color: ${Constants.colors.baseColor3};
    }
  `}
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
export const ModalExit = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  & > div:first-child{
    text-align: center;
    padding: 0;
    margin: 0;
  }
  & > section{
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
`
// Button
export const ButtonMain = styled.button`
  display: block;
  width: ${props => props.placeholder || "100%"};
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
export const ButtonMove = styled.div`
  display: block;
  position: relative;
  max-width: 300px;
  height: 70px;
  padding: 0 10px 0 30px;
  border-radius: 20px;
  background-color: white;
  border: 1px solid ${Constants.colors.baseColor5};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover{
    border-color: ${Constants.colors.pointColor1};
    color: ${Constants.colors.pointColor1};
    & svg{
      fill: ${Constants.colors.pointColor1};
    }
  }
`
// Input
export const InputMain = styled.input`
  font-size: 14px;
  letter-spacing: 0.5px;
  width: 100%;
  height: 40px;
  outline: none;
  border: none;
  ${props => props.color === "borderAll" ? (
    css`border: 1px solid ${props.value ? Constants.colors.baseColor2 : Constants.colors.baseColor5};`
  ) : css`  border-bottom: 1px solid ${props.value ? Constants.colors.baseColor2 : Constants.colors.baseColor5};`}
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
export const InputSearch = styled.form`
  display: grid;
  grid-template-columns: 120px 60px;
  gap: 10px;
  & > input{
    height: 30px;
  }
  & > button{
    height: 30px;
    padding: 0 5px;
  }
`
export const InputDate = styled.div`
position: relative;
width: 100%;
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
  cursor: pointer;
  ::-webkit-calendar-picker-indicator{
    width: 100%;
    height: 100%;
  }
}
`
export const InputTitle = styled.input`
  font-size: 18px;
  width: 100%;
  height: 50px;
  outline: none;
  border: 1px solid ${(props) => props.value ? Constants.colors.baseColor2 : Constants.colors.baseColor5};
  padding: 0 15px;
  &::placeholder {
    font-size: 16px;
    color: ${Constants.colors.baseColor5};
  }
  &:focus{
    border-color: ${Constants.colors.pointColor1};
  }
`
export const InputArea = styled.textarea`
  font-size: 16px;
  width: 100%;
  height: 70vh;
  resize: none;
  outline: none;
  border: 1px solid ${(props) => props.value ? Constants.colors.baseColor2 : Constants.colors.baseColor5};
  padding: 12px 15px;
  &::placeholder {
    font-size: 14px;
    color: ${Constants.colors.baseColor5};
  }
  &:focus{
    border-color: ${Constants.colors.pointColor1};
  }
  ::-webkit-scrollbar {
    display: none;
  }
`
export const InputProfileImage = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  & > img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & > input{
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    opacity: 0;
    cursor: pointer;
  }
  & > button{
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    color: white;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
    cursor: pointer
  }
  &:hover > button{
    opacity: 1;
  }
`
// Card
export const CardHotPost = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  background: ${props => props.color === "img" ? "black" : "linear-gradient(0deg, rgba(54,157,255,1) 0%, rgba(236,91,255,0.8036175710594315) 100%)"};
  color: white;
  cursor: pointer;
  & > img{
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }
  &:hover > img{
    transition: 0.2s;
    opacity: 1;
  }
  &: hover > div > div:nth-of-type(1){
    transition: 0.2s;
    color: ${props => props.color === "img" ? "transparent" : "white"};
  }
  & > div{
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
    height: 100%;
    & > div:nth-of-type(1){
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      color: white;
      width: 100%;
      text-align: center;
    }
    & > div:nth-of-type(2){
      position: absolute;
      top: 10px;
      left: 10px;
    }
    & > div:nth-of-type(3){
      position: absolute;
      top: 10px;
      right: 10px;
    }
    & > div:nth-of-type(4){
      position: absolute;
      bottom: 10px;
      left: 10px;
    }
  }
`
export const CardPost = styled.div`
  border: 1px solid ${Constants.colors.baseColor6};
  background-color: ${Constants.colors.baseColor8};
  color: ${Constants.colors.baseColor2};
  cursor: pointer;
  padding: 10px;
  & > section{
    display: flex;
    gap: 10px;
    margin-top: 10px;
    & > div:nth-of-type(1){
      flex: 1;
    }
  }
  &:hover{
    background-color: ${Constants.colors.baseColor3};
    color: white;
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
      border-color: ${Constants.colors.pointColor3};
    }
  }
  & > button.selectBox_selected{
    color: white;
    border: 1px solid ${Constants.colors.pointColor1};
    background-color: ${Constants.colors.pointColor1};
  }
`
export const FramePagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  & > svg{
    width: 20px;
    height: 20px;
    cursor: pointer;
    fill: #333;
    &:hover{
      transition: 0.2s;
      fill: red;
    }
  }
  & > section{
    display: flex;
    gap: 5px;
    & > div{
      font-size: 14px;
      width: 20px;
      height: 20px;
      text-align: center;
      cursor: pointer;
    }
    & > div:hover{
      transition: 0.2s;
      color: red;
      transform: translateY(-1.5px);
    }
    & > div.pagination_currentIndex{
      color: hotpink;
    }
  }
`
export const FramePostPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  & > svg{
    width: 20px;
    height: 20px;
    cursor: pointer;
    fill: #333;
    &:hover{
      transition: 0.2s;
      fill: ${Constants.colors.pointColor1};
    }
  }
  & > section{
    display: flex;
    gap: 5px;
    & > div{
      font-size: 14px;
      width: 20px;
      height: 20px;
      text-align: center;
      cursor: pointer;
    }
    & > div:hover{
      transition: 0.2s;
      color: ${Constants.colors.pointColor1};
      transform: translateY(-1.5px);
    }
    & > div.pagination_current_index{
      color: ${Constants.colors.pointDeep};
    }
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
export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  & > section{
    border: 1px solid #666;
    padding: 5px;
    cursor: pointer;
    transition: 0.2s;
    &:hover{
      background-color: #333;
      color: white;
    }
    & > div:nth-of-type(1){
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & > div:nth-of-type(2){
      display: flex;
      gap: 5px 20px;
      font-size: 14px;
      flex-wrap: wrap;
    }
  }
`
export const PostActionContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: calc(20px + 20px);
  margin-top: 20px;
  & > section:nth-of-type(1){
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  & > section:nth-of-type(2){}
  & > section:nth-of-type(3){}
`
export const PostWriteContainer = styled.div`
  width: 100%;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > section{
    width: 100%;
  }
  & > section:nth-of-type(3){
    position: relative;
    height: 120px;
    background-color: gray;
    border: 1px solid #333;
    border-radisu: 10px;
    display: flex;
    gap: 10px;
    padding: 10px;
    & > sub{
      position: absolute;
      text-align: center;
      width: 100%;
      z-index: 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
    & > input{
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
    }
    & > div{
      position: relative;
      z-index: 0;
      width: 100px;
      height: 100px;
    }
    & > div.preview_img{
      z-index: 2;
      cursor: pointer;
      & > img{
        position: relative;
        z-index: 3;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      & > div{
        position: absolute;
        font-size: 14px;
        z-index: 4;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        line-height: 100px;
        background-color: rgba(0,0,0,0.5);
        color: white;
        text-align: center;
        opacity: 0;
        transition: 0.1s;
      }
      &:hover > div{
        opacity: 1;
      }
    }
  }
  & > section:nth-of-type(4){
    margin-top: 30px;
    & > button{
      width: 100%;
    }
  }
`
export const PostDetailContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  & > section{
    position: relative;
    width: 100%;
    padding: 10px;
    border: 1px solid #aaa;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  & > section:nth-of-type(1){
    & > div:nth-of-type(1){
      white-space: normal;
      word-break: break-all;
    }
    & > div:nth-of-type(2){
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      & > div:nth-of-type(1){
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        & > img:nth-of-type(1){
          width: 100%;
          height: 100%;
          object-fit:cover;
        }
      }
      & > div:nth-of-type(2){
        flex: 1;
      }
    }
  }
  & > section:nth-of-type(2){
    & > div:nth-of-type(1){
      width: 100%;
      & > img{
        width: 100%;
        object-fit: cover;
        margin-bottom: 10px;
      }
    }
    & > div:nth-of-type(2){
      white-space: pre-wrap; 
      word-break: break-word;
    }
    & > div:nth-of-type(3){
      margin: 100px auto 0;
      text-align: center;
      font-size: 14px;
      width: 70px;
      height: 70px;
      background-color: white;
      color: ${props => props.color === "like" ? "red" : "black"};
      border: 1px solid ${props => props.color === "like" ? "red" : "black"};
      display: flex;
      justify-content: center;
      align-items: center;
      -webkit-transition: 0.1s;
      &:hover{
        cursor: pointer;
        color: red;
        border-color: red;
      }
    }
    & > button:nth-of-type(1){
      width: 70px;
      padding: 0 10px;
      position: absolute;
      right: 10px;
      bottom: 45px;
      height: 30px;
    }
    & > button:nth-of-type(2){
      width: 70px;
      padding: 0 10px;
      position: absolute;
      right: 10px;
      bottom: 10px;
      height: 30px;
    }
  }
  & > section:nth-of-type(3){
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & > section:nth-of-type(4){
    margin-top: 30px;
  }
`
export const CommentsBox = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid #aaa;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  & > header{
    display: flex;
    align-items: center;
    gap: 10px;
    & > div:nth-of-type(1){
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      & > img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    & > div:nth-of-type(2){
      font-size: 14px;
      flex: 1;
    }
    & > div:nth-of-type(3),
    & > div:nth-of-type(4){
      font-size: 12px;
    }
  }
  & > main{
    white-space: pre-wrap; 
    word-break: break-word;
  }
  & > sub{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    & > button{
      width: 70px;
    }
  }
  & > button{
    width: 100%;
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
  margin: 15px 0 15px;
  color: ${Constants.colors.pointColor1};
  white-space: nowrap;
`