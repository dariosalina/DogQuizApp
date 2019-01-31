import shuffle from '../tools/ArrayShuffle'
import {
  CHECK_ANSWER,
  SET_QUESTIONS,
  NEXT_QUESTION,
  UPDATE_BREEDS,
  REMOVE_BREED
} from '../actions/questions'

// USED ONLY FOR CHECKS 
export const questionOneExample = {
  type:1,
  breed:"Akita",
  option1:"https://images.dog.ceo/breeds/akita/512px-Akita_inu.jpeg",
  option2:"https://images.dog.ceo/breeds/appenzeller/n02107908_3791.jpg",
  option3:"https://images.dog.ceo/breeds/cairn/n02096177_1000.jpg"
}
// USED ONLY FOR CHECKS 
export const questionTwoExample = {
  type:2,
  breed:"https://images.dog.ceo/breeds/akita/512px-Akita_inu.jpeg",
  option1:"Akita",
  option2:"Dalmata",
  option3:"Bulldog"
}

const initialState = {
  questionList: [],
  currentQuestion: null,
  breeds:[]
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHECK_ANSWER:
      return state
    case SET_QUESTIONS:
      return {
        ...state,
        questionList: shuffle(action.payload.slice(1)),
        currentQuestion: { ...action.payload[0] }
      }
    case NEXT_QUESTION:
      return {
        ...state,
        questionList: state.questionList.slice(1),
        currentQuestion: { ...state.questionList[0] }
      }
    case UPDATE_BREEDS:
      return {
        ...state,
        breeds : action.payload
      }
      case REMOVE_BREED:
      return {
        ...state,
        breeds :  [...state.breeds.filter(elem=>elem!==action.payload)]
      }

    default:
      return state
  }
}