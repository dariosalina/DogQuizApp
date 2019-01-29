import React, { Component } from 'react';
import axios from 'axios'
import Game from './Game';
import { connect } from 'react-redux'
import { levelUp } from '../../actions/gameStat'
import { getQuestionList, nextQuestion } from '../../actions/questions'


class GameContainer extends Component{

    state = {
        maxQuestionPerBreed: 3
    }

    componentDidMount() {
        this.levelUp()
    }

    levelUp = async () => {

        const level = this.props.gameStat.level + 1
        const totalBreed = level * 3

        await axios.get('https://dog.ceo/api/breeds/list/all').then( async (result) => {
            const breeds = Object.keys(result.data.message).slice(0, totalBreed)
            this.props.getQuestionList(breeds, this.state.maxQuestionPerBreed)
        })

        this.props.levelUp()
    }

    onNextQuestion = () => {
        this.props.nextQuestion()
    }

    render(){ 
        return (<Game {...this.props.currentQuestion} handleNextQuestion={this.onNextQuestion}/>)
    }
}

const mapStateToProps = (state) => {
    return {
        currentQuestion: state.questions.currentQuestion,
        gameStat: state.gameStat
    }
}

export default connect(mapStateToProps, { levelUp,  getQuestionList, nextQuestion })(GameContainer)