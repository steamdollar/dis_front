import {Ol,AdminMenuDiv} from '../../components/styles/AdminStyles'
import { Link } from "react-router-dom"
import {Li} from '../../components/styles/AdminStyles'
import { Back } from '../../components/styles/AdminStyles';
import { useSelector} from 'react-redux';
import { frontend } from '../../utils/ip';
import { backend } from '../../utils/ip';

const AdminMenu = ()=>{
    const stores = useSelector(state => state)
    const some_secret_key = 'some_secret_key'

    const logoutHandler = () => {
        localStorage.setItem('persist:user',{"adminLogin":"{\"admin\":null,\"isLogin\":false}","user":"{\"me\":{\"isLogin\":true,\"nickname\":\"null\",\"email\":\"null\"},\"error\":null,\"loading\":false}",
            "_persist":"{\"version\":-1,\"rehydrated\":true}"})
        alert('로그아웃 되었습니다')
        window.location.href=`${frontend}`
    }

    return (
        <>
        { 
            stores.adminLogin.admin === some_secret_key 
            ?
                <>  
                <Back>
                    <AdminMenuDiv>
                        <div>
                            <h2 style={{color:'#ff45c3'}}>STORE</h2>
                            <Ol>
                                <Link to='/dt/admin/menu/store/confirm'><Li>신규요청확인</Li></Link>
                                <Link to='/dt/admin/menu/store/setting'><Li>스토어관리</Li></Link>
                            </Ol>
                        </div>
                        <div>
                            <h2 style={{color:'#ff650a'}}>USER</h2>
                            <Ol>
                                <Link to='/dt/admin/menu/user/setting'><Li>사용자관리</Li></Link>
                            </Ol>
                        </div>
                        <div>
                            <h2 style={{color:'#8f13ff'}}>REVIEW</h2>
                            <Ol>
                                <Link to='/dt/admin/menu/review/setting'><Li>리뷰관리</Li></Link>
                            </Ol>
                        </div>

                    </AdminMenuDiv>
                    <button style={{width:"150px", height:'35px', padding: "5px 7px", background:'pink', position:'relative',left:'50%',top:'50%',transform:'translate(-50%,-50%'}} onClick={logoutHandler}> Logout </button>

                    </Back>
                </>
            : 
            <> 
            <Back>
            <span>관리자 권한으로 로그인 해주세요</span>
            </Back>
           </>
        }
        </>
    )
}

export default  AdminMenu