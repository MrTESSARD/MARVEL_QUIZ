import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup } from "react-icons/gi";
import Loader from '../Loader';
import Modal from '../Modal';
import axios, { Axios } from 'axios';
// import { FaChevronRight } from "react-icons/fa";
const QuizOver = React.forwardRef((props, ref) => {
    // console.log(props)
    // console.log(ref)
    const {
        levelNames,
        score,
        maxQuestions,
        quizLevel,
        percent,
        loadLevelQuestions
    } = props
    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY
    console.log(API_PUBLIC_KEY)
    const hash = 'c67bfe8f6d7072249c4da30526fc5e93'
    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [characterInfos, setCharacterInfos] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log(asked)
    useEffect(() => {
        setAsked(ref.current)
        if (localStorage.getItem('marvelStorageDate')) {
            const date = localStorage.getItem('marvelStorageDate')
            checkDataAge(date)
            
        }
    }, [ref]);

    const checkDataAge = date=>{
        const today = Date.now()
        const timeDifference = today-date
        const daysDifference = timeDifference/ (1000*3600*24)
        if (daysDifference>=15) {
            localStorage.clear()
            localStorage.setItem('marvelStorageDate', Date.now())
            
        }

    }

    //Modal
    const showModal = id => {
        setOpenModal(true)
        if (localStorage.getItem(id)) {
            setCharacterInfos(JSON.parse(localStorage.getItem(id)))
            setLoading(false)

        } else {


            axios
                .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
                .then(response => {
                    console.log(response)
                    setCharacterInfos(response.data)
                    setLoading(false)
                    
                    localStorage.setItem(id, JSON.stringify(response.data))
                    if (!localStorage.getItem('marvelStorageDate')) {
                        localStorage.setItem('marvelStorageDate', Date.now())
                    }
                })
                .catch(err => { console.log(err) })
        }
    }
    const hideModal = () => {
        setOpenModal(false)
        setLoading(true)
}
//Il faut afficher la prémière lettre en majuscule 
const capitalizeFirestletter = string =>{
    return string.charAt(0).toUpperCase()+string.slice(1)
}
    const averageGrade = maxQuestions / 2
    if (score < averageGrade) {
        // setTimeout(() => {loadLevelQuestions(0) }, 3000);//revenir au début du quiz si le score est faible
        setTimeout(() => { loadLevelQuestions(quizLevel) }, 3000);//revenir au début du niveau du quiz en cours si le score est faible
    }
    const decision = score >= averageGrade ? (
        <>
            <div className="stepsBtnContainer">

                {
                    quizLevel < levelNames.length ?
                        (
                            <>
                                <p className="successMsg">Bravo, passez au niveau suivant!</p>
                                <button
                                    className="btnResult success"
                                    onClick={() => loadLevelQuestions(quizLevel)}
                                >
                                    Niveau suivant
                                </button>
                            </>

                        )
                        :
                        (
                            <>
                                <p className="successMsg">
                                    <GiTrophyCup
                                        size={"60px"} />Bravo vous êtes un expert!</p>
                                <button
                                    className="btnResult gameOver"
                                    onClick={() => loadLevelQuestions(0)}
                                >
                                    Accueil
                                </button>
                            </>

                        )
                }
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>

            </div>
        </>
    )
        :
        (
            <>
                <div className="stepsBtnContainer">
                    <p className="failureMsg">Vous avez échoué"</p>
                </div>

                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent}%</div>
                    <div className="progressPercent">Note: {score}/{maxQuestions}</div>

                </div>
            </>
        )
    const questionAnswer = score >= averageGrade ? (asked.map(question => {
        return (
            <tr key={question.id}>
                <td>{question.question}</td>
                <td>{question.answer}</td>
                <td>
                    <button className="btnInfo"
                        onClick={() => showModal(question.heroId)}
                    >
                        infos
                    </button>
                </td>
            </tr>
        )
    }))
        :
        (
            <tr >
                <td colSpan="3">
                    <Loader // quand echec de Quiz
                        loadingMsg={"Pas de réponces!"}
                        styling={{ textAlign: "center", color: "red" }}
                    />
                </td>


            </tr>
        )
    const resultInModal = !loading ?
        (
            <Fragment>
                <div className="modalHeader">
                    <h2>{characterInfos.data.results[0].name}</h2>
                </div>
                <div className="modalBody">
                    <div className="comicImage">
                        <img
                            src={characterInfos.data.results[0].thumbnail.path + '.' + characterInfos.data.results[0].thumbnail.extension}
                            alt={characterInfos.data.results[0].name}
                        />

                        <p>{characterInfos.attributionText}</p>
                    </div>
                    <div className="comicDetails">
                        <h3>Description</h3>
                        {
                            characterInfos.data.results[0].description ?
                                <p>{characterInfos.data.results[0].description}</p>
                                : <p>Description indisponible ...</p>
                        }
                        <h3>Plus d'infos</h3>
                        {
                            characterInfos.data.results[0].urls &&
                            characterInfos.data.results[0].urls.map((url, index) => {
                                return <a
                                    key={index}
                                    href={url.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {capitalizeFirestletter(url.type)}
                                </a>
                            })
                        }
                    </div>
                </div>
                <div className="modalFooter">
                    <button className="modalBtn" onClick={hideModal}>Fermer</button>
                </div>
            </Fragment>
        )
        :
        (
            <Fragment>
                <div className="modalHeader">
                    <h2>Réponse de Marvel ...</h2>
                </div>
                <div className="modalBody">
                    <Loader />
                </div>
            </Fragment>
        )

    return (
        <Fragment>

            {decision}
            <hr />
            <p>Les réponses aux questions posées:</p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponses</th>
                            <th>infos</th>

                        </tr>

                    </thead>
                    <tbody>

                        {questionAnswer}
                    </tbody>

                </table>

            </div>
            <Modal showModal={openModal} hideModal={hideModal}>

                {resultInModal}
            </Modal>
        </Fragment>
    )
})



export default React.memo(QuizOver)