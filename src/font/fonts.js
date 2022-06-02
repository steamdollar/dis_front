import { createGlobalStyle } from 'styled-components';
import SFLemon from './YdestreetB.woff'

export default createGlobalStyle`
    @font-face {
    font-family: 'YdestreetB';
    src:local('YdestreetB'),
    url('${SFLemon}') format('woff');
    font-weight: normal;
    font-style: normal;
}
`

