import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {admin_review_request} from '../../../reducers/admin/adminReview.js';
import {admin_del_review_request, admin_search_request} from '../../../reducers/admin/adminReview.js';
import { useEffect } from 'react';
import {Div, Dbutton, Sbutton, Table, Tr, Td} from '../../../components/styles/AdminTable';
import { AuthButton, Back } from "../../../components/styles/AdminStyles";


const ReviewSetting = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch({type:admin_review_request.toString()})
    },[dispatch])

    const review = useSelector(state=>state.adminReview.review.result)
    const search = useSelector(state=>state.adminReview.search)
    
    const onDeleteReview = (e) => {
        e.preventDefault()
        const {value} = e.target.reviewIdx
        dispatch(admin_del_review_request(value))
    }

    const schSubmit = (e) => {
        e.preventDefault()
        const {value} = e.target.searchInput

        dispatch(admin_search_request(value))
    }

    return(
        <>
        <Back>
            <h2 style={{width:'30%',textAlign:'center', margin:'4% auto', fontWeight:'bold', background:'#fff', fontSize:'25px'}}>Review</h2>
            <form style={{width:'70%', margin:' 0 auto', textAlign:"center"}} onSubmit={schSubmit}>
                <input style={{marginTop:'7%', fontSize:'20px'}} type="text" placeholder="내용 검색만 가능합니다." name="searchInput"/>
                <Sbutton  type="submit" name="searchButton">검색</Sbutton>
            </form>  
            <Div style={{marginTop:'2%'}}>
                <Table>
                    <thead>
                        <Tr>
                            <Td>Idx</Td>
                            <Td>Email</Td>
                            <Td>Text</Td>
                            <Td>Flavor</Td>
                            <Td>Atmos</Td>
                            <Td>Cheap</Td>
                            <Td>Service</Td>
                            <Td>Date</Td>
                            <Td></Td>
                        </Tr>
                    </thead>
                    <tbody>
                        {review !== undefined && search.length === 0 
                         ? review.map ((x) => {
                            return(
                                <>
                                    <Tr>
                                        <Td>{x.idx}</Td>
                                        <Td>{x.email}</Td>
                                        <Td>{x.text}</Td>
                                        <Td>{x.flavor}</Td>
                                        <Td>{x.atmosphere}</Td>
                                        <Td>{x.cheap}</Td>
                                        <Td>{x.service}</Td>
                                        <Td>{x.stamp}</Td>
                                        <Td>
                                            <form method="post" onSubmit={onDeleteReview} style={{display:'inline'}}>
                                                <input type="hidden" name = "reviewIdx" value={x.idx} />
                                               
                                                <Dbutton type="submit">삭제</Dbutton>
                                            </form>
                                        </Td>
                                    </Tr>
                                </>
                            );
                            
                        }): ""}
                        {search.length > 0 && search.map ((s) => {
                            return(
                                <>
                                    <Tr>
                                        <Td>{s.idx}</Td>
                                        <Td>{s.email}</Td>
                                        <Td>{s.text}</Td>
                                        <Td>{s.flavor}</Td>
                                        <Td>{s.atmosphere}</Td>
                                        <Td>{s.cheap}</Td>
                                        <Td>{s.service}</Td>
                                        <Td>{s.stamp}</Td>
                                        <Td>
                                            <form method="post" onSubmit={onDeleteReview} style={{display:'inline'}}>
                                                <input type="hidden" name = "reviewIdx" value={s.idx} />
                                               
                                                <Dbutton type="submit">삭제</Dbutton>
                                            </form>
                                        </Td>
                                    </Tr>
                                </>
                            );
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

export default ReviewSetting