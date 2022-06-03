import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {admin_confirm_del_request} from '../../../reducers/admin/adminStoreConfirm.js';
import {admin_confirm_state_request} from '../../../reducers/admin/adminStoreConfirm.js';
import { useEffect} from 'react';
import {Divv, Dbutton, Table, Tr, Td} from '../../../components/styles/AdminTable';
import { AuthButton,Back } from "../../../components/styles/AdminStyles";

const Confirm = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(admin_confirm_state_request('전체'))
    },[dispatch])

    const sort = useSelector(state=>state.adminConfirm.sort)
    const a = sort.length
  
    const check = Array(a).fill(false)
    let checkArr = []
    const checkHandler = (e) => {
        const idx = e.target.value
        if(!check[idx-1]){
            check[idx-1]=true
            checkArr.push(idx)
        }else{
            check[idx-1]=false
            checkArr = checkArr.filter(v => v !== idx)
        }
    }

    const onDelete = (e) => {
        e.preventDefault()
        dispatch(admin_confirm_del_request(checkArr))
         
    }

    
    const sortHandler = (e) => {
        e.preventDefault()
        const target = e.target.value
        dispatch(admin_confirm_state_request(target))
    }
    

    return(
        <>
        <Back>
            <h2 style={{width:'30%',textAlign:'center', margin:'4% auto', fontWeight:'bold', background:'#fff', fontSize:'25px'}}>Confirm New Store</h2>
                <Divv style={{marginTop:'3%', margin:'0 auto'}}>
                    <form method="post" name="delform" onSubmit={onDelete}> 
                        <Table style={{width:'100%'}}>
                            <thead>
                                <Tr >
                                    <Td style={{width: '3%'}}>Idx</Td>
                                    <Td style={{width: '17%'}}>Email</Td>
                                    <Td style={{width: '10%'}}>Store</Td>
                                    <Td style={{width: '10%'}}>Menu</Td>
                                    <Td style={{width: '15%'}}>Address</Td>
                                    <Td style={{width: '15%'}}>Contact</Td>
                                    <Td style={{width: '10%'}}>SNS</Td>
                                    <Td style={{width: '10%'}}> Date</Td>
                                    <Td style={{width: '5%'}}>
                                        <select name="sort" onChange={sortHandler}>
                                            <option value="전체">전체</option>
                                            <option value="대기">대기</option>
                                            <option value="승인">승인</option>
                                        </select>
                                    </Td>
                                    <Td style={{width: '5%'}}>
                                        <Dbutton type="submit">삭제</Dbutton>
                                    </Td>
                                </Tr>
                            </thead>
                            <tbody>
                                {sort && sort.map ((x,i) => {
                                    return(
                                        
                                            <Tr key={i}>
                                                <Td>{x.idx}</Td>
                                                <Td>{x.email}</Td>
                                                <Td><Link to = {"/dt/admin/menu/store/confirm/"+x.idx}>{x.store}</Link></Td>
                                                <Td>{x.menu}</Td>
                                                <Td>{x.address}</Td>
                                                <Td>{x.contact}</Td>
                                                <Td>{x.sns}</Td>
                                                <Td>{x.stamp}</Td>
                                                <Td>
                                                    {x.state === 'false' ? '대기' : x.state}
                                                </Td>
                                                <Td>
                                                    <input type="checkbox" name = {"registerDel"+x.idx}  value={x.idx} onChange={checkHandler}/>
                                                </Td>
                                            </Tr>
                                     
                                    );
                                })} 
                            </tbody>
                        </Table>
                    </form>
                </Divv>
                <Link to="/dt/admin/menu">
                    <div style={{textAlign:"center"}}>
                        <AuthButton>Admin Menu</AuthButton>
                    </div>
                </Link>
        </Back>
        </>
    )
}

export default Confirm