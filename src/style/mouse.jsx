import styled from 'styled-components'
import { isMobile } from 'react-device-detect';
import display from '../reducers/display';
import { frontend } from '../utils/ip.js'
const Fork = styled.img`

    position: absolute;
    width: 30px; 
    height: 120px;
    transform: translate(100%, 0%) rotate(-35deg);
    z-index:3000;

`
if (isMobile==false){
    document.addEventListener("mousemove", (e) => {
        const fork = document.querySelector(".fork")
        // console.log(fork)

        const mouseX = e.clientX;
        const mouseY = e.pageY;
        if(fork !==null){
            fork.style.left = mouseX + 'px';
            fork.style.top = mouseY + 'px';
        }
        // fork.style.left = mouseX + 'px';
        // fork.style.top = mouseY + 'px';
    });
}



const forkComponent = () => {
    return(
        <>
            {isMobile==false &&
            <Fork src='http://donut999.shop/img/fork.png' className="fork"/>
            }
        </>
        
    )
}
export default forkComponent;
