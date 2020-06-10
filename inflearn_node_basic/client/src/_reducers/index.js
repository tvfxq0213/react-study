import {combineReducers } from 'redux';
import user from './user_reducer';

// combineReducer 로 무엇을 하는가?
// 여러가지 state (각자의 기능에 대한 state 들에 대한 리듀서들)을 하나도 합쳐진 것

const rootReducer = combineReducers({
  user
})

export default rootReducer;