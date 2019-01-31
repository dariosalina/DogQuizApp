import React from 'react'
import CardPicture from './CardPicture'
import HeaderContainer from '../Header/Index'
import './game.css'
import OptionContainer from '../Options/Index'
import Modal from '../Modal';
import {questionOneExample} from '../../reducers/questions'
import {questionTwoExample} from '../../reducers/questions'

export default (props) => {
  return (
    <section className="game">
        <HeaderContainer />
        <CardPicture currentQuestion={questionOneExample}/>
        <OptionContainer />
        <Modal/>
    </section> 
  )
}

// You can see a picture of a dog, try to guess the breed among the three choices. 
// After three right guesses you will go to the next level.
//  