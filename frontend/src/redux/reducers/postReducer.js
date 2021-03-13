import { ADD_POST } from '../constants/types'

const initialState = []

const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_POST:
        return[...state,action.payload]
      default:
        return state;
    }
  };
  
  export default postReducer;