import React, { Component, componentDidMount, Fragment } from 'react'
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import { QuizMarvel } from '../quizMarvel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver';
import { FaChevronRight } from 'react-icons/fa';

const initialState = {
  
  quizLevel: 0,//le niveau actuel ateint 
  maxQuestions: 10,
  storedQuestions: [],//toutes les questions sans les reponces corectes
  question: null,//question actuelle
  options: [],//les options de reponses pour la question actuelle
  idQuestion: 0,//id de la question actuelle
  btnDisabled: true, //bouton l'activation
  userAnswer: null,//la reponce selectionnée
  score: 0, //le score actuel
  showWelcomeMsg: false,
  quizEnd: false, //on a pas encore fini le niveau
  percent: null
}
const levelNames= ["debutant", "confirme", "expert"]

// toast.configure();
class Quiz extends Component {
  constructor(props) {
    super(props)
  
    this.state=initialState
    this.storedDataRef = React.createRef()
  }



    //********************************************************** */
    loadQuestions = quizz => {//pour charger les questions
    // console.log(quizz)
    const fetchArrayQuiz = QuizMarvel[0].quizz[quizz]
    //  console.log(fetchArrayQuiz)
    if (fetchArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current= fetchArrayQuiz // on mets tout le tableau de DATA dans => current
      // console.log("storedDataRef.current")
      // console.log( this.storedDataRef.current)



      const newArray = fetchArrayQuiz.map(({ answer, ...keepRest }) => keepRest);//ja laise answer et je recupere le reste dans => keepRest
      this.setState({storedQuestions: newArray})//toutes les questions
    }

  }
  //********************************************************** */
  showToastMsg= pseudo =>{
    // console.log(this.state.storedQuestions)
    if (!this.state.showWelcomeMsg) {
      this.setState({showWelcomeMsg: true})

      
      toast.warn(`Bienwenue ${pseudo}, et bonne chance`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,//cacher  la barre de progression
        closeOnClick: true,//cache au click
        pauseOnHover: true,//pause hover
        draggable: false,//on peut pas la faire glisser
        progress: undefined,
        theme: "light",
        });
    }

  }
  //********************************************************** */
  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel])

  }
  //********************************************************** */
  nextQuestion = () => {
    // console.log(this.state.idQuestion)
    // console.log(this.state.maxQuestions)
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      // console.log("Game over")
      // this.gameOver()
      this.setState({quizEnd: true})


    } else {
      this.setState(prevState => ({idQuestion: prevState.idQuestion + 1}))
    }
    // this.storedDataRef.current
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer//on recupere la bonne réponse dela question actuelle
    
    if (this.state.userAnswer === goodAnswer) {//on compare la réponse avec la bonne réponse

      this.setState(prevState=>({score: prevState.score +1}))

      toast.success(`Bravo +1`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,//cacher  la barre de progression
        closeOnClick: true,//cache au click
        pauseOnHover: true,//pause hover
        draggable: false,//on peut pas la faire glisser
        progress: undefined,
        theme: "dark",
        bodyClassName: "toastify-color",
        });
      
    }else{
      toast.error(`Raté 0`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,//cacher  la barre de progression
        closeOnClick: true,//cache au click
        pauseOnHover: true,//pause hover
        draggable: false,//on peut pas la faire glisser
        progress: undefined,
        theme: "dark",
        bodyClassName: "toastify-color",
        });

  }
    console.log(goodAnswer)

  }
    //********************************************************** */
  componentDidUpdate(prevProps, prevState) {
    const     {
    maxQuestions,
    storedQuestions,//toutes les questions sans les reponces corectes

    idQuestion,//id de la question actuelle
    score, //le score actuel

    quizEnd, //on a pas encore fini le niveau
  } = this.state
    if ((storedQuestions !== prevState.storedQuestions) && storedQuestions.length) {
      // console.log(storedQuestions[0].question)
      // console.log(storedQuestions[idQuestion])
      this.setState({
        question: storedQuestions[idQuestion].question, //MAJ la question actuelle

        options: storedQuestions[idQuestion].options //mAJ les options de reponses pour la question actuelle
      })
    }
    if ((idQuestion !== prevState.idQuestion) && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question, //MAJ la question actuelle
        options: storedQuestions[idQuestion].options, //mAJ les options de reponses pour la question actuelle
        userAnswer:null,//vider la réponse
        btnDisabled: true, //remettre à disabled le bouton l'activation


      })
      
    }
    if (quizEnd!==prevState.quizEnd) {
      // console.log(score)
      const gradePercent= this.getPercent(maxQuestions, score)
      this.gameOver(gradePercent)

      
    }
    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo)
  }

  }
    //********************************************************** */
  subminAnswer = selectedAnswer => {
    this.setState({
      userAnswer: selectedAnswer,//
      btnDisabled: false

    })

  }
  getPercent = (maxQuestion, ourScore)=>(ourScore/maxQuestion)*100

  gameOver=(percent)=>
  {
    if (percent>=50) {
      this.setState({
        quizLevel: this.state.quizLevel+1,
        percent,

      })
      
    }else{
      this.setState({percent})
    }
 

  }
  //  notify = () => toast("Wow so easy!");

  loadLevelQuestions=param=>{
    this.setState({...initialState, quizLevel: param})//on prends tous le state mais on modifie uniquement quizLevel

    this.loadQuestions(levelNames[param]);

  }
    //********************************************************** */
  render() {
const     {
  quizLevel,//le niveau actuel ateint 
    maxQuestions,
    question,//question actuelle
    options,//les options de reponses pour la question actuelle
    idQuestion,//id de la question actuelle
    btnDisabled, //bouton l'activation
    userAnswer,//la reponce selectionnée
    score, //le score actuel
    quizEnd, //on a pas encore fini le niveau
    percent
  } = this.state
  console.log(quizLevel)
    const displayOptions = options.map((option, index) => { //afficher les options
      
      return (
        <p key={index} className={`answerOptions ${userAnswer === option ? "selected" : null}`}

          onClick={() => this.subminAnswer(option)}
        >
         <FaChevronRight/> {option}
        </p>
      )
    })
    return quizEnd ?  
    (<QuizOver
    ref={this.storedDataRef}
    levelNames={levelNames}
    score={score}
    maxQuestions={maxQuestions}
    quizLevel={quizLevel}
    percent={percent}
    loadLevelQuestions={this.loadLevelQuestions}


    /> )
    :(

    <Fragment >
    <Levels 
    levelNames={levelNames}
    quizLevel={quizLevel}
    />

    <ProgressBar 
    idQuestion={idQuestion}
    maxQuestions={maxQuestions}
    />

    <h2>{question}</h2>

    {displayOptions}

    <button disabled={btnDisabled} className="btnSubmit"
      onClick={this.nextQuestion}>
      {idQuestion < maxQuestions-1 ? "Suivant" : "Terminé"}
    </button>

    <ToastContainer />
</Fragment>
    )
    
  }
}

export default Quiz

