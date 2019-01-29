import React, { Component } from 'react';
import OptionComponents from './OptionComponents'
import { connect } from 'react-redux'
import { resetCounter, scoreUp, counterUp, levelUp } from '../../actions/gameStat'


class OptionContainer extends Component{

    checkAnswer = () => {
        // True => update score
        // False => 
        // Get next question
    }

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
        }while((incorrect1===incorrect2)||(incorrect1===this.props.currentAnswer)||(incorrect2===this.props.currentAnswer))
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
    
    showAnswer() {
        // show this.props.currentAnswer
        // show next-question-button
    }



    checkAnswer =(value)=>{
    console.log(this.props.currentAnswer)
    console.log(this.props.currentQuestion)
    console.log(value)
        // this.showAnswer();
        
        if( value !== this.props.currentAnswer){
           this.props.resetCounter()
        } else {
            if( this.props.gameStat.counter === 3){
                console.log()
                this.props.resetCounter();
                this.props.levelUp();

            } else {
                this.props.scoreUp();
                this.props.counterUp();
            }

        }

    }

    render(){ 
        let answers = this.generateOptions();
        return (  
        <div className="optionsContainer">
                <OptionComponents onclick={() => this.checkAnswer(answers[0])} breed={answers[0]}/>
                <OptionComponents onclick={() => this.checkAnswer(answers[1])} breed={answers[1]}/>
                <OptionComponents onclick={() => this.checkAnswer(answers[2])} breed={answers[2]}/>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        breeds : state.breeds,
        currentAnswer : state.questions.currentQuestion.correctAnswer,
        currentQuestion : state.questions.currentQuestion.question,
        gameStat: state.gameStat
    }
}

export default connect(mapStateToProps, {resetCounter, scoreUp, counterUp, levelUp })(OptionContainer)