import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import {getStore_request, review_create_request, review_write
, review_flavor, review_atmosphere, review_cheap, review_service} from '../reducers/writeReview.js'
import { useNavigate } from 'react-router-dom';


const Background = styled.div`
    background:#FAEBD7;
    z-index:2000;
    width:100%;
    height:100vh;
    position: fixed;
    top:0;
    *{
        list-style:none;
    }

`
const StarForm = styled.form`

    .review_container{
        border : 1px solid #dcdcdc;
        background:#fffcdd;
        width:60%;
        height:100vh;
        margin: 0 auto;
        border-radius: 10px;


        @media (max-width: 767px){
            width:100%;
        }

        @media (min-width: 768px) and (max-width: 991px) {
            width:100%;
        }


        .store_name{
            text-align:center;
            width:50%;
            margin: 0 auto;
            font-size: 2rem;
            margin-top:6%;

            @media (max-width: 767px){
                width:100%;
                font-size:1.5rem;
                margin-top:13%;
            }

            @media (min-width: 768px) and (max-width: 991px) {
                width:100%;
                font-size: 2rem;
                margin-top:5%;
            }

            @media (max-height: 667px){
                margin-top:8%;
            }


        }


        .review_box{
            width:100%;
            height:35%;
            display:flex;
            flex-wrap:wrap;
            justify-content:space-around;
            align-items: center;
            text-align: center;
            @media (max-width: 767px){
                height:40%;
                flex-direction:column;
                justify-content:center;
                flex-wrap:none;
                height:auto;
                margin-top:10%;
                
            }

            @media (max-height: 667px){
                height:40%;
                margin-top:2%;
            }

            @media (min-width: 768px) and (max-width: 991px) {
                height:40%;
                margin-top:2%;
            }
        }

        .star_box{
            width:50%;
            display:flex;
            margin: 0 auto;
            justify-content: space-around;
            align-items: center;
            @media (max-width: 767px){
                width:100%;
                justify-content:space-between;
                
            }

            @media (min-width: 768px) and (max-width: 991px) {

                width:100%;
            }
            

            &>span{
                
                width: 30%;
                font-size: 1.5rem;
                text-align: center;
                /* display:flex;
                flex-direction:column;
                justify-content:center;
                padding-left:15px;
                box-sizing:border-box; */

                @media (max-width: 767px){
                    font-size:1.3rem;
                     width:30%;
                     margin-left:3%;
                }

                @media (min-width: 768px) and (max-width: 991px) {
                    width:30%;
                    font-size: 2rem;
                    margin-left:4%;
                }
                }
            }
        }

        .review_txt_box{
            display:block;
            width:100%;
            height: 40%;
            display:flex;
            justify-content:center;
            

            @media (min-width: 768px) and (max-width: 991px) {
                height: 37%;
                
            }

            #reviewText{
                width:80%;
                height:90%;
                padding:1%;
                font-size: 1rem;

                
            @media (min-width: 768px) and (max-width: 991px) {
                font-size: 1.5rem;
                margin-top:5%;
                
            }

            @media (max-height: 667px){
                margin-top:0;
            }

            }


        }
        .button_box{
            width:30%;
            height:10%;
            display:flex;
            justify-content:space-around;
            margin: 0 auto;
            @media (max-width: 767px){
                width:60%;
                margin-top: 0;

            }

            @media (min-width: 768px) and (max-width: 991px) {
                width:60%;
                height:20%;
                margin-top: -4.5%;
            } 

            @media (max-height: 667px){
                
            }

            .review_btn, .back_button{
                height: 50px;
                width:130px;
                margin-right:5px;
                margin-bottom:10px;
                font-size: 1.5rem;
                line-height:7px;
                background: none;
                border: 1.5px solid;
                color:#FF7F50;
                letter-spacing: inherit;
                border-bottom: 3px solid ;
                border-right: 3px solid ;
                text-transform: inherit;
                cursor:pointer;
                text-align:center;
                
                @media (max-width: 767px){
                    height: 30px;
                    width:70px;
                    font-size:14px;

                }

                @media (min-width: 768px) and (max-width: 991px) {

                    
                    align-self:center;
                }
            }

            .back_button{
                display:flex;
                flex-direction:column;
                justify-content:center;
            }
        }
    
`

const MyFieldSet = styled.fieldset`
    display:inline-block;
    direction: rtl;
    border : 0;
    margin: 0 auto;
    align-self:center;
    width:80%;
    height:80%;

    @media (max-width: 767px){

        width:80%;
        height:80%;
    }

    @media (min-width: 768px) and (max-width: 991px) {

        width:100%;
    }


`
const Radioinput = styled.input`
    display:none;

    :checked ~ label {
        text-shadow: 0 0 0 #fff36c;
    }

    @media (max-width: 767px){
        font-size:1rem;
    }


`

const Starlabel = styled.label`
    font-size:3em;
    color:transparent;
    text-shadow: 0 0 0 #f0f0f0;
    @media (min-width: 768px) and (max-width: 991px) {
        font-size:5em;
    }

    :hover {
        text-shadow: 0 0 0 #fff36c;
    }

    :hover ~ label {
        text-shadow: 0 0 0 #fff36c;
    }
`

