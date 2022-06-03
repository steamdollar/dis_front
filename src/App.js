import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { user_login_success } from './reducers/user';
import styled, { keyframes } from 'styled-components';
import 'antd/dist/antd.min.css';

import DefaultHeader from './components/DefaultLayout';
import Footer from './components/Footer';
import Void from './components/Void';

import Fork from './style/mouse.jsx';

import Index from './pages/Index.jsx';
import Mypage from './pages/Mypage.jsx';
import Login from './pages/Login.jsx';
import Shop from './pages/Shop.jsx';
import Rank from './pages/Rank.jsx';

import Parking from './pages/theme/Parking.jsx';
import Photo from './pages/theme/Photo.jsx';
import Protein from './pages/theme/Protein.jsx';
import Unique from './pages/theme/Unique.jsx';

import Admin from './pages/admin/Admin.jsx';
import AdminMenu from './pages/admin/AdminMenu.jsx';
import Confirm from './pages/admin/store/Confirm.jsx';
import StoreSetting from './pages/admin/store/StoreSetting.jsx';
import UserSetting from './pages/admin/user/UserSetting.jsx';
import CheckReview from './pages/admin/user/CheckReview.jsx';
import ReviewSetting from './pages/admin/review/ReviewSetting.jsx';
import Edit from './pages/admin/store/Idx.jsx';
import ConfirmSet from './pages/admin/store/ConfirmSet';

import Join from './pages/register/Join.jsx';

import Write from './pages/Write.jsx'
import GlobalStyle from '../src/style/global'

const snow = keyframes`
  0% {background-position: 0px 0px, 0px 0px, 0px 0px;}
  100% {background-position: 500px 1000px, 300px 1000px, 400px 400px, 300px 300px;}
`;

const Wrap = styled.div`
  width:100%;
  height:100%;
  overflow: hidden; 
  position:relative;
  background-color: #FFFCDD;
  background-image: url("/img/background.png"),url("/img/snow.png"),url("/img/snow2.png"),url("/img/snow3.png");
  background-repeat: no repeat;
  background-size: 950px;
  animation: ${snow} 30s linear infinite;
`;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const query = document.location.href;
    if (query.split('?')[1]) {
      const query2 = query.split('?')[1].split('&').map(v => v.split('=')[1]);
      dispatch({type : user_login_success.toString(), payload: {nickname: query2[0], email:query2[1]}});
    }
  }, []);
  return (
    <Wrap>
      <Fork/>
      <BrowserRouter>
        <DefaultHeader />
        <Index/>
        <Routes>
          <Route path="/" index element={<Void />}/>
          <Route path="/mypage" element={<Mypage />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/write/:idx' element={<Write/>} />
          <Route path="/shop/:idx" element={<Shop />}/>
          <Route path="/rank" element={<Rank />} />
          <Route path="/theme/protein" element={<Protein />} />
          <Route path="/theme/photo" element={<Photo />} />
          <Route path="/theme/unique" element={<Unique />} />
          <Route path="/theme/parking" element={<Parking />} />
          <Route path='/register/join' element={<Join/>} />
          <Route path="/dt/admin" element={<Admin />} />
          <Route path="/dt/admin/menu" element={<AdminMenu />} />
          <Route path="/dt/admin/menu/store/confirm" element={<Confirm />} />
          <Route path="/dt/admin/menu/store/confirm/:register_id" element={<ConfirmSet />}/>
          <Route path="/dt/admin/menu/store/setting" element={<StoreSetting />} />
          <Route path="/dt/admin/menu/store/setting/:store_id" element={<Edit />}/>
          <Route path="/dt/admin/menu/user/setting" element={<UserSetting/>} />
          <Route path="/dt/admin/menu/user/setting/checkblack/:email" element={<CheckReview />} />
          <Route path="/dt/admin/menu/review/setting" element={<ReviewSetting />} />
        </Routes>
        <Footer />
        <GlobalStyle/>
      </BrowserRouter>
    </Wrap>
  )
};

export default App;
