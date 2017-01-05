import { combineReducers } from 'redux'
import owned from './owned'
import wanted from './wanted'
////
import auth from './auth'

const mlcl = combineReducers({
  auth,
  owned,
  wanted
})

export default mlcl
