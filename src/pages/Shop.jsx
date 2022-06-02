import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { shop_request } from '../reducers/shop.js';
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import {ReviewOne} from './Mypage'



const Background = styled.div`
    display: flex;
    position: fixed;
    z-index: 2000;
    width: 100%;
    height: 100%;
    justify-content: center;
    top: 0px;
    align-items: center;
    background: white;
`;

const Container = styled.div`
    width: 90%;
    height: 96%;
    padding: 30px;
    border-radius: 30px;
    background-color: #ffd3bb;
    overflow: scroll;
`;

const StoreName = styled.div`
    display: flex;
    margin-top: 20px;
    font-size: 24px;
`;

const ImgBox = styled.div`
    display: flex;
    justify-content: space-around;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;

    .shop_review_box{
        margin-top:5%;
        /* background:red; */
    }
    
`;

const ReviewBox = styled.div`
    width:100%;
    height:150%;
    overflow:scroll;
    position:relative;
    /* background:pink; */
`

const Ul = styled.ul`
    list-style: none;

`

const Li = styled.li`
    width:100%;
    margin-top:1%;
`

const Span1 = styled.span`
    color:#ff6825;
`


const Img = styled.img`
    display: inline-block;
    width: 400px;
    height: 300px;

    @media (max-width: 600px) {
       width:100%;
       height: auto;
    }
`;

const StarImg = styled.img`
    position: absolute;
    width: 100px;
    height: 20px;
    left: 0px;
    z-index: 10;
`;

const ReviewBtn = styled.button`
    margin-left: 20px;
    width: 90px;
    height: 30px;
    font-size: 16px;
    padding: 3px 7px;
    border: none;
    border-radius: 10px;
    background-color: #EE82EE;
    
    :hover {
        cursor: pointer;
    }

    &>a{
        color:#Fff;
    }
`;

const Btn = styled.button`
    margin-top: 20px;
    padding: 5px 7px;
    height: 34px;
    border: none;
    border-radius: 10px;
    background-color: blanchedalmond;
    font-size: 16px;
    :hover {
        cursor: pointer;
    }

    &>a{
        color:#282828;
    }
`;

const StarBox = styled.span`
    display: inline-block;
    position: relative;
    top: 5px;
    margin-left: 16px;
    @media (max-width: 600px) {
        display: block;
        position: relative;
        top: 5px;
        margin-left: 16px;
    }
`;

// 
const StarSpan = styled.span`
    font-size: 1rem;
    @media (max-width: 600px){
            font-size:12px;
    }
    
`;

const ReviewDiv = styled.div`
    width: 100%;
    margin-Top:1%;
    font-size: 18px;
    background: #FFEFFC;
    border-radius:18px;
    padding: 1%;
    
    *{
        list-style:none;
    }
`;

const StarSpan2 = styled.span`
    font-size:1.25em;
    display: inline-block;
    position: absolute;
    height: 20px;
    background: url('/img/star/star5.png');
    background-size: 100px 20px;
    overflow: hidden;
    z-index: 20;
`

const Ebutton = styled.button`
    border:none;
    background-color: #ffff;
    padding: 5px 7px;
    font-size:16px;
    &>a{
        color:black;
    }
`
const Review = styled.span`
    position: relative;
    margin-top: 4px;
    margin-left: 110px;
    font-size: 18px;
`;


