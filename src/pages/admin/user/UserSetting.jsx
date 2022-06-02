import { Link  } from "react-router-dom";
import { AuthButton,AdminInput,BigButton,Back } from "../../../components/styles/AdminStyles";
import { Rbutton, Dbutton, Sbutton } from "../../../components/styles/AdminTable";
import {useDispatch, useSelector} from 'react-redux';
import {admin_black_request} from '../../../reducers/admin/adminBlack.js';
import {admin_new_black_request} from '../../../reducers/admin/adminBlack.js';
import {admin_del_black_request} from '../../../reducers/admin/adminBlack.js';
import {admin_search_request} from '../../../reducers/admin/adminBlack.js'
import { useEffect } from 'react';

const UserSetting = () => {

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch({type:admin_black_request.toString()})

    },[dispatch])

    const black = useSelector(state=>state.adminBlack.user)
    const search = useSelector(state=>state.adminBlack.search)


    const blackSubmit = (e) => {
        e.preventDefault()
        const {kakaoEmail} = e.target
        const payload = {
            user:kakaoEmail.value
        }

        dispatch(admin_new_black_request(payload)) 
    }

    const delSubmit = (e) => {
        e.preventDefault()
        const {value} = e.target.kemail

        dispatch(admin_del_black_request(value)) 
    }

    const schSubmit = (e) => {
        e.preventDefault()
        const {value} = e.target.searchInput

        dispatch(admin_search_request(value))
    }

    return(
        <>
        <Back>
            <div>
                <h2 style={{width:'30%',textAlign:'center', margin:'4% auto', fontWeight:'bold', background:'#fff', fontSize:'25px'}}> Black List </h2>
                <form method="post" style={{textAlign:'center', marginTop:'3%' }} onSubmit={blackSubmit}>
                    <AdminInput type="text" name="kakaoEmail" placeholder="블랙 리스트 회원을 추가해 주세요."/>
                    <BigButton type="submit" style={{marginLeft:"2%", fontSize:'1.3rem'}}>블랙리스트등록</BigButton>
                </form>
            </div>
            <div style={{width:'55%', background:'yellow', margin:'2% auto'}}>
                <form style={{width:'70%', margin:' 0 auto', textAlign:"center"}} onSubmit={schSubmit}>
                    <input style={{marginTop:'7%', fontSize:'20px'}} type="text" placeholder="이메일 검색만 가능합니다." name="searchInput"/>
                    <Sbutton  type="submit" name="searchButton">검색</Sbutton>
                </form>
                <div style={{width:'90%', margin:'0 auto', padding:'7px 7px', fontSize:'20px'}}>
                    <ol style={{margin:'3% auto'}} >
                        {search.length === 0 && black.map((x)=>{
                            return(
                                <>
                                    <tr style={{marginTop:'3%'}}>
                                        <td style={{width:'55%'}}>{x.email}</td>
                                        <td style={{textAlign:'end', width:'30%'}}>
                                            <Link to ={"/dt/admin/menu/user/setting/checkblack/"+x.email}>
                                                <span style={{marginLeft:'3%'}}><Rbutton>작성 리뷰</Rbutton></span>
                                            </Link>
                                            <span>
                                                <form method="post" onSubmit={delSubmit} style={{marginLeft:'3%',display:'inline'}}>
                                                    <input type="hidden" name = "kemail" value={x.email}/>
                                                    <Dbutton type="submit">일반 회원</Dbutton>
                                                </form>
                                            </span>
                                        </td>
                                    </tr>
                                    <p style={{fontSize:'15px'}}>{x.stamp}</p>
                                </>
                            )
                        })
                        }
                        {search.length > 0 && search.map((s)=>{
                            return(
                                <>
                                    <tr style={{marginTop:'3%'}}>
                                        <td style={{width:'55%'}}>{s.email}</td>
                                        <td style={{textAlign:'end', width:'30%'}}>
                                            <Link to ={"/dt/admin/menu/user/setting/checkblack/"+s.email}>
                                                <span style={{marginLeft:'3%'}}><Rbutton>작성 리뷰</Rbutton></span>
                                            </Link>
                                            <span>
                                                <form method="post" onSubmit={delSubmit} style={{marginLeft:'3%',display:'inline'}}>
                                                    <input type="hidden" name = "kemail" value={s.email}/>
                                                    <Dbutton type="submit">일반 회원</Dbutton>
                                                </form>
                                            </span>
                                        </td>
                                    </tr>
                                    <p style={{fontSize:'15px'}}>{s.stamp}</p>
                                </>
                            )}
                        )}
                    </ol>
                </div>
            </div>
            
            <Link to="/dt/admin/menu">
                <div style={{textAlign:"center"}}>
                    <AuthButton >Admin Menu</AuthButton>
                </div>
            </Link>
        </Back>
        </>
    )
}

export default UserSetting



