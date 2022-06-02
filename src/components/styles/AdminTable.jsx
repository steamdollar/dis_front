import styled from 'styled-components'

export const Div = styled.div`
    display: flex;
    justify-content: space-around;

`
export const Divv = styled.div`
    width:1200px;

`

export const Ebutton = styled.button`
    display: inline;
    border:none;
    background-color: #ff5bb3;
    color:#fff;
    padding: 5px 7px;
`

export const Dbutton = styled.button`
    display: inline;
    border:none;
    background-color: #ff4136;
    color:#fff;
    padding: 5px 7px;
`

export const Rbutton = styled.button`
    padding: 5px 7px;
    border:none;
    background: #b9ff84;
`

export const Sbutton = styled.button`
    padding: 5px 7px;
    border:none;
    background: #ca84ff;
    font-size: 20px;
    margin-left:4%;
    color:#fff;
`


export const Table = styled.table`
    text-align: center;
    background: #fff;
   
   

`

export const Tr = styled.tr`
    text-align: center;
    &:nth-child(1){
        font-weight:bold;
    }
    border-spacing: 1px 40px;
    border: 1px solid pink;

    &>Td:nth-child(2){
        width:280px;
    }
   
`

export const Td = styled.td`
    text-align: center;

    border: 1px solid pink;


    
   

`

