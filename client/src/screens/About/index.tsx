import React from "react"
import Button from "../../compts/Button"
import Constants from "../../lib/Constants"
import { BaseScreen, Row } from "../../lib/styled"

export default () => {
  return(
    <BaseScreen>
    <Row>
      <div style={{width: 50, height: 50, backgroundColor: Constants.colors.pointDeep}}/>
      <div style={{width: 50, height: 50, backgroundColor: Constants.colors.pointColor1}}/>
      <div style={{width: 50, height: 50, backgroundColor: Constants.colors.pointColor2}}/>
      <div style={{width: 50, height: 50, backgroundColor: Constants.colors.pointColor3}}/>
      <div style={{width: 50, height: 50, backgroundColor: Constants.colors.pointColor4}}/>
    </Row>
      <Button.Main>버튼메인1</Button.Main>
      <Button.Main color="deep">버튼메인2</Button.Main>
      <Button.Main color="white">버튼메인3</Button.Main>
      <Button.Main color="gray" disabled>버튼메인4</Button.Main>
      <Button.Sub>버튼서브1</Button.Sub>
      <Button.Sub color="deep">버튼서브2</Button.Sub>
      <Button.Sub color="white">버튼서브3</Button.Sub>
      <Button.Sub color="gray" disabled>버튼서브4</Button.Sub>
      <Button.Notice1>알림1</Button.Notice1>
      <Button.Notice1 color="orange">알림1</Button.Notice1>
      <Button.Notice1 color="red">알림1</Button.Notice1>
      <Button.Notice1 color="green">알림1</Button.Notice1>
      <Button.Notice1 color="gray">알림1</Button.Notice1>
      <Button.Notice2>알림2</Button.Notice2>
    </BaseScreen>
  )
}