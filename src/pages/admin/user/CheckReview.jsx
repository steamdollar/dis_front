import { Link, useParams  } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {admin_black_review_request} from '../../../reducers/admin/adminBlackReview.js';
import { useEffect } from 'react';
import {Div, Table, Tr, Td} from '../../../components/styles/AdminTable';
import { AuthButton,Back } from "../../../components/styles/AdminStyles";


const CheckReview = () => {

    let paramas = useParams()
    let email = paramas.email
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(admin_black_review_request(email))
    },[dispatch])
    const blackReviews = useSelector(state=>state.adminBlackReview.review)
    
    return(
        <> 
        <Back>
            <h2 style={{textAlign:'center', marginTop:'4%'}}>Review</h2>
            <Div style={{marginTop:'3%'}}>
            <Table>
                <thead>
                    <Tr>
                        <Td>Idx</Td>
                        <Td>Text</Td>
                        <Td>Flavor</Td>
                        <Td>Atmosphere</Td>
                        <Td>Cheap</Td>
                        <Td>Service</Td>
                    </Tr>
                </thead>
                <tbody>
                    {blackReviews && blackReviews.map ((x, i) => {
                        return(
                            <>
                                <Tr>
                                    <Td>{x.idx}</Td>
                                    <Td>{x.text}</Td>
                                    <Td>{x.flavor}</Td>
                                    <Td>{x.atmosphere}</Td>
                                    <Td>{x.cheap}</Td>
                                    <Td>{x.service}</Td>
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

export default CheckReview