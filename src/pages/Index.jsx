import styled, { keyframes } from 'styled-components';
import { BrowserView, MobileView, isMobile, is } from 'react-device-detect'
import { AutoComplete } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { station_exit, station_request } from '../reducers/station';
import { Link } from 'react-router-dom';
import { backend } from '../utils/ip';

export const Background = styled.div`
    display: flex;
    margin:0 auto;
    position: fixed;
    z-index: 2000;
    width: 100%;
    height: 100%;
    justify-content: center;
    top: 0px;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
`;

export const Container = styled.div`
    width: 60%;
    height: 80%;
    border-radius: 30px;
    background-color: rgb(255, 255, 255);
    overflow: scroll;

    @media (max-width: 600px) {
        width: 80%;
        }
`;

export const StationName = styled.div`
    display:inline-block;
    width:60%;
    font-size: 24px;
    font-weight: bolder;
`;

export const CloseBtn = styled.button`
    width:36px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    background: #fcdcff;

    :hover {
        cursor: pointer;
    }
`;

export const StoreBox = styled.div`
    margin-top: 2%;
    width: 95%;
    margin:0 auto;
    /* height: 52%; */
    padding: 3%;
    border-radius: 20px;
    background: #FFFCDD;
    display:flex;

    @media (max-width: 600px) {
        display:block;
    }
    
`;

const Img = styled.img`
    width:240px;
    height:240px;
    border-radius: 30px;

    @media (max-width: 600px) {
        width: 100%;
        

    }
`

export const StoreName = styled.div`
    font-size: 22px;
`;

export const StoreAddress = styled.div`
    margin-top:3%;
    font-size: 18px;
`;

export const StoreScore = styled(StoreAddress)`
    width: 50%;
    height: auto;
`

const NoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 25px;
    justify-content: center;
`

const Body = styled.div`
    margin: 0;
    padding: 0;
    width:100%;
    height:100vh;
    background:transparent;
    @media (max-height: 700px) {
        width:100vw;
        height:100vh;

    }

`

const MapBox = styled.div `
    /* ????????? ???????????????. */

    width:80%;
    height:70vh;
    position:relative;
    margin:0 auto;
    box-sizing:border-box;
    z-index:6;
    overflow:hidden;
    border-radius:30px;
    margin-top:5vh;
    box-shadow: 0px 0px 20px 1px grey;
    @media (max-width: 600px) {
    width:80vw;
    height:70vh;
    }

`
// ??????


const RouteMap = styled.img`
    /* ????????? ???????????????. */
    width:180%;
    position: absolute;
    z-index:5;
    cursor:pointer;

    @media (max-width: 600px) {
    width: 422%;
    height: auto;
    }
    

` //??????

const StationBox = styled.div`
    /* ????????? ?????? ???????????????. */
    z-index:10;
    width:180%;
    background:#ffc7dd;
    position: relative;
    top:-20%;
    left:-40%;
    @media (max-width: 600px) {
        width: 422%;
        height: auto;
        top:-50%;
        left:-200%;
    }


`

const twinkle = keyframes`
    transform-origin:left top;
    0% {
    transform:rotate(0deg);
    }
    25%{
    transform:rotate(15deg);
    }
    50%{
    transform:rotate(30deg);
    }
    75%{
    transform:rotate(15deg);
    }
    100% {
    transform:rotate(0deg);
    }
`

const Station = styled.div `
    position:absolute;
    width:1%;
    background:#FAFAD2;
    z-index:5;
    border:3px double pink;
    border-radius:50%;
    box-sizing: border-box;
    cursor:pointer;
    box-shadow: 0px 0px 20px #505050;


    :after {
    content: "";
    display: block;
    padding-bottom: 100%;
    }
    :hover {
    background:none;
    background-image:url('img/choco_donut.png');
    background-repeat: no repeat;
    background-size: 120% 120%;
    width:2.0%;
    border:none;
    border-radius:none;
    background-position: 10% 10%;
    animation: ${twinkle} 1.0s linear infinite;
    box-shadow: none;


    }

