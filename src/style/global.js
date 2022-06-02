import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    /* body{ height: 300px; width: 65px; background: #F5F5F5; overflow-y: scroll; } */
    /* 스크롤바 설정*/
    ::-webkit-scrollbar{ /* 스크롤바 막대 너비 설정 */ width: 6px; }
    /* 스크롤바 막대 설정*/
    ::-webkit-scrollbar-thumb{ /* 스크롤바 막대 높이 설정 */ height: 17%; background-color: #e6e6e6;
    /* 스크롤바 둥글게 설정 */ border-radius: 10px; }
    /* 스크롤바 뒷 배경 설정*/
    ::-webkit-scrollbar-track{ background-color: rgba(0,0,0,0); }


  }

`

export default GlobalStyle