import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {admin_store_request} from '../../../reducers/admin/admin.js';
import {admin_delete_store_request} from '../../../reducers/admin/deleteStore'
import { useEffect } from 'react';
import {Div, Ebutton, Dbutton, Table, Tr, Td} from '../../../components/styles/AdminTable';
import { AuthButton,Back } from "../../../components/styles/AdminStyles";


const StoreSetting = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch({type:admin_store_request.toString()})
    },[dispatch])
    const stores = useSelector(state=>state.admin.store)

    const onDelete = (e) => {
        e.preventDefault()
        const {value} = e.target.storeidx
        dispatch(admin_delete_store_request(value))
    }

    return(
        <> 
        <Back>
            <h2 style={{width:'30%',textAlign:'center', margin:'4% auto', fontWeight:'bold', background:'#fff', fontSize:'25px'}}>STORE</h2>
            <Div>
            <Table>
                <thead>
                    <Tr>
                        <Td>idx</Td>
                        <Td>name</Td>
                        <Td>ADMIN</Td>
                    </Tr>
                </thead>
                <tbody>
                    {stores && stores.map ((x,i) => {
                        if(x.idx < stores.length/3+1){
                            return(
                                
                                    <Tr key={i}>
                                        <Td>{x.idx}</Td>
                                        <Td>{x.name}</Td>
                                        <Td>
                                            <Link to={"/dt/admin/menu/store/setting/"+x.idx}><Ebutton>수정</Ebutton></Link>
                                            <form method="post" onSubmit={onDelete} style={{display:'inline'}}>
                                                <input type="hidden" name = "storeidx" value={x.idx} />
                                                <input type="hidden" name = "idx" value="" />
                                                <Dbutton type="submit">삭제</Dbutton>
                                            </form>
                                        </Td>
                                    </Tr>
                                    
                                
                            );
                        }
                    })}
                </tbody>
            </Table>
            <Table>
                <thead>
                    <Tr>
                        <Td>idx</Td>
                        <Td>name</Td>
                        <Td>ADMIN</Td>
                    </Tr>
                </thead>
                <tbody>
                    {stores && stores.map ((x,i) => {
                        if(stores.length/3+1 < x.idx && x.idx < stores.length*2/3+1){
                            return(
                                <Tr key={i}>
                                    <Td>{x.idx}</Td>
                                    <Td>{x.name}</Td>
                                    <Td>
                                        <Link to={"/dt/admin/menu/store/setting/"+x.idx}><Ebutton>수정</Ebutton></Link>
                                        <form method="post" onSubmit={onDelete} style={{display:'inline'}}>
                                                <input type="hidden" name = "storeidx" value={x.idx} />
                                       
                                                <Dbutton type="submit">삭제</Dbutton>
                                        </form>
                                    </Td>
                                </Tr>
                            );
                        }
                    })}
                </tbody>
            </Table>
            <Table>
                <thead>
                    <Tr>
                        <Td>idx</Td>
                        <Td>name</Td>
                        <Td>ADMIN</Td>
                    </Tr>
                </thead>
                <tbody>
                    {stores && stores.map ((x,i) => {
                        if( stores.length*2/3+1 < x.idx && x.idx <= stores.length){
                            return(
                                <Tr key={i}>
                                    <Td>{x.idx}</Td>
                                    <Td>{x.name}</Td>
                                    <Td>
                                        <Link to={"/dt/admin/menu/store/setting/"+x.idx}><Ebutton>수정</Ebutton></Link>
                                        <form method="post" onSubmit={onDelete} style={{display:'inline'}}>
                                                <input type="hidden" name = "storeidx" value={x.idx} />
                                                <Dbutton type="submit">삭제</Dbutton>
                                        </form>
                                    </Td>
                                </Tr>
                            );
                        }
                    })}
                </tbody>
            </Table>
            </Div>
            <Link to="/dt/admin/menu">
                <div style={{textAlign:"center"}}>
                    <AuthButton>Admin Menu</AuthButton>
                </div>
            </Link>

        </Back>
        </>
    )
}

export default StoreSetting