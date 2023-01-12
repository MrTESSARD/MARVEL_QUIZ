import React, {useState, Fragment, useEffect} from 'react'
import { auth, user } from '../Firebase/firebaseConfig';
import { getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import Logout from '../Logout'
import Quiz from '../Quiz'
import Loader from '../Loader';
// import { getDoc, getDocs } from 'firebase/firestore';

const Welcome = () => {
    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
       let listener = onAuthStateChanged(auth, (user) => {
            user ?
              setUserSession(user)
              :
              navigate('/', {replace: true})//replace interdit retour en arriere la page

            });
            if (!!userSession) {
                // console.log(userSession)
                const colRef = user(userSession.uid) // on mets l'id de la session récupéré -> dans colRef
                getDoc(colRef) //
                .then(snapshot=>{
                    if (snapshot.exists() ) {
                        const myData = snapshot.data()
                        console.log(snapshot)//le tout
                        console.log(myData)//juste data sur l'utilisateur
                        setUserData(myData)
                        
                    }
    
                })
                .catch(error =>{
                    console.log(error)
    
                })
            }
        return () => {//demontage ou nettoyage 
            listener()
        };
    }, [userSession]);
    return userSession === null ? (
        // <Fragment>
        // <div className='loader'></div>
        // <p className="loaderText">Loading ...</p>
        // </Fragment>
        <Loader // quand echec de Quiz
        loadingMsg={"Loading ..."}
        styling={{textAlign: "center", color: "#ffffff"}}
        />
    ) :(
        <div className='quis-bg' >
        <div className='container' >
        <Logout/>
        <Quiz userData={userData}/>
        </div>
    </div>
    )
    // const display = userSession 
    // ? () 
    // : ()
  
}

export default Welcome