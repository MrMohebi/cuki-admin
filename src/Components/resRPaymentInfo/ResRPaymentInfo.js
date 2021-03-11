import React , { useState } from 'react';
import "./css/style.css"

const ResRPaymentInfo = (props) => {
    const [timer, setTimer] = useState(3000);
    const [x, setX] = useState(false);
    const [display, setDisplay] = useState("none");
    setTimeout(()=>{setX(true)}, timer)
    setTimeout(()=>{setDisplay('inline-block')}, 1500)

    return (
        <div className={" mainContainer " + (x === true ? " popup open " : " popup ")} style={{display: display}}>
            <button onClick={()=>{setX(false); setTimeout(()=>{setDisplay("none")}, 1500)}}>sdf</button>
        </div>
    );
};

export default ResRPaymentInfo;
