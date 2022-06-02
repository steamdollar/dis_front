import styled from "styled-components";

const BigDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: -0.6%;
    padding: 1% 2%;
    background: pink;
    @media (max-width: 1120px) {
        margin-top: -0.8%;
    }
    @media (max-width: 840px) {
        margin-top: -1%;
    }
    @media (max-width: 670px) {
        margin-top: -1.2%;
    }
    @media (max-width: 560px) {
        margin-top: -1.4%;
    }
    @media (max-width: 470px) {
        margin-top: -1.8%;
    }
    @media (max-width: 360px) {
        margin-top: -2.2%;
    }
    @media (max-width: 310px) {
        margin-top: -2.6%;
    }
`;

const CircleDiv = styled.div`
    display: inline-block;
    width: 12.5%;
    height: 30px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background: pink;
`;

const TextBox = styled.div`
    font-family: sans-serif;
    color:#505050;
`;

const Footer = () => {
    return (
        <>
            <div>
                <CircleDiv></CircleDiv>
                <CircleDiv></CircleDiv>
                <CircleDiv></CircleDiv>
                <CircleDiv></CircleDiv>
                <CircleDiv></CircleDiv>
                <CircleDiv></CircleDiv>
                <CircleDiv></CircleDiv>
                <CircleDiv></CircleDiv>
            </div>
            <BigDiv>
                <TextBox>제작 : Gyuri, Haeun, SeungJun, Jiyoung</TextBox>
                <TextBox>근무 시간 : 월 ~ 금 9 AM ~ 6 PM</TextBox>
                <TextBox>문의 : donutdonut@gmail.com</TextBox>
            </BigDiv>
        </>
    )
};

export default Footer;