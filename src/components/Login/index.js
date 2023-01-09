import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase/firebaseConfig';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        
        if (password.length>5 && email!=="") {
            setBtn(true)
        }
        else if (btn === true){
            setBtn(false)

        }
    }, [password, email, btn]);

    const handleSubmit = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(user => { //cas où on a reusi l'inscription
            setEmail("")
            setPassword("")
            navigate('/welcome', {replace: true})//replace interdit retour en arriere la page

        })
        .catch(error => {
            setError(error)
            setPassword("")


        })
        // console.log(email);
    }
   

    return (
        <div className='signUpLoginBox' >
            <div className='slContainer'>
                <div className='formBoxLeftLogin' >

                </div>
                <div className='formBoxRight' >
                    <div className='formContent' >
                    {error !=="" && <span>{error.message}</span>}
                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>

                            <div className='inputBox'>
                                <input onChange={e=>setEmail(e.target.value)} value={email} type="email"  autoComplete='off' required />
                                <label htmlFor="email">Email</label>

                            </div>
                            <div className='inputBox'>
                                <input onChange={e=>setPassword(e.target.value)} value={password} type="password"  autoComplete='off' required />
                                <label htmlFor="password">Mot de passe</label>

                            </div>
                            {/* {btn ? <button>Connexion</button> : <button disabled>Connexion</button>} */}
                            {<button disabled={btn ? false : true}>Connexion</button>}
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/signup">Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant. </Link>
                            <br/>
                            <Link className='simpleLink' to="/forgetpassword">Mot de passe oublié? Récupéréz-le ici.</Link>
                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default Login
