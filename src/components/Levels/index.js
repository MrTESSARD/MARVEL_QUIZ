import React,{useEffect, useState} from 'react'
import Stepper from 'react-stepper-horizontal/lib/Stepper'

const Levels = ({levelNames,quizLevel }) => {
  const [levels, setLevels] = useState([]);
  useEffect(() => {
   const quizSteps=levelNames.map(level=>({title: level.toUpperCase()} ))
    setLevels(quizSteps)
    // console.log(levels)

   
  }, [levelNames]);
  return (
    <div className="levelsContainer" style={{background: "transparent"}}>
            <Stepper 
            steps={levels} 
              activeStep={quizLevel  }//quizLevel
              circleTop={0}	//https://www.npmjs.com/package/react-stepper-horizontal
              activeTitleColor={"#d31017"}
              activeColor={"#d31017"}
              completeTitleColor={"#e0e0e0"}
              defaultTitleColor={"#e0e0e0"}
              completeColor={"#e0e0e0"}
              completeBarColor={"#e0e0e0"}
              barStyle={"dashed"}
              size={50}
              circleFontSize={20}

               />

    </div>
  )
}

export default Levels