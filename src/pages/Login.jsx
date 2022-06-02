import { user_logout_success } from '../reducers/user.js'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { backend, frontend } from '../utils/ip.js'

const Login = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        localStorage.setItem('persist:user', `{\"me\":{\"email\":\"null\",\"nickname\":\"null\",\"isLogin\":false},\"error\":null,\"loading\":false}`)
        
        dispatch({type: user_logout_success.toString()})
        window.location.href=`${frontend}`
    }

    return (
        <>
            <Link to={backend +'/user/klogin'}> kakao login </Link>
            <br/>
            <button onClick={logoutHandler}> logout </button>
        </>
    )
};

export default Login