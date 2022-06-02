import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import {review_delete_request,review_update_proceed,
review_update_start, review_update_request } from "../../reducers/review";
import { useNavigate } from 'react-router-dom';
//import { review_flavor, review_atmosphere, review_cheap, review_service } from '.././reducers/writeReview.js'


const ReviewOne = styled.ul`
    width:95%;
    /* background:red; */
    min-height:80%;
    height:auto;
    margin: 0 auto;
    margin-top:10px;
    border-top: 1px solid grey;
    border-bottom : 1px solid grey;
    @media (max-width: 600px){
            min-height:80%;
            height:auto;
    }
    /* 여기가 문제임 자식 div가 늘어나도 크기가 증가하지 않음. */
    .close2{
        width:4%;
        height:100%;
        display:block;
        text-align:center;
        font-size:20px;
        /* align-items:flex-start; */
        :hover{
            cursor: pointer;
        }
    }

    .review_box{
        /* background:purple; */
        width:100%;
        height:30%;
        display:flex;
        justify-content:space-between;
        align-items:flex-start;
        @media (max-width: 600px){
            align-items:center;
            font-size:20px;
            flex-wrap:wrap;
            min-height:40px;
            height:auto;
            border-bottom: 1px solid #efefef;
        }
    }

    .star_box{
        width:24%;
        height:30px;
        margin-bottom:10px;
        border-bottom: 0.5px solid #DCDCDC;
        @media (max-width: 600px){
            font-size:14px;
            width:50%;
            height:10%;
            border:none;
        }
    }

    .evaluate{
        width:100%;
        min-height:45%;
        height:auto;
        @media (max-width: 600px){
            min-height:60%;
            height:auto;
        }
    }
    
    .button_box{
        width:100%;
        min-height:20%;
        height:auto;
        display:flex;
        justify-content:space-between;
    }

    .update_button, .delete_button{
        width:70px;
        height:20px;
        margin-right:5px;
        margin-bottom:10px;
        font-size:14px;
        line-height:7px;
        background: none;
        border: 1.5px solid;
        color:#FFD5A9;
        letter-spacing: inherit;
        border-bottom: 3px solid ;
        border-right: 3px solid ;
        text-transform: inherit;
        cursor:pointer;
        @media (max-width: 600px){

        }
    }
`

const StarForm = styled.form`
    // border : 2px solid #000;
`

const MyFieldSet = styled.fieldset`
    display:inline-block;
    direction: rtl;
    border : 0;
`
const Radioinput = styled.input`
    display:none;

    :checked ~ label {
        text-shadow: 0 0 0 #fff36c;
    }
`

const Starlabel = styled.label`
    font-size:1.25em;
    color:transparent;
    text-shadow: 0 0 0 #f0f0f0;

    :hover {
        text-shadow: 0 0 0 #fff36c;
    }

    :hover ~ label {
        text-shadow: 0 0 0 #fff36c;
    }
`



const StarSpan = styled.span`
    font-size: 1rem;
    @media (max-width: 600px){
            font-size:12px;
    }
    
`


const StyledLink = styled(Link)`
    color: #a32aff;
    font-size: 20px;
    font-family: 'LABdigital';
    :hover {
        color: #ff20a2;
    }
`;





