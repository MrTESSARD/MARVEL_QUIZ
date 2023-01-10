import React, { Component, componentDidMount } from 'react'
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import { QuizMarvel } from '../quizMarvel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// toast.configure();
class Quiz extends Component {
  state = {
    levelNames: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],//toutes les questions sans les reponces corectes
    question: null,//question actuelle
    options: [],//les options de reponses pour la question actuelle
    idQuestion: 0,//id de la question actuelle
    btnDisabled: true, //bouton l'activation
    userAnswer: null,//la reponce selectionnée
    score: 0, //le score actuel
    showWelcomeMsg: false



  }

  storedDataRef = React.createRef()
    //********************************************************** */
  loadQuastions = quizz => {
    // console.log(quizz)
    const fetchArrayQuiz = QuizMarvel[0].quizz[quizz]
    //  console.log(fetchArrayQuiz)
    if (fetchArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current= fetchArrayQuiz // on mets tout le tableau de DATA dans => current
      // console.log("storedDataRef.current")
      // console.log( this.storedDataRef.current)



      const newArray = fetchArrayQuiz.map(({ answer, ...keepRest }) => keepRest);//ja laise answer et je recupere le reste dans => keepRest
      this.setState({
        storedQuestions: newArray//toutes les questions

      })

    } else {
      console.log("Pas assez de questions!!!")
    }

  }
  //********************************************************** */
  showToastMsg= pseudo =>{
    if (!this.state.showWelcomeMsg) {
      this.setState({
        showWelcomeMsg: true
      })

      
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
    this.loadQuastions(this.state.levelNames[this.state.quizLevel])

  }
  //********************************************************** */
  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {


    } else {
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1
      }))
    }
    // this.storedDataRef.current
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer//on recupere la bonne réponse dela question actuelle
    if (this.state.userAnswer === goodAnswer) {//on compare la réponse avec la bonne réponse
      this.setState(prevState=>({
        score: prevState.score +1
      }))
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
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      // console.log(this.state.storedQuestions[0].question)
      // console.log(this.state.storedQuestions[this.state.idQuestion])
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question, //MAJ la question actuelle
        options: this.state.storedQuestions[this.state.idQuestion].options //mAJ les options de reponses pour la question actuelle
      })
    }
    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question, //MAJ la question actuelle
        options: this.state.storedQuestions[this.state.idQuestion].options, //mAJ les options de reponses pour la question actuelle
        userAnswer:null,//vider la réponse
        btnDisabled: true, //remettre à disabled le bouton l'activation


      })
      
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
  
  //  notify = () => toast("Wow so easy!");


    //********************************************************** */
  render() {
    // const {pseudo} = this.props.userData
    const displayOptions = this.state.options.map((option, index) => { //afficher les options
      
      return (
        <p key={index} className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}

          onClick={() => this.subminAnswer(option)}
        >
          {option}
        </p>
      )
    })

    return (
      <div >
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button disabled={this.state.btnDisabled} className="btnSubmit"
          onClick={this.nextQuestion}>
          Suivant
        </button>
        <ToastContainer />


      </div>
    )
  }
}

export default Quiz

