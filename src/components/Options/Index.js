import React, { Component } from 'react';
import OptionComponents from './OptionComponents'
import { connect } from 'react-redux'
import { resetCounter, scoreUp, counterUp, levelUp, loseCounterUp, resetGameStats } from '../../actions/gameStat'
import { getNewQuestions,nextQuestion } from '../../actions/questions'
import {showAlert} from '../../actions/message'
import KeyboardEventHandler from 'react-keyboard-event-handler';

class OptionContainer extends Component{
    /**
    * Returns an array of 3 options with random order. It includes the correct Answer
    */
    generateOptions(){
        let answers = [this.props.currentAnswer]
        let incorrect1
        let incorrect2
        do{
            let randomIndex1 = Math.floor(Math.random() * (this.props.breeds.length))
            incorrect1 = this.props.breeds[randomIndex1]
            let randomIndex2 = Math.floor(Math.random() * (this.props.breeds.length))
            incorrect2 = this.props.breeds[randomIndex2]
        }while((incorrect1.toUpperCase()===incorrect2.toUpperCase())||(incorrect1.toUpperCase()===this.props.currentAnswer.toUpperCase())||(incorrect2.toUpperCase()===this.props.currentAnswer.toUpperCase()))
        answers.push(incorrect1,incorrect2)
        return this.shuffle(answers)
    }

    /**
    * Shuffles an array.
    * @param {Array} a items An array containing the items.
    */
     shuffle(a) {
        var j, x, i
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            x = a[i]
            a[i] = a[j]
            a[j] = x
        }
        return a
    }
    



    checkAnswer =(value)=>{
        
        if( value !== this.props.currentAnswer){
            this.props.showAlert("fas fa-times-circle",`That's not the correct answer, the correct answer is ${this.props.currentAnswer}. ${this.props.questionList.length} questions left`,"Next Question",this.props.nextQuestion,true)
            this.props.loseCounterUp();
            this.props.resetCounter()
        } else {
            this.props.showAlert("fas fa-check-circle",`Well Done, ${this.props.questionList.length} questions left`,"Next Question",this.props.nextQuestion,true)
            if( this.props.gameStat.counter === 3){
                console.log()
                this.props.resetCounter();
                this.props.levelUp();
                this.props.getNewQuestions(this.props.gameStat.level, 5);
                this.props.scoreUp()
                alert('Ready for the next level? More dogs!')
            } else {
                this.props.scoreUp();
                this.props.counterUp();
            }
            
            
        }
        if (this.props.questionList.length === 0){
            alert("GAME OVER LOOSER")
            this.props.resetGameStats()
            this.props.getNewQuestions(0, 5)

        }
    }

  
    render(){ 
        let answers = this.generateOptions();
        
        const keyboardEvent = (event) => {
            console.log(event)
            switch(event) {
                case "a":
                console.log(answers[0])
                  this.checkAnswer(answers[0])
                  break;
                case "b":
                console.log(answers[1])
                  this.checkAnswer(answers[1])
                  break;
                case "c":
                console.log(answers[2])
                 this.checkAnswer(answers[2])
                 break;
                default:
                return null
              }
        }
        
        return (
        <div className="optionsContainer">
    <KeyboardEventHandler handleKeys={['a', 'b', 'c']} onKeyEvent={(key, e) => keyboardEvent(key)} />
    <OptionComponents onclick={() => this.checkAnswer(answers[0])} breed={answers[0]} />
    <OptionComponents onclick={() => this.checkAnswer(answers[1])} breed={answers[1]} />
    <OptionComponents onclick={() => this.checkAnswer(answers[2])} breed={answers[2]} />
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        breeds : state.breeds,
        currentAnswer : state.questions.currentQuestion.correctAnswer,
        currentQuestion : state.questions.currentQuestion.question,
        gameStat: state.gameStat,
        questionList : state.questions.questionList
    }
}

export default connect(mapStateToProps, {resetCounter, scoreUp, counterUp, levelUp, loseCounterUp, getNewQuestions,nextQuestion,resetGameStats,showAlert })(OptionContainer)

