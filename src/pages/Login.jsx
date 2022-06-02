import { user_logout_success } from '../reducers/user.js'
import { useDispatch } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        localStorage.setItem('persist:user', `{\"me\":{\"email\":\"null\",\"nickname\":\"null\",\"isLogin\":false},\"error\":null,\"loading\":false}`)
        
        dispatch({type: user_logout_success.toString()})
        window.location.href='http://13.209.177.153:3000'
    }

    return (
        <>
            <a href='http://52.78.175.114:4000/user/klogin'> kakao login </a>
            <br/>
            <button onClick={logoutHandler}> logout </button>
        </>
    )
};

export default Login