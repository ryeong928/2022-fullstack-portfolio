import React from 'react'
import Constants from '../lib/Constants'
import {BaseScreen, Font13, Font14, Font16, Font20} from '../lib/styled'

export default () => {
  return(
    <BaseScreen>
      <Font20>API 종류</Font20>
      <br />
      <Font16>users</Font16>
      <Font14>&nbsp;&nbsp;회원가입, 로그인, 회원수정, 회원탈퇴(글, 댓글, 좋아요 관계형 데이터 삭제)</Font14>
      <Font16>posts</Font16>
      <Font14>&nbsp;&nbsp;글쓰기, 글수정, 글삭제, 페이지네이션, 내가 쓴 글(무한스크롤), 제목 검색, 좋아요, 조회수</Font14>
      <Font16>comments</Font16>
      <Font14>&nbsp;&nbsp;댓글쓰기, 댓글수정, 댓글삭제, 페이지네이션</Font14>
      <br/>
      <Font13 style={{color: Constants.colors.red}}>이미지 관련 기능은 multer를 이용해 작성은 해놓았지만 사용이 불가능합니다<br/>헤로쿠에 S3를 적용해야 하는데, 아직 S3를 학습하지 못하였습니다</Font13>
      <br/>
      <Font13 style={{color: Constants.colors.blue}}>직접 만들어본 컴포넌트들 모음 사이트<br/><a href="https://lustrous-semifreddo-432842.netlify.app" target="_blank">https://lustrous-semifreddo-432842.netlify.app</a></Font13>
      <br/>
      <Font20>감사합니다</Font20>
    </BaseScreen>
  )
}