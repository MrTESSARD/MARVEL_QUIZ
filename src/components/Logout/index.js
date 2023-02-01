import React, {useState, useEffect} from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';
import { Navigate, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';






const Logout =()=> {
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        if (checked) {
            signOut(auth).then(() => {
                // Sign-out successful.
                console.log("Vous êtes déconnecté")
                setTimeout(() => {
                    navigate('/')
                    
                }, 1000);
              }).catch((error) => {
                // An error happened.
                setError(error)
              });
            
        }
    }, [checked]);
    
  
    
    const handleChange = event => {
        setChecked(event.target.checked)
    }
    // console.log(checked)
    
    
  return (
    <div className='logoutContainer'>
        {error !=="" && <span>{error.message}</span>}
        <label className='switch'>
            <input 
            onChange={handleChange}
            type="checkbox"
            checked={checked} />
            <span id="attributes-variant" className='slider round' data-tooltip-content="Déconnexion!" data-tooltip-variant="dark" ></span>
            {/* <a id="attributes-variant" > ◕‿‿◕ </a> */}

        </label>
<Tooltip anchorId="attributes-variant" place="left"/>
    </div>
  )
}

export default Logout