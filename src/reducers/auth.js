import * as consts from '../consts';

const auth = (state = {}, action) => {
  switch (action.type) {
    case consts.TOKENEXISTS:
      var newData = {};
      newData["exists"] = action.exists;
      return Object.assign({}, state, newData)

    default:
      return state
  }
}

export default auth
