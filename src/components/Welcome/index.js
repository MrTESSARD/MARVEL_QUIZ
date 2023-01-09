import React, {useState, Fragment, useEffect} from 'react'
import { auth } from '../Firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import Logout from '../Logout'
import Quiz from '../Quiz'

const Welcome = () => {
    const [userSession, setUserSession] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
       let listener = onAuthStateChanged(auth, (user) => {
            user ?
              setUserSession(user)
              :
              navigate('/', {replace: true})//replace interdit retour en arriere la page

            }
          );
        return () => {//demontage ou nettoyage 
            listener()
        };
    }, []);
    return userSession === null ? (
        <Fragment>
        <div className='loader'></div>
        <p>Loading ...</p>
        </Fragment>
    ) :(
        <div className='quis-bg' >
        <div className='container' >
        <Logout/>
        <Quiz/>
        </div>
    </div>
    )
    // const display = userSession 
    // ? () 
    // : ()
  
}

export default Welcome