const ReviewComponent = ()=>{
    const stores = useSelector(state => state)
    console.log("왜안돼",stores.review.data)
    const dispatch = useDispatch()

    const changeHandler = (e) => {
        dispatch({type: review_update_proceed.toString(), payload: e.target.value } )
    }

    const setDefault = (k) => {
        for (let i = 0; i<stores.review.data.length; i++) {
            if( stores.review.data[i].idx === k ) {
                const originalFlavor = 'flavor' + (6-stores.review.data[i].flavor)
                
                const defaultFlavor = document.querySelector(`#`+originalFlavor)
                defaultFlavor.setAttribute('checked', 'checked')

                const originalCheap = 'cheap' + (6-stores.review.data[i].cheap)
                const defaultCheap = document.querySelector(`#`+originalCheap)
                defaultCheap.setAttribute('checked', 'checked')

                const originalService = 'service' + (6-stores.review.data[i].service)
                const defaultService = document.querySelector(`#`+originalService)
                defaultService.setAttribute('checked', 'checked')

                const originalAtmopshere = 'atmosphere' + (6-stores.review.data[i].atmosphere)
                const defaultAtmosphere = document.querySelector(`#`+originalAtmopshere)
                defaultAtmosphere.setAttribute('checked', 'checked')
            }
        }
    }
    
    const updateBoot = async (k) => {
        await dispatch({type: review_update_start.toString(), payload : { upidx : k } })
        await setDefault(k)
    }
    
    const submitHandler = (k) => (e) => {
        e.preventDefault()
        const updateText = document.querySelector('#updateText')
        dispatch({type: review_update_request.toString(), payload : {text: updateText.value, idx: k, flavor: e.target.flavor.value,
        service: e.target.service.value, atmosphere: e.target.atmosphere.value, cheap: e.target.cheap.value }})
    }
    
    const deleteHandler = (k) => {
        dispatch({type :review_delete_request.toString(), payload: {idx:k} })
    }
    
    stores.review.data.map((v)=> {
        
        return (
            stores.update !== v.idx ?
                <ReviewOne key={v.idx}>
                    <StyledLink to={'/shop/'+ v.sidx}>🥨 {v.storename} 🍴</StyledLink>
                    <div class="review_box">
                        <li class="star_box"> 맛 : {
                            v.flavor === 1 ? <StarSpan>⭐</StarSpan> : v.flavor === 2 ? <StarSpan>⭐⭐</StarSpan> 
                            : v.flavor === 3 ? <StarSpan>⭐⭐⭐</StarSpan> 
                            : v.flavor === 4 ? <StarSpan>⭐⭐⭐⭐</StarSpan> : v.flavor === 5 ? <StarSpan>⭐⭐⭐⭐⭐ </StarSpan> : '평가 정보 없음'
                            }
                        </li>
                        <li class="star_box"> 분위기 : {
                            v.atmosphere === 1 ? <StarSpan>⭐</StarSpan> : v.atmosphere === 2 ? <StarSpan>⭐⭐</StarSpan> 
                            : v.atmosphere === 3 ? <StarSpan>⭐⭐⭐</StarSpan> 
                            : v.atmosphere === 4 ? <StarSpan>⭐⭐⭐⭐</StarSpan> : v.atmosphere === 5 ? <StarSpan>⭐⭐⭐⭐⭐</StarSpan> : '평가 정보 없음'
                            }
                        </li>
                        <li class="star_box"> 가격 : {
                            v.cheap === 1 ? <StarSpan>⭐</StarSpan> : v.cheap === 2 ? <StarSpan>⭐⭐</StarSpan> 
                            : v.cheap === 3 ? <StarSpan>⭐⭐⭐</StarSpan> 
                            : v.cheap === 4 ? <StarSpan>⭐⭐⭐⭐</StarSpan> : v.cheap === 5 ? <StarSpan>⭐⭐⭐⭐⭐</StarSpan> : '평가 정보 없음'
                        }
                        </li>
                        <li class="star_box"> 서비스 : {
                            v.service === 1 ? <StarSpan>⭐</StarSpan> : v.service === 2 ? <StarSpan>⭐⭐</StarSpan> 
                            : v.service === 3 ? <StarSpan>⭐⭐⭐</StarSpan> 
                            : v.service === 4 ? <StarSpan>⭐⭐⭐⭐</StarSpan> : v.service === 5 ? <StarSpan>⭐⭐⭐⭐⭐</StarSpan> : '평가 정보 없음'
                            }
                        </li>
                        {(isMobile==false)&&<span onClick={() => deleteHandler(v.idx)} class="close2"> x </span>}
                        
                    </div>
                    <div class="evaluate"> 총평 : {v.text === null ? '평가 정보 없음' : v.text}</div>
                    <div class="button_box">
                        <button class="update_button"onClick={() => updateBoot(v.idx)}> 수정하기 </button>
                        {(isMobile)&&<button class="delete_button" onClick={() => deleteHandler(v.idx)}> 삭제하기 </button>}
                    </div>
                </ReviewOne>
            :
            <div style={{ padding: '10px' }}>
                <StyledLink to={'/shop/'+ v.sidx}>🥨 {v.storename} 🍴</StyledLink>
                <StarForm onSubmit = {submitHandler(v.idx)}>
                    <ul>
                        <li>
                            <span>맛</span>
                            <MyFieldSet>
                                <Radioinput type='radio' value='5' id='flavor1' name='flavor'/>
                                <Starlabel for='flavor1'>⭐</Starlabel>
                                <Radioinput type='radio' value='4' id='flavor2' name='flavor'/>
                                <Starlabel for='flavor2'>⭐</Starlabel>
                                <Radioinput type='radio' value='3' id='flavor3' name='flavor'/>
                                <Starlabel for='flavor3'>⭐</Starlabel>
                                <Radioinput type='radio' value='2' id='flavor4' name='flavor'/>
                                <Starlabel for='flavor4'>⭐</Starlabel>
                                <Radioinput type='radio' value='1' id='flavor5' name='flavor'/>
                                <Starlabel for='flavor5'>⭐</Starlabel>
                            </MyFieldSet>
                        </li>
                        <li>
                            <span>분위기</span>
                            <MyFieldSet>
                                <Radioinput type='radio' value='5' id='atmosphere1' name='atmosphere'/>
                                <Starlabel for='atmosphere1'>⭐</Starlabel>
                                <Radioinput type='radio' value='4' id='atmosphere2' name='atmosphere'/>
                                <Starlabel for='atmosphere2'>⭐</Starlabel>
                                <Radioinput type='radio' value='3' id='atmosphere3' name='atmosphere'/>
                                <Starlabel for='atmosphere3'>⭐</Starlabel>
                                <Radioinput type='radio' value='2' id='atmosphere4' name='atmosphere'/>
                                <Starlabel for='atmosphere4'>⭐</Starlabel>
                                <Radioinput type='radio' value='1' id='atmosphere5' name='atmosphere'/>
                                <Starlabel for='atmosphere5'>⭐</Starlabel>
                            </MyFieldSet>
                        </li>
                        <li>
                            <span>가격</span>
                            <MyFieldSet>
                                <Radioinput type='radio' value='5' id='cheap1' name='cheap'/>
                                <Starlabel for='cheap1'>⭐</Starlabel>
                                <Radioinput type='radio' value='4' id='cheap2' name='cheap'/>
                                <Starlabel for='cheap2'>⭐</Starlabel>
                                <Radioinput type='radio' value='3' id='cheap3' name='cheap'/>
                                <Starlabel for='cheap3'>⭐</Starlabel>
                                <Radioinput type='radio' value='2' id='cheap4' name='cheap'/>
                                <Starlabel for='cheap4'>⭐</Starlabel>
                                <Radioinput type='radio' value='1' id='cheap5' name='cheap'/>
                                <Starlabel for='cheap5'>⭐</Starlabel>
                            </MyFieldSet>
                        </li>
                        <li>
                            <span>서비스</span>
                            <MyFieldSet>
                                <Radioinput type='radio' value='5' id='service1' name='service'/>
                                <Starlabel for='service1'>⭐</Starlabel>
                                <Radioinput type='radio' value='4' id='service2' name='service'/>
                                <Starlabel for='service2'>⭐</Starlabel>
                                <Radioinput type='radio' value='3' id='service3' name='service'/>
                                <Starlabel for='service3'>⭐</Starlabel>
                                <Radioinput type='radio' value='2' id='service4' name='service'/>
                                <Starlabel for='service4'>⭐</Starlabel>
                                <Radioinput type='radio' value='1' id='service5' name='service'/>
                                <Starlabel for='service5'>⭐</Starlabel>
                            </MyFieldSet>
                        </li>
                    </ul>
    
                    <input type='text' onChange={changeHandler} id='updateText' defaultValue={v.text} />
                    <input type='submit'/>
                </StarForm>
            </div>
        )

        
    })


}



export default ReviewComponent;