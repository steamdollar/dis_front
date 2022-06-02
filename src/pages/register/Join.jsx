import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import { register_request, register_gohome, register_name, register_email } from '../../reducers/register';
import SFLemon from '../../font/fonts';

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

const H1 = styled.h1`
    text-align: center;
    text-shadow: 0 0 7px #f3d8ff, 0 0 10px #f3d8ff, 0 0 21px #EE82EE, 0 0 20px #EE82EE,
    0 0 30px #EE82EE, 0 0 20px #EE82EE, 0 0 30px #EE82EE, 0 0 30px #EE82EE;
`;

const H3 = styled.h3`
    margin-top: 20px;
`;




const Form = styled.form`
    width: 600px;
    height: 600px;
    padding: 40px;
    border-radius: 40px;
    background: #FFF0F5;
    overflow: scroll;

    @media (max-width: 600px) {
        width: 96%;
    }
`;

const Input = styled.input`
    width: 158px;
    height: 30px;
    padding: 4px;
    border: none;
    border-bottom: 1px solid #ff00a2;
    background-color: #FFF0F5;
    color: #6300a5;

    &:focus{
        outline:none
    }
    @media (max-width: 600px) {
        width: 28%;
    }

    @media (max-width: 300px) {
        width: 22%;
    }
`;

const BottomDiv = styled.div`
    width:100%;
    display: flex;
    justify-content: center;
    margin-top: 26px;
`;

const motion = keyframes`
 
	0% {margin-top: 0px;} 
	100% {margin-top: 5px;}

`

const Submit = styled.input`
    width: 10%;
    height: 8%;
    margin-right: 20px;
    padding: 5px 7px;
    background: #EE82EE;
    color:#fff;
    border-color:pink;


    cursor: pointer;
    &:hover{
        opacity: 0.5;
        animation: ${motion} 0.3s linear 0s infinite alternate; 
    }

    @media (max-width: 600px) {
        width: 15%;
        animation: ${motion} 0.3s linear 0s infinite alternate; 

    }
`;




const Back = styled.button`
    width:20%;
    height: 8%;
    padding: 5px 7px;
    background: #fff;

    cursor: pointer;
    &:hover{
        opacity: 0.5;
    }

    &>a{
        color:#000;
    }

    @media (max-width: 600px) {
        width: 30%;
    }
`;



const SuccessDiv = styled.div`
    display: flex;
    position: absolute;
    width: 360px;
    height: 240px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    text-align: center;
    z-index: 3000;
    background: #ffcbcb;
    
    @media (max-width: 400px) {
        width: 94%;
    }
`;

const Div = styled.div`
    margin: 30px;

    @media (max-width: 400px) {
        margin: 10px;
    }
`;

const MainLink = styled(Link)`
    width: 80px;
    height: 30px;
    line-height: 30px;
    color: black;
    background-color: #ff9ec1;
    border-radius: 10px;
    :hover {
        color: red;
    }
`;

const Join = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state.register);
    
    const { name, email } = useSelector(state => state.register);
    const onRegister = useCallback((e) => {
        e.preventDefault();
        const { name, menu1, menu2, menu3, address, email, sns } = e.target;
        console.log(e.target)
        if (name.value === '') {
            dispatch(register_name());
            return;
        }
        if (email.value === '') {
            dispatch(register_email());
            return;
        }
        const payload = {
            name: name.value, 
            menu: [menu1.value, menu2.value, menu3.value], 
            address: address.value, 
            email: email.value, 
            sns: sns.value
        };
        dispatch(register_request(payload));
    }, [dispatch]);
    const goMain = () => {
        dispatch(register_gohome());
    };
    return (
        <>
            <Background>
                <Form method='post' onSubmit={onRegister}>
                    <H1 style={{color:'#fff'}}> 
                         스토어 등록 신청 <span>💫</span>
                    </H1>
                    <H3>🏡 가게명</H3>
                    <Input type='text' style={{ width: '100%' }} name='name'/>
                    {
                        name &&
                        <span>가게명을 입력해 주세요.</span>
                    }
                    <H3>🍩 대표 도넛 (최대 3개)</H3>
                    <Input type='text' style={{ marginRight: '16px' }} name='menu1' />
                    <Input type='text' style={{ marginRight: '16px' }} name='menu2' />
                    <Input type='text' name='menu3' />
                    <H3>📮 주소</H3>
                    <Input type='text' style={{ width: '100%' }} name='address' placeholder='서울 지역만 가능합니다.'/>
                    <H3>📧 신청자 이메일</H3>
                    <Input type='text' style={{ width: '100%' }} name='email' placeholder='등록 승인 결과를 이메일로 알려드립니다.'/>
                    {
                        email &&
                        <span>이메일을 입력해 주세요.</span>
                    }
                    <H3>👥 SNS 계정 (선택)</H3>
                    <Input type='text' style={{ width: '100%' }} name='sns' />
                    <BottomDiv>
                        <Submit type='submit' value='신청' />
                        <Back><Link to='/'>뒤로 가기</Link></Back>
                    </BottomDiv>
                    
                </Form>
                {
                    store.result && 
                    <SuccessDiv>
                        <Div style={{ fontSize: '20px', fontWeight: 'bolder' }}>
                            신청이 완료되었습니다.
                        </Div>
                        <Div>
                            승인 절차는 최대 7일 정도 소요될 수 있습니다.
                        </Div>
                        <MainLink to='/' onClick={goMain}>
                            메인으로
                        </MainLink>
                    </SuccessDiv>
                }
            </Background>
            <SFLemon/>
        </>
    )
};

export default Join;