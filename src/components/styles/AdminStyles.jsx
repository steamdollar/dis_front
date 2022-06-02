import styled from 'styled-components'

export const Back = styled.div`
    position:fixed;
    z-index: 2000;
    width:100%;
    height:100%;
    justify-content:center;
    align-items: center;
    top:0px;
    background: #FFFCDD;
    overflow: scroll;

`

export const Li = styled.li`
    color:#ff1eb2;
    margin-top:30%;
    font-weight:bold;
`

export const AuthInputBox = styled.input`
    font-size:1rem;
    border:none;
    border-bottom:1px solid #666;
    padding:0.5rem 0 0.3rem 0;
    outline:none;
    width:250px;
    margin-left: 4%;
    margin-top:8%;
    &:focus {
        border-bottom: 1px solid #999;
    }

    & + & {
        margin-top:0.5rem;
    }
`

export const AuthForm = styled.form`
    
    width: 300px;
    position:relative;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
`

export const AuthTable = styled.div`
    margin:0 auto;
    margin-left: 2%;

`
export const AuthDiv = styled.div`
    width:100%;
    margin: 0 auto;
    text-align: center;
`

export const AuthButton = styled.button`
    width: 150px;
    height: 35px;
    padding: 5px 7px;
    margin: 0 auto;
    margin-top:7%;
    background-color: pink;
    /* border:none; */
    color:#000;
    font-weight:bolder;
`

export const AdminMenuDiv = styled.div`
    display: flex;
   
    width:90%;
    height: 30%;
    font-size:1rem;
    justify-content: space-around;
    position:relative;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
`

export const AdminInput = styled.input`
    width: 40%;
    padding:3px;
    border:none;
    background-color: #fff;
    font-weight: bold;
    font-size:1.5rem;
`

export const BigButton = styled.button`
    padding:7px;
    border:1px solid #fff;
    border-radius: 50px;
    background: #fff;
    font-weight: bold;
    font-size:1.5rem;
    cursor: pointer;
`

export const Ol = styled.ol`
    margin-top: 30%;
    font-size: 20px;
    &>li{
        margin-top:10%;
    } 
`

export const Submit = styled.input`
width: 10%;
height: 8%;
margin-right: 20px;
padding: 5px 7px;
background: #EE82EE;
color:#fff;
border-color:pink;


cursor: pointer;

`;


export const BackBtn = styled.button`
width:20%;
height: 8%;
padding: 5px 7px;
background: #fff;

cursor: pointer;
&:hover{
    opacity: 0.5;
}

&>a{
    color:#000;
}
`;

