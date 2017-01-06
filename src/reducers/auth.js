import * as consts from '../consts';

const auth = (state = {}, action) => {
  let newData = {};
  switch (action.type) {
    case consts.TOKENEXISTS:
      newData["exists"] = action.exists;
      return Object.assign({}, state, newData)
    case consts.USERDATA:
      newData["user"] = action.user;
      return Object.assign({}, state, newData)
    default:
      return state
  }
}

export default auth
