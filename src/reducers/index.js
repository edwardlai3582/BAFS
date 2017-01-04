import { combineReducers } from 'redux'
import owned from './owned'
import wanted from './wanted'

const mlcl = combineReducers({
  owned,
  wanted    
})

export default mlcl