const Shop = () => {
    const dispatch = useDispatch();
    const { info, review, avg } = useSelector((state) => state.shop);
    const { img1, img2, img3 } = useSelector((state) => state.shop.img)

    const stores = useSelector(state=>state)

    const params = useParams();
    const { idx } = params;

    useEffect(() => {
        dispatch(shop_request(idx));
    }, [dispatch]);

    //이름 바꿔주는 함수
    let maskingName = function(strName) {
        if (strName.length > 2) {
            let originName = strName.split('');
            originName.forEach(function(name, i) {
            if (i === 0 || i === originName.length - 1) return;
            originName[i] = '*';
            });
            let joinName = originName.join();
            return joinName.replace(/,/g, '');
        } else {
            let pattern = /.$/; // 정규식
            return strName.replace(pattern, '*');
        }
    };

    return (
        <Background>
            <Container>
                {
                    info &&
                    <>
                        {isMobile 
                        ? 
                        <ImgBox>  
                            <Img 
                            src = 
                                {
                                    img3 !== null ?
                                    `http://52.78.175.114:4000/uploads/${img3}`
                                    :
                                    img2 !== null ?
                                    `http://52.78.175.114:4000/uploads/${img2}`
                                    :
                                    img1 !== null ?
                                    `http://52.78.175.114:4000/uploads/${img1}`
                                    :
                                    `http://52.78.175.114:4000/uploads/defaultImage.jpg`
                                }
                            />
                        </ImgBox>
                        : 
                        <ImgBox>  
                            <Img 
                            src = {
                                    img1 !== 'N/A' ?
                                    `http://52.78.175.114:4000/uploads/${img1}`
                                    : 
                                    `http://52.78.175.114:4000/uploads/defaultImage.jpg`
                                }
                            />
                            <Img 
                            src = {
                                    img2 !== 'N/A' ?
                                    `http://52.78.175.114:4000/uploads/${img2}`
                                    : 
                                    `http://52.78.175.114:4000/uploads/defaultImage.jpg`
                                }
                            />
                            <Img 
                            src = {
                                    img3 !== 'N/A' ?
                                    `http://52.78.175.114:4000/uploads/${img3}`
                                    : 
                                    `http://52.78.175.114:4000/uploads/defaultImage.jpg`
                                }
                            />
                        </ImgBox>
                        }
                        <ContentBox>
                            <div>
                                <StoreName>
                                    <div>
                                        {info.name} 
                                    </div>
                                    <StarBox>
                                        <StarImg src='/img/star/star0.png'/>
                                        <StarSpan2 style={{ width: `calc(20*${avg.average}px)` }}></StarSpan2>
                                    </StarBox>
                                    <Review>{avg.average}</Review>
                                    <Review style={{ marginLeft: '10px', marginTop: '6px', color: 'gray', fontSize: '16px' }}>
                                        ({review.length})
                                    </Review>
                                </StoreName>
                                <Ul>
                                <Li>
                                    <Span1>지하철 🚃</Span1>
                                </Li>
                                <p> {info.line}호선 {info.stationKor}역 </p>
                                
                                <Li>
                                    <Span1>주소 🏡</Span1>
                                </Li>
                                <p>{info.address}</p>
                                <Li>
                                    <Span1>도넛 🍩</Span1>
                                </Li>
                                <p>{info.menu}</p>
                                <Li>
                                    <Span1>음료🥤</Span1>
                                </Li>
                                <p>{info.beverage}</p>
                                <Li>
                                    <Span1>운영시간 ⏰ </Span1>
                                </Li>
                                <p>{info.operhour}</p>
                                <Li>
                                    <Span1>연락처 ☎️</Span1>
                                </Li>
                                <p>{info.tel}</p>
                                {
                                    info.website &&
                                    <>
                                    <Li>
                                        <Span1>SNS 📱</Span1>
                                    </Li>
                                    <a href={info.website} style={{color:'#EE82EE'}}>홈페이지바로가기</a>
                                    </>
                                }
                                {
                                    info.intro &&
                                    <>
                                    <Li>
                                        <Span1>소개 🔔</Span1>
                                    </Li>
                                    <p>{info.intro}</p>
                                    </>
                                }
                             </Ul>
                            </div>
                            <div class="shop_review_box" >
                               <div style={{fontSize: '24px', display:'inline'}}>리뷰</div>
                                    <ReviewBtn>
                                        <Link to={`/write/`+info.idx}>리뷰 작성</Link>
                                    </ReviewBtn>
                                    <ReviewBox>
                                        {  
                                            review && review.map(v =>
                    
                                                <ReviewDiv>
                                                    <ReviewOne>
                                                        <h5> 👥 {maskingName(v.email.substring(0,v.email.indexOf("@", 0)))}</h5>
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
                                                            
                                                        </div>
                                                        <div class="evaluate"> 총평 : {v.text === null ? '평가 정보 없음' : v.text}</div>
                                                        {/* <div class="button_box">
                                                            <button class="update_button"onClick={() => updateBoot(v.idx)}> 수정하기 </button>
                                                            {(isMobile)&&<button class="delete_button" onClick={() => deleteHandler(v.idx)}> 삭제하기 </button>}
                                                        </div> */}
                                                    </ReviewOne>

                                                </ReviewDiv>
                                            )
                                        }
                                    </ReviewBox>
                                
                            </div>
                        </ContentBox>
                        <div style={{ textAlign:'center' }}>
                            <Btn><Link to="/">뒤로 가기</Link></Btn>
                        </div>
                    </>
                }
            </Container>
        </Background>
    )
};

export default Shop;