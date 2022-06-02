import {AuthForm, AuthTable, AuthDiv, AuthInputBox, AuthButton} from '../../components/styles/AdminStyles'
import {useDispatch, useSelector} from 'react-redux';
import { adminLogin_success } from '../../reducers/admin/adminLogin';
import { Back } from '../../components/styles/AdminStyles';
import { frontend } from '../../utils/ip';
import { backend } from '../../utils/ip';

const Admin = () => {
    const dispatch = useDispatch()
    const stores = useSelector(state => state)
    const some_secret_key = 'some_secret_key'


    const submitHandler = async (e) => {
        e.preventDefault()
        if( e.target.email.value === 'admin' && e.target.password.value === 'admin') {
            dispatch({type: adminLogin_success.toString() })
            alert('관리자 권한 로그인 되었습니다.')
            window.location.href=`${frontend}/dt/admin/menu`
        }
        else {
            alert('email/pw를 확인해주세요.')
        }
    }

    const logoutHandler = () => {
        localStorage.setItem('persist:user',{"adminLogin":"{\"admin\":null,\"isLogin\":false}","user":"{\"me\":{\"isLogin\":true,\"nickname\":\"null\",\"email\":\"null\"},\"error\":null,\"loading\":false}",
            "_persist":"{\"version\":-1,\"rehydrated\":true}"})
        alert('로그아웃 되었습니다')
        window.location.href=`${frontend}`
    }

    return (
        <>
            { stores.adminLogin.admin !== some_secret_key 
            ?
            <>
            <Back>
                <AuthForm onSubmit= { submitHandler }>
                    <AuthTable>
                        <tr>
                            <td>ID</td>
                            <td><AuthInputBox type='text' name='email'  placeholder="아이디를 입력해주세요." /></td>
                        </tr>
                        <tr>
                            <td>PW</td>
                            <td><AuthInputBox type='password' name='password'  placeholder="패스워드를 입력해주세요." /></td>
                        </tr>
                    </AuthTable>
                    <AuthDiv>
                        <AuthButton type="submit">Admin 접속</AuthButton>
                    </AuthDiv>
                    
                </AuthForm>
            </Back>
            </>
            :
            <Back>
                <button style={{width:"150px", height:'35px', padding: "5px 7px", background:'pink', position:'relative',left:'50%',top:'50%',transform:'translate(-50%,-50%'}} onClick={logoutHandler}> Logout </button>
            </Back>
            }
        </>
    )
};

export default Admin;

