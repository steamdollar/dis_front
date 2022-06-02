import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { rank_total_request, rank_flavor_request, rank_atmosphere_request, rank_cheap_request, rank_service_request } from "../reducers/rank";
import { isMobile } from "react-device-detect";
import { backend } from "../utils/ip";

const Background = styled.div`
    display: flex;
    position: fixed;
    z-index: 2000;
    width: 100%;
    height: 100%;
    justify-content: center;
    top: 0px;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
    width: 1100px;
    height: 660px;
    display:flex;
    flex-direction:column;
    justify-content:center;

    @media (max-width: 1100px) {
        width: 96%;
    }

    @media (max-height: 900px) {
        height: 86%;
    }

    @media (max-width: 420px) {
        height: 94%;
    }

    > .tab_box{
        width:100%;
        height:16%;

        @media (max-height: 950px) {
        height: 4%;
        }

        @media (max-height: 750px) {
        height: 8%;
        }

        @media (max-width: 420px) {
        height:5%;
        }


    }


    .total{
        outline: 2px solid rgb(225, 106, 147);
    }
    .flavor{
        outline: 2px solid rgb(225, 106, 147);
    }
    .atmosphere{
        outline: 2px solid rgb(225, 106, 147);
    }
    .cheap{
        outline: 2px solid rgb(225, 106, 147);
    }
    .service{
        outline: 2px solid rgb(225, 106, 147);
    }
`;

const Tab = styled.div`
    display: inline-block;
    width: 8%;
    height: 100%;
    padding: 1% 0.8%;
    text-align: center;
    color: #ffffff;
    font-weight: bolder;
    background: #ff99aa;
    margin-right: 2%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    @media (max-width: 720px) {
        width:12%;
        font-size:14px;
        line-height:30px;

    }

    @media (max-width: 420px) {
        width: 14%;
        font-size:10px;
        line-height:25px;
    }



    :hover {
        cursor: pointer;
        color: #828282;
        transition: ease 0.5s;
    }

    :visited {
        background: #ff627c;
    }
`;

const StyledLink = styled(Link)`
    color: #ffffff;
    font-weight: bolder;

    :hover {
        color: #fff8c4;
    }
`;

const BigDiv = styled.div`
    display: flex;
    width: 100%;
    height: 600px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    /* padding: 40px; */
    background:#FFFFE6;
    border-radius: 20px;
    @media (max-width: 1100px) {
        height: 96%;
    }

    @media (max-height: 920px) {
        height: 80%;

    }

    @media (max-height: 700px) {
        height: 94%;
    }

    .visible{
        width:90%;
        height:90%;
        padding: 10px 0;
        box-sizing:border-box;
        overflow: scroll;
        position:relative;
    }
`;

const SmallDiv = styled.div`
    width: 90%;
    height: 25%;
    margin: 0 auto;
    margin-bottom: 3%;
    display: flex;
    border-left:0.5px solid #FFEBC6;
    border-top:0.5px solid #FFEBC6;
    border-right: 3px solid #FFF2D8;
    border-bottom: 3px solid #FFF2D8;
    border-radius:5px;
    padding:10px;
    display:flex;
    justify-content:space-around;
    background: #FFFDF9;

    @media (max-width: 420px) {
        height:20%;
    }


    .ranking_txt{
        width:80%;
        height:100%;
        display:flex;
        text-align:center;
        @media (max-width: 420px) {
            display:block;
        }
    }

    .rank_name{
        width:50%;
        height:100%;
        border-left: 1px solid #dcdcdc;
        display:flex;
        flex-direction:column;
        justify-content:center;
        font-size:18px;

        @media (max-width: 420px) {
        border-left:none;
        font-size:10px;
        width:100%;
        height:20%;
        text-align:left;
        margin-bottom:5px;
        }
        @media (max-width: 280px) {
            font-size:8px;
        }
    }

    .rank_info{
        width:50%;
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        border-left: 1px solid #dcdcdc;
        font-size:16px;


        @media (max-width: 420px) {
            border-top: 0.5px solid #dcdcdc;
            border-left:none;
            font-size:3px;
            letter-spacing:-2px;
            width:100%;
            height:70%;
            text-align:left;
        }
        @media (max-width: 280px) {
            font-size:2px;
            letter-spacing:-2px;
        }
        
    }
`;


const StyledLink2 = styled(Link)`
    color: black;
    :hover {
        color: pink;
    }
`;

const ImgBox = styled.div`
    width:10%;
    position: relative;
    @media ( max-width: 767px ) {
        width:25%;
    }
    @media ( max-width: 1023px ) {
        width:22%;
    }

    &:after {
    content: "";
    display: block;
    padding-bottom: 100%;

    }


`


