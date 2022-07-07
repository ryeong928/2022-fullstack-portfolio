import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {__me, __session} from '../lib/atom'
import styled from 'styled-components'
import {BaseScreen, PointFont, ProfileImage, Grid, RowCen, Col, Center, Font16, Font12M, Font14} from '../lib/styled'
import {req_register} from '../lib/api'
import Constants from '../lib/Constants'
import Fakes from '../lib/Fakes'
import Common from '../compts/Common'
import Button from '../compts/Button'
import Input from '../compts/Input'
import Modal from '../compts/Modal'
import Frame from '../compts/Frame'
import {ReactComponent as CheckCircle} from '../resources/CheckCircle.svg'
import {ReactComponent as ArrowRight} from '../resources/ArrowRight.svg'
import { IF_ImageData } from '../lib/IF'

export default () => {
  const navigate = useNavigate()
  const [sesseion, set_session] = useRecoilState(__session)
  const [me, set_me] = useRecoilState(__me)
  // 회원가입 동의
  const [modal_provision, set_modal_provision] = useState<boolean>(false)
  const [modal_privacy, set_modal_privacy] = useState<boolean>(false)
  const [provision, set_provision] = useState<boolean>(false)
  const [privacy, set_privacy] = useState<boolean>(false)
  // 회원가입 정보
  const [register_id, set_register_id] = useState<string>("")
  const [register_ps, set_register_ps] = useState<string>("")
  const [register_confirm_ps, set_register_confirm_ps] = useState<string>("")
  const [register_nickname, set_register_nickname] = useState<string>("")
  const [register_img, set_register_img] = useState<IF_ImageData[] | undefined>(undefined)
  const [register_sex, set_register_sex] = useState<string[] | undefined>()
  const [register_birth, set_register_birth] = useState<string>("")
  const [register_email, set_register_email] = useState<string>("")
  const [register_phone, set_register_phone] = useState<string>("")
  const [register_address, set_register_address] = useState<string>("")
  // 회원가입 버튼
  const [isLoading, set_isLoading] = useState<boolean>(false)
  const [disabled, set_disabled] = useState<boolean>(true)
  useEffect(()=>{
    if(!provision || !privacy) return
    if(register_id && register_ps && register_confirm_ps && register_nickname) set_disabled(false)
  }, [provision, privacy, register_id, register_ps, register_confirm_ps])
  // 회원가입 API
  const register = () => {
      if(isLoading) return
      set_isLoading(true)
      const params = JSON.stringify({
        id: register_id,
        ps: register_ps,
        img: "",
        nickname: register_nickname,
        sex: register_sex ? register_sex[0] : "",
        birth: register_birth,
        email: register_email,
        phone: register_phone,
        address: register_address
      })
      // multipart/form-data 형식으로 요청
      const formData = new FormData()
      // 이미지 하나
      if(register_img) formData.append('image', register_img[0].FormData)
      // 이미지 복수: input multiple: for(let img of imgs) formData.append('image', img)
      // 그 외 데이터
      formData.append("params", params)
      req_register(formData).then(res => set_session(res.session))
  }
  // 회원가입 성공시, 페이지 자동이동
  useEffect(()=>{
    if(me) navigate('/')
  }, [me])
  return(
    <BaseScreen>
      <section>
        <PointFont>회원가입 동의</PointFont>
        <Grid style={{maxWidth: 400}} col="1fr 40px">
          <RowCen onClick={()=>{set_provision(prev => !prev)}} style={{cursor: "pointer"}}>
            <CheckCircle fill={provision ? Constants.colors.pointColor1 : Constants.colors.baseColor5} />
            <Font16 placeholder={"ellipsis"}>이용약관 동의</Font16>
          </RowCen>
          <ArrowRight stroke={Constants.colors.baseColor5} style={{cursor: "pointer"}} onClick={()=>{set_modal_provision(true)}}/>
        </Grid>
        <Grid style={{maxWidth: 400}} col="1fr 40px">
          <RowCen onClick={()=>{set_privacy(prev => !prev)}} style={{cursor: "pointer"}}>
            <CheckCircle fill={privacy ? Constants.colors.pointColor1 : Constants.colors.baseColor5} />
            <Font16 placeholder={"ellipsis"}>개인정보 수집 및 이용 동의</Font16>
          </RowCen>
          <ArrowRight stroke={Constants.colors.baseColor5} style={{cursor: "pointer"}} onClick={()=>{set_modal_privacy(true)}}/>
        </Grid>
      </section>
      <section>
        <PointFont>프로필 이미지</PointFont>
        <ProfileImage placeholder={register_img ? "hide" : ""}>
          {register_img && <img src={register_img[0].preview} />}
          {register_img && <Button.Sub color="white" onClick={()=>{set_register_img(undefined)}}>삭제</Button.Sub>}
          <Input.Image value={register_img} setValue={set_register_img} count={1}/>
        </ProfileImage>
      </section>
      <Col style={{gap: 15, maxWidth: 400}}>
        <PointFont>필수정보</PointFont>
        <div>
        <Input.Main value={register_id} setValue={set_register_id} placeholder="아이디" />
        <Font12M style={{color: Constants.colors.blue}}>4자 이상으로 작성해주세요</Font12M>
        </div>
        <div>
        <Input.Main value={register_nickname} setValue={set_register_nickname} placeholder="닉네임" />
        <Font12M style={{color: Constants.colors.blue}}>2자 이상, 10자 이하로 작성해주세요</Font12M>
        </div>
        <div>
        <Input.Main value={register_ps} setValue={set_register_ps} placeholder="비밀번호" type="password"/>
        <Font12M style={{color: Constants.colors.blue}}>영문자와 숫자로 6자 이상, 16자 이하로 작성해주세요</Font12M>
        </div>
        <Input.Main value={register_confirm_ps} setValue={set_register_confirm_ps} placeholder="비밀번호 확인" type="password"/>
      </Col>
      <Col style={{gap: 15, maxWidth: 400}}>
        <PointFont>선택사항</PointFont>
        <div>
        <Frame.SelectBox col="1fr 1fr" gap="10px" list={["남자", "여자"]} option={register_sex} setOption={set_register_sex} />
        <Font12M style={{opacity: 0}}>4자 이상으로 작성해주세요</Font12M>
        </div>
        <div>
        <Input.Date value={register_birth} setValue={set_register_birth} placeholder="생년월일" type="date"/>
        <Font12M style={{opacity: 0}}>2자 이상, 10자 이하로 작성해주세요</Font12M>
        </div>
        <div>
        <Input.Main value={register_email} setValue={set_register_email} placeholder="이메일" type="email"/>
        <Font12M style={{opacity: 0}}>영문자와 숫자로 6자 이상, 16자 이하로 작성해주세요</Font12M>
        </div>
        <Input.Main value={register_phone} setValue={set_register_phone} placeholder="전화번호" type="string"/>
      </Col>
      <Center>
        <Button.Main onClick={register} disabled={disabled} color={disabled ? "gray" : undefined} style={{marginTop: 40, maxWidth: 500}}>회원가입</Button.Main>
      </Center>
      {modal_provision && (
        <Modal.Main isOpened={modal_provision} setIsOpened={set_modal_provision} style={{padding: 20}}>
          <PointFont style={{textAlign: "center"}}>이용약관 동의</PointFont>
          <Font14 style={{whiteSpace: "pre-wrap", margin: "20px 0 40px", maxHeight: "50vh", overflowY: "auto"}}>{Fakes.provision}</Font14>
          <Button.Main onClick={()=>{set_modal_provision(false)}}>확인</Button.Main>
        </Modal.Main>
      )}
      {modal_privacy && (
        <Modal.Main isOpened={modal_privacy} setIsOpened={set_modal_privacy} style={{padding: 20}}>
          <PointFont style={{textAlign: "center"}}>개인정보 수집 및 이용 동의</PointFont>
          <Font14 style={{whiteSpace: "pre-wrap", margin: "20px 0 40px", maxHeight: "50vh", overflowY: "auto"}}>{Fakes.privacy}</Font14>
          <Button.Main onClick={()=>{set_modal_privacy(false)}}>확인</Button.Main>
        </Modal.Main>
      )}
      {isLoading && <Common.Loading isLoading={isLoading} set_isLoading={set_isLoading} count={1000}/>}
    </BaseScreen>
  )
}

const ResponsiveGrid = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  gap: 10px 40px;
  @media (max-width: 450px){
    grid-template-columns: 1fr;
    gap: 40px 0;
  }
`