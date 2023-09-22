// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import users from "../../views/user/store/reducer";

const rootReducer = combineReducers({
  auth,
  navbar,
  users,
  layout
})

export default rootReducer