const Rank = () => {
    const total_rank = document.querySelectorAll(".classify > .tab_box > div") //tab 리스트
    const dispatch = useDispatch();
    const { topFive } = useSelector(state => state.rank);
    useEffect(() => {
        dispatch(rank_total_request());
    }, [dispatch]);
    const total = () => {
        dispatch(rank_total_request());
        total_rank[0].style.outline ="2px solid #FF6A89"
        total_rank[1].style.outline ="none"
        total_rank[2].style.outline ="none"
        total_rank[3].style.outline ="none"
        total_rank[4].style.outline ="none"

        total_rank[0].style.color = "#464646"
        total_rank[1].style.color = "#ffffff"
        total_rank[2].style.color = "#ffffff"
        total_rank[3].style.color = "#ffffff"
        total_rank[4].style.color = "#ffffff"

    };
    const flavor = () => {
        dispatch(rank_flavor_request());
        total_rank[0].style.outline ="none"
        total_rank[1].style.outline ="2px solid #FFA500"
        total_rank[2].style.outline ="none"
        total_rank[3].style.outline ="none"
        total_rank[4].style.outline ="none"

        total_rank[0].style.color = "#ffffff"
        total_rank[1].style.color = "#464646"
        total_rank[2].style.color = "#ffffff"
        total_rank[3].style.color = "#ffffff"
        total_rank[4].style.color = "#ffffff"
    };
    const atmosphere = () => {
        dispatch(rank_atmosphere_request());
        total_rank[0].style.outline ="none"
        total_rank[1].style.outline ="none"
        total_rank[2].style.outline ="2px solid #FFD732"
        total_rank[3].style.outline ="none"
        total_rank[4].style.outline ="none"

        total_rank[0].style.color = "#ffffff"
        total_rank[1].style.color = "#ffffff"
        total_rank[2].style.color = "#464646"
        total_rank[3].style.color = "#ffffff"
        total_rank[4].style.color = "#ffffff"
    };
    const cheap = () => {
        dispatch(rank_cheap_request());
        total_rank[0].style.outline ="none"
        total_rank[1].style.outline ="none"
        total_rank[2].style.outline ="none"
        total_rank[3].style.outline ="2px solid #4AB34A"
        total_rank[4].style.outline ="none"

        total_rank[0].style.color = "#ffffff"
        total_rank[1].style.color = "#ffffff"
        total_rank[2].style.color = "#ffffff"
        total_rank[3].style.color = "#464646"
        total_rank[4].style.color = "#ffffff"
    };
    const service = () => {
        dispatch(rank_service_request());
        total_rank[0].style.outline ="none"
        total_rank[1].style.outline ="none"
        total_rank[2].style.outline ="none"
        total_rank[3].style.outline ="none"
        total_rank[4].style.outline ="2px solid #50BEBE"

        total_rank[0].style.color = "#ffffff"
        total_rank[1].style.color = "#ffffff"
        total_rank[2].style.color = "#ffffff"
        total_rank[3].style.color = "#ffffff"
        total_rank[4].style.color = "#464646"
        
    };


    return (
        <Background>
            <Container className="classify">
                <div className="tab_box">
                    <Tab style={{ marginLeft: '2%', outline:"2px solid #FF6A89", color:"#464646"}} onClick={total} name="total">전체</Tab>
                    <Tab onClick={flavor} style={{background:"#FFB788"}} name="favor" >맛</Tab>
                    <Tab onClick={atmosphere} style={{background:"#FFFF8C"}} name="atmosphere" >분위기</Tab>
                    <Tab onClick={cheap}  style={{background:"#98FB98"}} name="cheap" >가성비</Tab>
                    <Tab onClick={service} style={{background:"#87F5F5"}} name="service">서비스</Tab>
                    <Tab style={{ float: 'right', background: '#CE69E7' }}><StyledLink to='/'>뒤로 가기</StyledLink></Tab>
                </div>
                <BigDiv>
                    <div className="visible">
                        {
                            topFive && topFive.map((v, i) => 
                            (
                                <SmallDiv key={i}>
                                    <ImgBox>
                                        {isMobile ?
                                            <img 
                                                src={
                                                        v.img3 !== null ?
                                                        `${backend}/uploads/${v.img3}`
                                                        :
                                                        v.img2 !== null ?
                                                        `${backend}/uploads/${v.img2}`
                                                        :
                                                        v.img1 !== null ?
                                                        `${backend}/uploads/${v.img1}`
                                                        : 
                                                        `${backend}/uploads/defaultImage.jpg`
                                                }
                                                style={{ borderRadius: '6px' }}
                                                width={"100%"}
                                                height={'100%'} position={"absolute"}
                                                alt=''
                                            /> : 
                                            <img 
                                                src={
                                                    v.img3 !== null ?
                                                    `${backend}/uploads/${v.img3}`
                                                    :
                                                    v.img2 !== null ?
                                                    `${backend}/uploads/${v.img2}`
                                                    :
                                                    v.img1 !== null ?
                                                    `${backend}/uploads/${v.img1}`
                                                    : 
                                                    `${backend}/uploads/defaultImage.jpg`
                                                }
                                                style={{ borderRadius: '6px' }} position={"absolute"}
                                                width={"100%"}
                                                height={'100%'}
                                                alt=''
                                            />
                                        }
                                    </ImgBox>
                                    <div className="ranking_txt" style={{ marginLeft: '20px'}}>
                                        <div className="rank_name">
                                            <div>
                                                { i === 0 && <span>🥇 </span>}
                                                { i === 1 && <span>🥈 </span>}
                                                { i === 2 && <span>🥉 </span>}
                                                { i > 2 && <span>💞</span>}
                                                { i + 1 }위 | <StyledLink2 to={'/shop/'+v.idx}>{v.name}</StyledLink2>
                                            </div>
                                        </div>
                                        <div className="rank_info">
                                            <div>
                                                🚇 지하철 역: 
                                                <span>{v.line}</span>
                                                <span> {v.stationKor}</span>
                                            </div>
                                            <div>⏰ 운영 시간 : {v.operhour}</div>
                                        </div>
                                    </div>
                                </SmallDiv>
                            ))
                        }
                    </div>
                </BigDiv>
            </Container>
        </Background>
    )
};

export default Rank;