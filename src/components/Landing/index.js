import React, {useRef, useEffect, useState, Fragment} from 'react'
import { Link } from "react-router-dom";


const Landing = () => {
    const refWolvering = useRef(null)
    const [btn, setBtn] = useState(false);
    console.log(btn)

    useEffect(() => {
        refWolvering.current.classList.add("startingImg")
        setTimeout(() => {
            refWolvering.current.classList.remove ("startingImg")
            setBtn(true)
        }, 1000); 
    }, []);

    const setLeftImg = ()=> {
        refWolvering.current.classList.add ("leftImg")
    }
    const setRightImg = ()=> {
        refWolvering.current.classList.add ("rightImg")
    }
    const clearImg = ()=> {
        refWolvering.current.classList.remove ("rightImg")
        refWolvering.current.classList.remove ("leftImg")
    }


    const displayBtn = btn && (
        <Fragment>
        <div onMouseOver={setLeftImg} onMouseOut={clearImg} className='leftBox'><Link className='btn-welcome' to={"/signup"}>Inscription</Link></div>
        <div onMouseOver={setRightImg} onMouseOut={clearImg} className='rightBox'><Link className='btn-welcome' to={"/login"}>Connexion</Link></div>
        </Fragment>
    )
    // console.log(refWolvering)
  return (
    <main ref={refWolvering} className='welcomePage' >
        {displayBtn}
        
    </main>
  )
}

export default Landing