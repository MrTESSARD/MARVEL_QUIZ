import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user  } from '../Firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom'
import { setDoc } from 'firebase/firestore';


const Signup = (props) => {
    // console.log(firebase)


    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState('');
    console.log(error)
    const navigate = useNavigate();

    // console.log(navigate)

    const handleChange = e => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault()//blocker le refraichicement de la page 
        const { email, password, pseudo } = loginData
        createUserWithEmailAndPassword(auth, email, password)
        .then(authUser => { //cas où on a reusi l'inscription
            return setDoc(user(authUser.user.uid), {
                pseudo, 
                email
            })
            

            })
            .then(() => { //cas où on a reusi l'inscription
                setLoginData({ ...data })
                navigate('/welcome')

            }
            )
            .catch(error => {
                setError(error)
                setLoginData({ ...data })


            })
    }




    const { pseudo, email, password, confirmPassword } = loginData
    const btn = pseudo === "" || email === "" || password === "" || password !== confirmPassword
        ? <button disabled>Inscription</button>
        : <button >Inscription</button>

    //restion errors
    const errorMsg = error !== "" && <span>{error.message}</span>
    return (
        <div className='signUpLoginBox' >
            <div className='slContainer'>
                <div className='formBoxLeftSignup' >

                </div>
                <div className='formBoxRight' >
                    <div className='formContent' >
                        {errorMsg}
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit} >
                            <div className='inputBox'>
                                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete='off' required />
                                <label htmlFor="pseudo">Pseudo</label>

                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete='off' required />
                                <label htmlFor="email">Email</label>

                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete='off' required />
                                <label htmlFor="password">Mot de passe</label>

                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete='off' required />
                                <label htmlFor="confirmPassword">Confirmez le mot de passe</label>

                            </div>
                            {btn}
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/login">Déja inscrit? Connectez-vous</Link>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Signup