const Write = () => {
    const stores = useSelector(state => state)
    const dispatch = useDispatch()

    const email = stores.user.me.email
    const score = stores.createReview.number
    const reviewText = stores.createReview.text

    const getStore = () => {
        dispatch({type: getStore_request.toString(), payload: {sidx: window.location.href.split('/')[4]} })
    }

    const changeHandler = (e) => {
        if ( e.target.value != null) {
            dispatch({type: review_write.toString(), payload: e.target.value})
        }
    }

    const changeFlavor = (e) => {
        dispatch({ type: review_flavor.toString(), payload: {flavor: parseInt(e.target.value)} } )
    }
    const changeAtmosphere = (e) => {
        dispatch({ type: review_atmosphere.toString(), payload: {atmosphere: parseInt(e.target.value)} } )
    }
    const changeCheap = (e) => {
        dispatch({ type: review_cheap.toString(), payload: {cheap: parseInt(e.target.value)} } )
    }
    const changeService = (e) => {
        dispatch({ type: review_service.toString(), payload: {service: parseInt(e.target.value)} } )
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(score.flavor == null && score.atmosphere == null && score.cheap == null && score.service == null
            && reviewText == null ) { 
            alert('점수, 평가 중 하나 이상은 작성해주세요!')       
                return
        }
        const payload = {email, text: stores.createReview.text, number : score, name: stores.createReview.name,
                            sidx: parseInt(stores.createReview.sidx)}
        dispatch({type: review_create_request.toString(), payload: {...payload } })
        alert('리뷰가 작성되었습니다!')
        window.location= 'http://13.209.177.153:3000'
    }

    useEffect(() => {  
        getStore()
    },[dispatch])

    let history = useNavigate()

    return(
        <Background>  
            
            <StarForm onSubmit = {submitHandler}>
                <div className="review_container">
                    <h1 className="store_name"> 🍩 {stores.createReview.name} 🍴 </h1>
                    <ul class="review_box">
                        <li class="star_box">
                            <span>맛</span>
                            <MyFieldSet onChange = {changeFlavor}>
                                <Radioinput type='radio' value='5' id='flavor1' name='flavor'/><Starlabel for='flavor1'>⭐</Starlabel>
                                <Radioinput type='radio' value='4' id='flavor2' name='flavor'/><Starlabel for='flavor2'>⭐</Starlabel>
                                <Radioinput type='radio' value='3' id='flavor3' name='flavor'/><Starlabel for='flavor3'>⭐</Starlabel>
                                <Radioinput type='radio' value='2' id='flavor4' name='flavor'/><Starlabel for='flavor4'>⭐</Starlabel>
                                <Radioinput type='radio' value='1' id='flavor5' name='flavor'/><Starlabel for='flavor5'>⭐</Starlabel>
                            </MyFieldSet>
                        </li>
                        <li class="star_box">
                            <span>분위기</span>
                            <MyFieldSet onChange = {changeAtmosphere}>
                                <Radioinput type='radio' value='5' id='atmosphere1' name='atmosphere'/><Starlabel for='atmosphere1'>⭐</Starlabel>
                                <Radioinput type='radio' value='4' id='atmosphere2' name='atmosphere'/><Starlabel for='atmosphere2'>⭐</Starlabel>
                                <Radioinput type='radio' value='3' id='atmosphere3' name='atmosphere'/><Starlabel for='atmosphere3'>⭐</Starlabel>
                                <Radioinput type='radio' value='2' id='atmosphere4' name='atmosphere'/><Starlabel for='atmosphere4'>⭐</Starlabel>
                                <Radioinput type='radio' value='1' id='atmosphere5' name='atmosphere'/><Starlabel for='atmosphere5'>⭐</Starlabel>
                            </MyFieldSet>
                        </li>
                        <li class="star_box">
                            <span>가격</span>
                            <MyFieldSet onChange = {changeCheap}>
                                <Radioinput type='radio' value='5' id='cheap1' name='cheap'/><Starlabel for='cheap1'>⭐</Starlabel>
                                <Radioinput type='radio' value='4' id='cheap2' name='cheap'/><Starlabel for='cheap2'>⭐</Starlabel>
                                <Radioinput type='radio' value='3' id='cheap3' name='cheap'/><Starlabel for='cheap3'>⭐</Starlabel>
                                <Radioinput type='radio' value='2' id='cheap4' name='cheap'/><Starlabel for='cheap4'>⭐</Starlabel>
                                <Radioinput type='radio' value='1' id='cheap5' name='cheap'/><Starlabel for='cheap5'>⭐</Starlabel>
                            </MyFieldSet>
                        </li>
                        <li class="star_box">
                            <span>서비스</span>
                            <MyFieldSet onChange = {changeService}>
                                <Radioinput type='radio' value='5' id='service1' name='service'/><Starlabel for='service1'>⭐</Starlabel>
                                <Radioinput type='radio' value='4' id='service2' name='service'/><Starlabel for='service2'>⭐</Starlabel>
                                <Radioinput type='radio' value='3' id='service3' name='service'/><Starlabel for='service3'>⭐</Starlabel>
                                <Radioinput type='radio' value='2' id='service4' name='service'/><Starlabel for='service4'>⭐</Starlabel>
                                <Radioinput type='radio' value='1' id='service5' name='service'/><Starlabel for='service5'>⭐</Starlabel>
                            </MyFieldSet>
                        </li>
                    </ul>
                
                    <div className="review_txt_box">
                        <textarea onChange= {changeHandler} id='reviewText' />
                    </div>
                    <div className="button_box">
                        <input type='submit' className="review_btn"/>
                        <div className="back_button" onClick={()=>{history(-1)}}>뒤로 가기</div>
                    </div>
                </div>
                
            </StarForm>
        </Background>
    )
}

export default Write