`

const Index = () => {
 
    let browserWidth = null
    if(isMobile){
        browserWidth = window.innerWidth *4.22
    }else {
        browserWidth = window.innerWidth * 1.8
    }
        
    let isdragging = null
    let originX = null
    let originY = null
    let originLeft = null
    let originTop = null

    const [height, setHeight] = useState(0)

    const [width, setWidth] = useState(browserWidth)

    const mouseDownHandler = (e) => {
        isdragging = true
        originX = e.clientX
        originY = e.clientY
        originLeft = e.target.parentNode.offsetLeft
        originTop = e.target.parentNode.offsetTop

    }

    const mouseMoveHandler = (e) => {
        if (isdragging) {
            const diffX = e.clientX - originX
            const diffY = e.clientY - originY
            const containerWidth = e.target.parentNode.parentNode.offsetWidth
            const containerHeigt = e.target.parentNode.parentNode.offsetHeight
            const imgBoxWidth = e.target.offsetWidth
            const imgBoxHeight = e.target.offsetHeight
            const endOfXPoint = containerWidth - imgBoxWidth //200px
            const endOfYPoint = containerHeigt - imgBoxHeight //444px
            e.target.parentNode.style.left = `${Math.max(Math.min(0, originLeft + diffX),endOfXPoint)}px`
            e.target.parentNode.style.top = `${Math.max(Math.min(0, originTop+ diffY),endOfYPoint)}px`
        }
    }

    const mouseUpHandler = (e) => {
        isdragging = false
    }

    //?????????
    const touchStartHandler = (e) =>{
        isdragging = true   
        originX = e.touches[0].clientX
        originY = e.touches[0].clientY
        originLeft = e.target.parentNode.offsetLeft
        originTop = e.target.parentNode.offsetTop
    }

    const touchMoveHandler = (e) =>{
        if (isdragging) {
            const diffX = e.touches[0].clientX - originX
            const diffY = e.touches[0].clientY - originY
            const containerWidth = e.target.parentNode.parentNode.offsetWidth
            const containerHeigt = e.target.parentNode.parentNode.offsetHeight
            const imgBoxWidth = e.target.offsetWidth
            const imgBoxHeight = e.target.offsetHeight
            const endOfXPoint = containerWidth - imgBoxWidth //200px
            const endOfYPoint = containerHeigt - imgBoxHeight //444px

            e.target.parentNode.style.left = `${Math.max(Math.min(0, originLeft + diffX),endOfXPoint)}px`
            e.target.parentNode.style.top = `${Math.max(Math.min(0, originTop+ diffY),endOfYPoint)}px`
        }
    }

    const touchEndHandler = ()=>{
        isdragging = false
    }

    const imgRef = useRef(0)

    const dispatch = useDispatch()

    const handleReSize = () => {
        setHeight( imgRef.current.height )
        if (window.innerWidth<600) {
            setWidth( window.innerWidth*4.22)
        } else{
            setWidth( window.innerWidth*1.8)
        }

        //???, ????????? ?????????
    }

    useEffect(()=>{
        window.addEventListener('resize', handleReSize)
    }, [width, height])

    const { name, store, no } = useSelector((state) => state.station);
    const clickStation = (e) => {
        dispatch(station_request(e.target.id));
    }
    const mouseOver =  (e) => {
        const donut_top = e.target.style.top //?????? ??????
        const donut_left = e.target.style.left
        e.target.style.top = donut_top.replace("%","")-0.9 + "%"
        e.target.style.left = donut_left.replace("%","")-0.6 + "%"
    }
    const mouseOut = (e) => {
        const donut_top = e.target.style.top
        const donut_left = e.target.style.left
        const before_change_top = donut_top.replace("%","") * 1
        const before_change_left = donut_left.replace("%","") * 1
        e.target.style.top = before_change_top + 0.9 + "%"
        e.target.style.left = before_change_left + 0.6 + "%"
    }

    const Close = () => {
        dispatch({type: station_exit.toString()});
    };

    return (
        <Body >
            <BrowserView>
                <MapBox>
                    <StationBox id='img_box'style={{height, width}}>
                        <RouteMap alt="route_map" src="img/route_map_2.png" id="map_img" ref={imgRef}
                        style={{width}}
                            onLoad={ handleReSize }
                            onMouseDown={mouseDownHandler} onMouseMove={mouseMoveHandler}
                            onMouseUp={mouseUpHandler}>
                        </RouteMap>
                        {/* ??????-????????? */}
                        {/* ?????? */}
                        <Station style={{top:"29.4%", left:"71.8%"}} id="Hoegi"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ?????? */}
                        <Station style={{top:"55%", left:"44.3%"}} id="Yongsan"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ??????????????? */}
                        <Station style={{top:"48.6%", left:"41.7%"}} id="Hyochanggongwonap"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ?????? */}
                        <Station style={{top:"45.8%", left:"40.4%"}} id="Gongdeok"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ???????????? */}
                        <Station style={{top:"39%", left:"32.7%"}} id="Hongdaeipgu"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ?????? */}
                        <Station style={{top:"28.5%", left:"31.8%"}} id="Gajwa"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>                            
                        {/* ?????? */}
                        <Station style={{top:"25.2%", left:"26%"}} id="Susaek"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ???????????????????????? */}
                        <Station style={{top:"28.3%", left:"27.8%"}} id="DMC"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* 1?????? */}
                        {/* ??????3??? */}
                        <Station style={{top:"29.2%", left:"47.9%"}} id="Jongno3ga"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* ?????? */}
                        <Station style={{top:"30.5%", left:"45.2%"}} id="Jonggak"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* ????????????????????? */}
                        <Station style={{top:"71.3%", left:"28.7%"}} id="Gasan"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>      
                        {/* 2?????? */}
                        {/* ?????? */}
                        <Station style={{top:"40.9%", left:"68.3%"}} id="Ttukseom"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* ?????? */}
                        <Station style={{top:"44%", left:"68.5%"}} id="Seongsu"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>        
                        {/* ?????? ?????? */}
                        <Station style={{top:"48.3%", left:"68.5%"}} id="Geondaeipgu"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>         
                        {/* ?????? ????????? ?????? */}
                        <Station style={{top:"74.6%", left:"33.4%"}} id="Gurodigital"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>        
                        {/* ?????? */}
                        <Station style={{top:"77.2%", left:"38.8%"}} id="Sillim"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>       
                        {/* ?????? */}
                        <Station style={{top:"37%", left:"34%"}} id="Idae"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* ?????? */}
                        <Station style={{top:"48.6%", left:"31.6%"}} id="Hapjeong"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>       
                        {/* ???????????? */}
                        <Station style={{top:"35%", left:"60.4%"}} id="Sangwangsimni"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>        
                        {/* ???????????? */}
                        <Station style={{top:"63.9%", left:"25.6%"}} id="Yangcheongucheong"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>   
                        {/* ??????????????? */}
                        <Station style={{top:"63.5%", left:"22%"}} id="Sinjeongnegeori"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>           
                        {/* ????????? */}
                        <Station style={{top:"59.2%", left:"20%"}} id="Kkachisan"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* 3?????? */}
                        {/* ????????? */}
                        <Station style={{top:"18.6%", left:"48.1%"}} id="Gyeongbokgung"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>   
                        {/* ?????? */}
                        <Station style={{top:"23.6%", left:"48.1%"}} id="Anguk"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>                               
                        {/* ?????? */}
                        <Station style={{top:"49%", left:"55.9%"}} id="Geumho"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* ????????? */}
                        <Station style={{top:"59.3%", left:"56%"}} id="Apgujeong"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>       
                        {/* ?????? */}
                        <Station style={{top:"62.1%", left:"56%"}} id="Sinsa"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>       
                        {/* ??????????????? */}
                        <Station style={{top:"68.1%", left:"56%"}} id="Gosokterminal"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* 4?????? */}                           
                        {/* ?????? */}
                        <Station style={{top:"14.2%", left:"73.5%"}} id="Ssangmun"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station> 
                        {/* ??????????????? */}
                        <Station style={{top:"18.8%", left:"52.1%"}} id="HansungUniv"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* ?????? */}
                        <Station style={{top:"41.1%", left:"45.6%"}} id="Hoehyeon"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* 5?????? */}  
                        {/* ?????? */}
                        <Station style={{top:"35.8%", left:"67.9%"}} id="Majang"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* ?????? */}
                        <Station style={{top:"48.6%", left:"40.4%"}} id="Mapo"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station> 
                        {/* ????????? ?????? */}
                        <Station style={{top:"61.7%", left:"35%"}} id="Yeongdeungpo"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* ?????? */}
                        <Station style={{top:"47.4%", left:"14.2%"}} id="Balsan"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>           
                        {/* ?????? */}
                        <Station style={{top:"41.4%", left:"14.2%"}} id="Magok"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>   
                        {/* 6?????? */}
                        { /* ???????????? */}
                        <Station style={{top:"41%", left:"27.8%"}} id="Mapogucheong"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>      
                        { /* ?????? */}
                        <Station style={{top:"46.1%", left:"28%"}} id="Mangwon"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* ?????? */}
                        <Station style={{top:"48.6%", left:"34%"}} id="Sangsu"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* ????????? */}
                        <Station style={{top:"48.6%", left:"50.2%"}} id="Noksapyeong"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* ????????? */}
                        <Station style={{top:"48.6%", left:"52%"}} id="Itaewon"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* ????????? */}
                        <Station style={{top:"48.6%", left:"53.8%"}} id="Hangangjin"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* ?????? */}
                        <Station style={{top:"24.5%", left:"56.3%"}} id="Changsin"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* 7?????? */}   
                        {/* ?????????????????? */}
                        <Station style={{top:"44.1%", left:"71.3%"}} id="ChildrenPark"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>   
                        {/* ????????? */}
                        <Station style={{top:"35.8%", left:"76.6%"}} id="Yongmasan"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* ?????? */}
                        <Station style={{top:"27.1%", left:"82%"}} id="Junghwa"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>          
                        {/* ?????? */}
                        <Station style={{top:"19.5%", left:"82.35%"}} id="Gongneung"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* 8?????? */}  
                        {/* ?????? */}
                        <Station style={{top:"71.2%", left:"72.1%"}} id="Seokchon"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>      
                        {/* ?????? */}
                        <Station style={{top:"71.2%", left:"76.9%"}} id="Songpa"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>            
                        {/* ????????? */}
                        <Station style={{top:"85.2%", left:"80.8%"}} id="Namwirye"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>        
                        {/* 9?????? */}
                        {/* ???????????? */}
                        <Station style={{top:"71.2%", left:"65.3%"}} id="Samseongjungang"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>          
                        {/* ???????????? */}
                        <Station style={{top:"68.5%", left:"77.2%"}} id="Songpanaru"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>                                                   
                    </StationBox>
                </MapBox>
            </BrowserView>
            <MobileView>
                <MapBox>
                    <StationBox id='img_box' style={{height, width}}>
                        <RouteMap alt="route_map" src="img/route_map_2.png" id="map_img" ref={imgRef}
                        style={{width}}
                            onLoad={ handleReSize }
                            onTouchStart={touchStartHandler}
                            onTouchMove={touchMoveHandler}
                            onTouchEnd={touchEndHandler}>
                        </RouteMap>
                        {/* ??????-????????? */}
                        {/* ?????? */}
                        <Station style={{top:"29.4%", left:"71.8%"}} id="Hoegi"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ?????? */}
                        <Station style={{top:"55%", left:"44.3%"}} id="Yongsan"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ??????????????? */}
                        <Station style={{top:"48.6%", left:"41.7%"}} id="Hyochanggongwonap"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ?????? */}
                        <Station style={{top:"45.8%", left:"40.4%"}} id="Hyochanggongwonap"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ???????????? */}
                        <Station style={{top:"39%", left:"32.7%"}} id="Hongdaeipgu"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ?????? */}
                        <Station style={{top:"28.5%", left:"31.8%"}} id="Gajwa"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>                            
                        {/* ?????? */}
                        <Station style={{top:"25.2%", left:"26%"}} id="Susaek"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* ???????????????????????? */}
                        <Station style={{top:"28.3%", left:"27.8%"}} id="DMC"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>
                        {/* 1?????? */}
                        {/* ??????3??? */}
                        <Station style={{top:"29.2%", left:"47.9%"}} id="Jongno3ga"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* ?????? */}
                        <Station style={{top:"30.5%", left:"45.2%"}} id="Jonggak"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* ????????????????????? */}
                        <Station style={{top:"71.3%", left:"28.7%"}} id="Gasan"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>      
                        {/* 2?????? */}
                        {/* ?????? */}
                        <Station style={{top:"40.9%", left:"68.3%"}} id="Ttukseom"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* ?????? */}
                        <Station style={{top:"44%", left:"68.5%"}} id="Seongsu"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>        
                        {/* ?????? ?????? */}
                        <Station style={{top:"48.3%", left:"68.5%"}} id="Geondaeipgu"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>         
                        {/* ?????? ????????? ?????? */}
                        <Station style={{top:"74.6%", left:"33.4%"}} id="Gurodigital"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>        
                        {/* ?????? */}
                        <Station style={{top:"77.2%", left:"38.8%"}} id="Sillim"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>       
                        {/* ?????? */}
                        <Station style={{top:"37%", left:"34%"}} id="Idae"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* ?????? */}
                        <Station style={{top:"48.6%", left:"31.6%"}} id="Hapjeong"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>       
                        {/* ???????????? */}
                        <Station style={{top:"35%", left:"60.4%"}} id="Sangwangsimni"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>        
                        {/* ???????????? */}
                        <Station style={{top:"63.9%", left:"25.6%"}} id="Yangcheongucheong"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>   
                        {/* ??????????????? */}
                        <Station style={{top:"63.5%", left:"22%"}} id="Sinjeongnegeori"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>           
                        {/* ????????? */}
                        <Station style={{top:"59.2%", left:"20%"}} id="Kkachisan"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* 3?????? */}
                        {/* ????????? */}
                        <Station style={{top:"18.6%", left:"48.1%"}} id="Gyeongbokgung"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>   
                        {/* ?????? */}
                        <Station style={{top:"23.6%", left:"48.1%"}} id="Anguk"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>                               
                        {/* ?????? */}
                        <Station style={{top:"49%", left:"55.9%"}} id="Geumho"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* ????????? */}
                        <Station style={{top:"59.3%", left:"56%"}} id="Apgujeong"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>       
                        {/* ?????? */}
                        <Station style={{top:"62.1%", left:"56%"}} id="Sinsa"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>       
                        {/* ??????????????? */}
                        <Station style={{top:"68.1%", left:"56%"}} id="Gosokterminal"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* 4?????? */}                           
                        {/* ?????? */}
                        <Station style={{top:"14.2%", left:"73.5%"}} id="Ssangmun"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station> 
                        {/* ??????????????? */}
                        <Station style={{top:"18.8%", left:"52.1%"}} id="HansungUniv"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* ?????? */}
                        <Station style={{top:"41.1%", left:"45.6%"}} id="Hoehyeon"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* 5?????? */}  
                        {/* ?????? */}
                        <Station style={{top:"35.8%", left:"67.9%"}} id="Majang"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* ?????? */}
                        <Station style={{top:"48.6%", left:"40.4%"}} id="Mapo"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station> 
                        {/* ????????? ?????? */}
                        <Station style={{top:"61.7%", left:"35%"}} id="Yeongdeungpo"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* ?????? */}
                        <Station style={{top:"47.4%", left:"14.2%"}} id="Balsan"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>           
                        {/* ?????? */}
                        <Station style={{top:"41.4%", left:"14.2%"}} id="Magok"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>   
                        {/* 6?????? */}
                        { /* ???????????? */}
                        <Station style={{top:"41%", left:"27.8%"}} id="Mapogucheong"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>      
                        { /* ?????? */}
                        <Station style={{top:"46.1%", left:"28%"}} id="Mangwon"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* ?????? */}
                        <Station style={{top:"48.6%", left:"34%"}} id="Sangsu"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* ????????? */}
                        <Station style={{top:"48.6%", left:"50.2%"}} id="Noksapyeong"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* ????????? */}
                        <Station style={{top:"48.6%", left:"52%"}} id="Itaewon"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* ????????? */}
                        <Station style={{top:"48.6%", left:"53.8%"}} id="Hangangjin"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* ?????? */}
                        <Station style={{top:"24.5%", left:"56.3%"}} id="Changsin"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>    
                        {/* 7?????? */}   
                        {/* ?????????????????? */}
                        <Station style={{top:"44.1%", left:"71.3%"}} id="Seongsu"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>   
                        {/* ????????? */}
                        <Station style={{top:"35.8%", left:"76.6%"}} id="Yongmasan"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>  
                        {/* ?????? */}
                        <Station style={{top:"27.1%", left:"82%"}} id="Junghwa"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>          
                        {/* ?????? */}
                        <Station style={{top:"19.5%", left:"82.35%"}} id="Gongneung"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>     
                        {/* 8?????? */}  
                        {/* ?????? */}
                        <Station style={{top:"71.2%", left:"72.1%"}} id="Seokchon"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>      
                        {/* ?????? */}
                        <Station style={{top:"71.2%", left:"76.9%"}} id="Songpa"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>            
                        {/* ????????? */}
                        <Station style={{top:"85.2%", left:"80.8%"}} id="Namwirye"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>        
                        {/* 9?????? */}
                        {/* ???????????? */}
                        <Station style={{top:"71.2%", left:"65.3%"}} id="Samseongjungang"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>          
                        {/* ???????????? */}
                        <Station style={{top:"68.5%", left:"77.2%"}} id="Songpa"
                            onClick={clickStation} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        </Station>                                                   
                    </StationBox>
                </MapBox>
            </MobileView>
            {
                name &&
                <Background>
                    <Container>
                        <div style={{ display:'flex', justifyContent:'space-between', width:'100%', padding:'2%'}}>
                            <StationName>{ store.length > 0 && "????" + " "+name+"???" }</StationName>
                            <CloseBtn onClick={Close}>X</CloseBtn>
                        </div>
                        
                        {
                            store.length > 0 && store.map((v, i) => {
                                return(
                                    <StoreBox key={i}>
                                        { store[i] &&
                                            <>
                                                <Img
                                                src = {
                                                    v.img1 !== 'N/A' ?
                                                    `${backend}/uploads/${v.img1}`
                                                    :
                                                    v.img2 !== 'N/A' ?
                                                    `${backend}/uploads/${v.img2}`
                                                    :
                                                    v.img3 !== 'N/A' ?
                                                    `${backend}/uploads/${v.img3}`
                                                    : 
                                                    `${backend}/uploads/defaultImage.jpg`
                                                }

                                                />
                                                <div style={{marginLeft:'3%', marginTop:'3%'}}>
                                                    <StoreName>
                                                        <Link 
                                                            to={`/shop/${v.idx}`}
                                                            style={{ color: 'black' }}
                                                        >
                                                            {v.name}
                                                        </Link>
                                                    </StoreName>
                                                    <StoreAddress>
                                                        ?????? : {v.address}
                                                    </StoreAddress>
                                                    <StoreScore>????: {v.average === null ? '?????? ??????' : v.average}</StoreScore>
                                                </div>
                                            </>
                                        }
                                    </StoreBox>
                                )
                            })
                        }
                        {
                            no &&
                            <NoBox>
                                <div>?????? ?????? ??? ?????? ????????? ????????????.</div>
                                <div>?????? ?????? ????????? ?????????!</div>
                            </NoBox>
                        }
                    </Container>
                </Background>
            }
        </Body>

    )
};

export default Index;
