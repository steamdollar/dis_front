import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Layout } from 'antd';
import { show, hidden } from '../reducers/display.js';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import Sider from 'antd/lib/layout/Sider';
import SFLemon from '../font/fonts';
import '../App.css';
import { user_logout_success } from '../reducers/user.js'
import { backend } from '../utils/ip.js';
import { frontend } from '../utils/ip.js';

const Header = styled.header`
    display: flex;
    width: 100%;
    height: 15vh;
    justify-content: space-between;
`;

const StyledSider = styled(Sider)`
    position: fixed;
    z-index: 1000;
    top: 0px;
    right: 0px;
    border-left: solid 3px yellow;
    background-color: #FFFCDD;
`;

const StyledMenu = styled(Menu)`
    background: #FFFCDD;
    font-family: 'YdestreetB';
    font-size: 20px;
`;

const StyledButton = styled.button`
    width: 50px;
    height: 50px;
    background: none;
    border: none;
    :hover {
        cursor: pointer;
        color: red;
    }
`;

const dungdung = keyframes`
    0% {
        margin-top: 0.5%;
    }
    25% {
        margin-top: 0.2%;
    }
    50% {
        margin-top: 0.5%;
    }
    75% {
        margin-top: -0.2%;
    }
    100% {
        margin-top: 0.5%;
    }
`;

const Img = styled.img`
    float: right;
    margin: 4px 12px 0 0;
    animation: ${dungdung} 2.0s linear infinite;
    cursor: pointer;
    transition: all 2s;
    :hover{
        transition: all ease 2s 0s;
    }
`;

const DefaultHeader = () => {
    const dispatch = useDispatch();
    const header = useSelector((state) => state.display);
    const onShow = useCallback(() => { dispatch(show()) }, [dispatch]);
    const onHidden = useCallback(() => { dispatch(hidden()) }, [dispatch]);
    const stores = useSelector(state => state);

    const logoutHandler = () => {
        localStorage.setItem('persist:user', `{\"me\":{\"email\":\"null\",\"nickname\":\"null\",\"isLogin\":false},\"error\":null,\"loading\":false}`);
        dispatch({type: user_logout_success.toString()});
        alert('로그아웃 되었습니다')
        window.location.href = '/';
    };

    const menuMouseOver = (e)=>{
        e.target.src = "./img/donut_set_hover.png";
    };

    const menuMouseOut = (e)=>{
        e.target.src = "./img/donut_set.png";
    };

    const items = [
        { label: <Link to="/mypage"> 슿 마이 페이지</Link>, key: 'item-1' },
        { 
            label: stores.user.me.email === null 
            ? <a href={backend +'/user/klogin'}> 쳌 로그인</a> 
            : <span onClick={logoutHandler} > 쳌 로그아웃</span>,
            key: 'item-2' 
        },
        { label: <Link to="/rank"> 👑 랭킹</Link>, key: 'item-3' },
        {
            label: '슾 테마',
            key: 'submenu',
            children: [
                { label: <Link to="/theme/protein" style={{ fontSize: '16px' }}>프로틴 도넛</Link>, key: 'submenu-item-1' },
                { label: <Link to="/theme/photo" style={{ fontSize: '16px' }}>포토존</Link>, key: 'submenu-item-2' },
                { label: <Link to="/theme/unique" style={{ fontSize: '16px' }}>이색 도넛</Link>, key: 'submenu-item-3' },
                { label: <Link to="/theme/parking" style={{ fontSize: '16px' }}>주차 가능</Link>, key: 'submenu-item-4' }
            ],
        },
        { label: <Link to="/register/join">늇 스토어 등록 신청</Link>, key: 'item-4' }
    ];

    return (
        <>
            <Header>
                <Link to="/"><img width={180} height={130} src="./img/logo1.png"></img></Link>
                <Img onClick={onShow} src='./img/donut_set.png' width={100} height={80} alt=''
                onMouseOver={menuMouseOver} onMouseOut={menuMouseOut}/>
            </Header>
            {
                header.display === 'block' &&
                <Layout>
                    <StyledSider width={300} collapsedWidth={500}>
                        <StyledButton onClick={onHidden}>X</StyledButton>
                        <StyledMenu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100vh' }} 
                            items={items} 
                        />
                    </StyledSider>
                    <SFLemon/>
                </Layout>
            }
        </>
    )
};

export default DefaultHeader;