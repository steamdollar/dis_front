import { Link,useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {admin_confirm_set_request} from '../../../reducers/admin/confirmSet.js';
import {admin_confirm_store_request} from '../../../reducers/admin/confirmStore.js';
import { useEffect, useState } from 'react';
import { Submit, BackBtn} from '../../../components/styles/AdminStyles';
import styled from 'styled-components';
import axios from 'axios';
import { frontend } from '../../../utils/ip.js';
import { backend } from '../../../utils/ip.js';

const Background = styled.div`
    display: flex;
    position: fixed;
    z-index: 2000;
    width: 100%;
    height: 100%;
    justify-content: center;
    top: 0px;
    align-items: center;
    background: #FFFCDD;
`;

const H1 = styled.h1`
    text-align: center;
`;

const H3 = styled.h3`
    margin-top: 10px;
`;

const H3R = styled.h3`
    margin-left: 10px;
    display: inline-block;
`;


const Form = styled.form`
    width: 800px;
    height: 750px;
    padding: 20px;
    border-radius: 40px;
    background: white;
    overflow: auto;
    &::-webkit-scrollbar{
        border-radius:100px;
        width:10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 100px;
        border: 6px solid rgba(0, 0, 0, 0.18);
        border-left: 0;
        border-right: 0;
        background-color: pink;
    }

    @media (max-width: 600px) {
        width: 96%;
    }
`;
const TextArea = styled.textarea`
    width: 100%;
    height: 18%;
    border: none;
    border: 1px solid pink;

    @media (max-width: 600px) {
        width: 28%;
    }

    @media (max-width: 300px) {
        width: 22%;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 30px;
    border: none;
    border-bottom: 1px solid pink;

    @media (max-width: 600px) {
        width: 28%;
    }

    @media (max-width: 300px) {
        width: 22%;
    }
`;

const InputP = styled.input`
    width: 39.7%;
    height: 30px;
    border: none;
    border-bottom: 1px solid pink;
    margin-left: 2%;

    @media (max-width: 600px) {
        width: 28%;
    }

    @media (max-width: 300px) {
        width: 22%;
    }
`;


const InputR = styled.input`
    margin-top: 10px;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    vertical-align: -4px;

    @media (max-width: 600px) {
        width: 10%;
    }

    @media (max-width: 300px) {
        width: 10%;
    }
`;


const BottomDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 26px;
`;

const FlexDiv = styled.div`
    display: flex;
    width:100%;

`


const ConfirmSet = (defaultValue) => {

    const dispatch = useDispatch()
    const [values, setValues] = useState(defaultValue)
    const stores = useSelector((state) => (state))
    const email = stores.confirmSet.user.email

    const handleClickRadioButton = (e) => {
        setValues(e.target.value)
    }

    const handleChangeInput = e =>{
        const {name,value}=e.target
        setValues({...values,[name]:value})   
    }
    
    let params = useParams()
    let regi_id = params.register_id;
    useEffect(()=>{
        dispatch(admin_confirm_set_request({payload:regi_id}))
    },[dispatch])

    const regi = useSelector(state=>state.confirmSet)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {menu_donut, menu_beverage,address,subway,line,tel,
            openhour,parking,protein,photozone,special,sns,intro} = e.target

        const formData = new FormData()

        formData.append('regi_id', regi_id)
        formData.append('name', regi.name)
        formData.append('station', subway.value)
        formData.append('line', line.value)
        formData.append('address', address.value)
        formData.append('parking', parking.value)
        formData.append('protein', protein.value)
        formData.append('photo', photozone.value)
        formData.append('special', special.value)
        formData.append('operhour', openhour.value)
        formData.append('website', sns.value)
        formData.append('menu', menu_donut.value)
        formData.append('beverage', menu_beverage.value)
        formData.append('tel', tel.value)
        formData.append('intro', intro.value)


        let fileInput1 = document.querySelector('#img1')
        let fileInput2 = document.querySelector('#img2')
        let fileInput3 = document.querySelector('#img3')

        formData.append('img1', fileInput1.files[0])
        formData.append('img2', fileInput2.files[0])
        formData.append('img3', fileInput3.files[0])

        dispatch(admin_confirm_store_request(formData))

        const data = { storename : regi.name, email: email }
        
        const result = await axios.post(`${backend}/register/request`, data)

        alert('등록 승인 되었습니다.')
        window.location.href=`http://donut999.shop/dt/admin/menu`
    }



    return (
        <Background>
            <Form onSubmit={handleSubmit} method='post' encType='multipart/form-data' >
                <H1>{regi.name}</H1>
                <H3>Menu-donut</H3>
                <TextArea  defaultValue={regi.menu}  type='textarea' style={{ marginRight: '16px' }} name='menu_donut'  />
                <H3>Menu-beverage</H3>
                <Input  value={values.menu_beverage} type='textarea' style={{ marginRight: '16px' }} name='menu_beverage' onChange ={handleChangeInput}/>
                <H3>주소</H3>
                <Input defaultValue={regi.address} type='text' style={{ width: '100%' }} name='address'/>
                <FlexDiv>
                    <div style={{width:'50%',marginTop:'2%'}}>
                        <div style={{display:'flex', width:'100%'}} >
                            <div style={{width:'50%'}} >
                                <H3 style={{display:'inline'}}>지하철</H3>
                                <InputP style={{width:'50%'}}  value={values.stationKor} type="text" name="subway" />
                            </div>
                            <div style={{width:'50%'}}>
                                <H3 style={{display:'inline'}}>지하철노선</H3>
                                <InputP style={{width:'50%'}}  value={values.line} type="text" name="line" />
                            </div>
                        </div>
                        <H3>연락처</H3>
                        <Input defaultValue={regi.tel} type='text' style={{ width: '100%' }} name='tel'/>
                        <H3>오픈시간</H3>
                        <Input  value={values.operhour} type="text" name="openhour" />
                
                    </div>
                    <div style={{width:'50%', marginLeft:'5%', marginTop:'1%'}}>
                        
                        <div>
                            <H3R>주차여부</H3R>
                            <span style={{marginLeft:'7px'}}>Y</span>
                            <InputR type="radio" name="parking" value="Y" defaultChecked = {regi.parking === "Y" }/>
                            <span style={{marginLeft:'7px'}}>N</span>
                            <InputR type="radio" name="parking" value="N" defaultChecked = {regi.parking !== "Y" } />
                            <H3R>프로틴</H3R>
                            <span style={{marginLeft:'7px'}}>Y</span>
                            <InputR type="radio" name="protein" value="Y" defaultChecked = {regi.protein === "Y" } />
                            <span style={{marginLeft:'7px'}}>N</span>
                            <InputR type="radio" name="protein" value="N" defaultChecked = {regi.protein !== "Y" }  />
                        </div>
                        <div style={{marginTop:'5%'}}>
                            <H3R>포토존</H3R>
                            <span style={{marginLeft:'7px'}}>Y</span>
                            <InputR type="radio" name="photozone" value="Y" defaultChecked = {regi.photo === "Y" }/>
                            <span style={{marginLeft:'7px'}}>N</span>
                            <InputR type="radio" name="photozone" value="N" defaultChecked = {regi.photo !== "Y" } />
                            <H3R>이색 도넛</H3R>
                            <span style={{marginLeft:'7px'}}>Y</span
                            ><InputR type="radio" name="special" value="Y" defaultChecked = {regi.special === "Y" } />
                            <span style={{marginLeft:'7px'}}>N</span>
                            <InputR type="radio" name="special" value="N" defaultChecked = {regi.special !== "Y" }/>
                        </div>
                        <H3 style={{marginTop:'6%'}}>SNS 계정</H3>
                        <Input defaultValue={regi.website}  type='text' style={{ width: '100%' }} name='sns' />
                    </div>
                </FlexDiv>
                
                <H3>소개</H3>
                <TextArea defaultValue={regi.intro} value={values.intro} type='textarea' style={{ marginRight: '16px' }} name='intro' />
                
                <div style={{width: '100%', height: '300px', border : '2px solid black' }}>
                    <span id="pic_up"><h3> 사진 업로드 </h3></span>
                    <span>
                        <span><label htmlFor="img1">파일 선택</label></span>
                        <input type="file" name="img1" id='img1'/><br/>

                        <span><label htmlFor="img2">파일 선택</label></span>
                        <input type="file" name="img2" id='img2'/><br/>

                        <span><label htmlFor="img3">파일 선택</label></span>
                        <input type="file" name="img3" id='img3'/>
                    </span>
                </div>
                
                <BottomDiv>
                    <Submit type='submit' value='등록' />
                    <Link to='/dt/admin/menu/store/confirm'><BackBtn type='button'>뒤로 가기</BackBtn></Link>
                </BottomDiv>
            </Form >

        </Background>
    )
};

export default ConfirmSet;
