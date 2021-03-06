import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from '../lib/api'
import Modal from "../compts/Modal";
import Button from "../compts/Button";
import Input from "../compts/Input";
import Frame from "../compts/Frame";
import DaumPostcode from "../compts/DaumPostcode";
import Constants from "../lib/Constants";
import Fakes from "../lib/Fakes";
import { IF_ImageData, IF_member, IF_modify, IF_private, IF_register } from "../lib/IF";
import {Address} from 'react-daum-postcode'
import { BaseScreen, PointFont, Font16, Font14, Row, RowCen, Grid, Center, Font13 } from "../lib/styled";
import {ReactComponent as CheckCircle} from '../resources/CheckCircle.svg'
import {ReactComponent as ArrowRight} from '../resources/ArrowRight.svg'
import { LoadingContext } from "../context/LoadingContext";
import { useRecoilState } from "recoil";
import { __me, __session } from "../lib/atom";

export default () => {
  const location = useLocation().pathname
  const navigate = useNavigate()
  const props = useLocation().state as IF_member | null
  const [session, set_session] = useRecoilState(__session)
  const [me, set_me] = useRecoilState(__me)
  const {isLoading, set_isLoading} = useContext(LoadingContext)
  const [provision, set_provision] = useState<boolean>(false)
  const [privacy, set_privacy] = useState<boolean>(false)
  const [modal_provision, set_modal_provision] = useState<boolean>(false)
  const [modal_privacy, set_modal_privacy] = useState<boolean>(false)
  const [id, set_id] = useState<string>('')
  const [ps, set_ps] = useState<string>('')
  const [psConfirm, set_psConfirm] = useState<string>('')
  const [nickname, set_nickname] = useState<string>(props?.nickname || '')
  const [img, set_img] = useState<IF_ImageData[]>([{file: undefined, preview: props?.img || undefined}])
  const [deleteImg, set_deleteImg] = useState<string[]>([])
  const [sex, set_sex] = useState<string[]>([])
  const [birth, set_birth] = useState<string>("")
  const [address, set_address] = useState<string>("")
  const [postCode, set_postCode] = useState<Address | undefined>()
  // DaumPostcode ??? ??????
  useEffect(()=>{
    if(postCode) set_address(postCode.address)
  }, [postCode])
  // ???????????? | ???????????? API
  const reqUser = () => {
    if(isLoading) return
    const clean_id = id.replace(/\s/gi, "")
    const clean_ps = ps.replace(/\s/gi, "")
    const clean_psConfirm = psConfirm.replace(/\s/gi, "")
    const clean_nickname = nickname.replace(/\s/gi, "")
    if(!props){
      if(!id) return window.alert("???????????? ??????????????????")
      if(!ps) return window.alert("??????????????? ??????????????????")
    }
    if(clean_ps !== clean_psConfirm) return window.alert("??????????????? ???????????? ????????????")
    if(!nickname) return window.alert("???????????? ??????????????????")
    const privateData:IF_private = {
      sex: sex[0] || "",
      birth,
      address,
    }
    // ?????????
    const formData = new FormData()
    if(img[0].file) formData.append('img', img[0].file)
    // ????????????
    if(!props){
      // ???????????? ?????????
      const temp:IF_register = {
        id: clean_id,
        ps: clean_ps,
        nickname: clean_nickname,
        private: privateData
      }
      const params = JSON.stringify(temp)
      formData.append("params", params)
      set_isLoading(prev => true)
      API.users.register(formData).then(res => {
        if(!res) return
        set_session(res.session)
        navigate('/')
      })
      // ????????????
    }else{
      if(!session) return window.alert("??? ????????? ????????????")
      const temp:IF_modify = {session, deleteImg, ps, nickname, private: privateData}
      if(!img[0].file && !img[0].preview) temp.img = ""
      const params = JSON.stringify(temp)
      formData.append("params", params)
      set_isLoading(prev => true)
      API.users.modify(formData).then(res => {
        if(!res) return
        set_me(undefined)
        navigate('/mypage')
      })
    }
  }
  // ????????? ?????? ??? ???????????? ??????/??????
  useEffect(()=>{
    if(location.includes('register') && session) return navigate('/')
    if(location.includes('modify') && !session) return navigate('/')
    if(!props || !session) return
    set_provision(prev => true)
    set_privacy(prev => true)
    const reqPrivate = () => {
      API.users.private({session}).then(res => {
        if(!res) return
        set_sex([res.sex])
        set_birth(res.birth)
        set_address(res.address)
      })
    }
    reqPrivate()
  }, [props, session, location])
  return(
    <BaseScreen style={{maxWidth: 500, margin: "0 auto"}}>
      {!props && (
        <>
          <PointFont>???????????? ??????</PointFont>
          <RowCen style={{justifyContent: "space-between", marginBottom: 5}}>
            <RowCen style={{cursor: "pointer"}} onClick={()=>{set_provision(prev => !prev)}}>
              <CheckCircle fill={provision ? Constants.colors.pointColor1 : Constants.colors.baseColor5} />
              <Font16 placeholder={"ellipsis"}>???????????? ??????</Font16>
            </RowCen>
            <ArrowRight stroke={Constants.colors.baseColor5} style={{cursor: "pointer"}} onClick={()=>{set_modal_provision(true)}}/>
          </RowCen>
          <RowCen style={{justifyContent: "space-between"}}>
            <RowCen style={{cursor: "pointer"}} onClick={()=>{set_privacy(prev => !prev)}}>
              <CheckCircle fill={privacy ? Constants.colors.pointColor1 : Constants.colors.baseColor5} />
              <Font16 placeholder={"ellipsis"}> ???????????? ?????? ??? ?????? ??????</Font16>
            </RowCen>
            <ArrowRight stroke={Constants.colors.baseColor5} style={{cursor: "pointer"}} onClick={()=>{set_modal_privacy(true)}}/>
          </RowCen>
        </>
      )}
      <PointFont>?????? ??????</PointFont>
      {props && <Font14 style={{marginBottom: 15}}>*??????????????? ???????????? ?????? ?????? ??????????????????</Font14>}
      {!props && <Input.Main value={id} setValue={set_id} placeholder="?????????" style={{marginBottom: 20}} />}
      <Input.Main value={ps} setValue={set_ps} placeholder="????????????" type="password"style={{marginBottom: 20}}/>
      <Input.Main value={psConfirm} setValue={set_psConfirm} placeholder="???????????? ??????" type="password"style={{marginBottom: 20}}/>
      <Input.Main value={nickname} setValue={set_nickname} placeholder="?????????" style={{marginBottom: 20}}/>
      <PointFont>?????? ??????</PointFont>
      <Center>
        <Input.ProfileImage value={img} setValue={set_img} count={1} setDeleteImg={set_deleteImg} style={{marginBottom: 20}}/>
      </Center>
      <Row style={{marginBottom: 20, justifyContent: "space-between"}}>
        <Font13 style={{color: Constants.colors.blue}}>*?????? ????????? 3MB ??????</Font13>
        {img[0].file && <Font13>????????? ????????? ?????? {(img[0].file.size/(1024*1024)).toFixed(2)}MB</Font13>}
      </Row>
      <Frame.SelectBox col="1fr 1fr" row="" gap="10px" list={["??????", "??????"]} option={sex} setOption={set_sex} style={{marginBottom: 20}}/>
      <Input.Date value={birth} setValue={set_birth} placeholder="????????????" style={{marginBottom: 20}}/>
      <Grid col="1fr 76px" row="" gap="8px" style={{alignItems: "end", marginBottom: 20}}>
        <Input.Main value={address} setValue={set_address} readOnly placeholder={"????????? ??????????????????"}/>
        <DaumPostcode setPostCode={set_postCode} />
      </Grid>
      <Button.Main onClick={reqUser} style={{margin: "50px 0 30px"}} color={(privacy && provision) ? undefined : "gray"} disabled={!(privacy && provision)}>{props ? "??????????????????" : "????????????"}</Button.Main>
      {modal_provision && (
        <Modal.Main isOpened={modal_provision} setIsOpened={set_modal_provision} style={{padding: 20}}>
          <PointFont style={{textAlign: "center"}}>???????????? ??????</PointFont>
          <Font14 style={{whiteSpace: "pre-wrap", margin: "20px 0 40px", maxHeight: "50vh", overflowY: "auto"}}>{Fakes.provision}</Font14>
          <Button.Main onClick={()=>{set_modal_provision(false)}}>??????</Button.Main>
        </Modal.Main>
      )}
      {modal_privacy && (
        <Modal.Main isOpened={modal_privacy} setIsOpened={set_modal_privacy} style={{padding: 20}}>
          <PointFont style={{textAlign: "center"}}>???????????? ?????? ??? ?????? ??????</PointFont>
          <Font14 style={{whiteSpace: "pre-wrap", margin: "20px 0 40px", maxHeight: "50vh", overflowY: "auto"}}>{Fakes.privacy}</Font14>
          <Button.Main onClick={()=>{set_modal_privacy(false)}}>??????</Button.Main>
        </Modal.Main>
      )}
    </BaseScreen>
  )
}