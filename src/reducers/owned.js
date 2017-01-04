const owned = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_OWNED':
      var newData = {};
      newData[action.figure.id] = action.figure;      
      return Object.assign({}, state, newData)
    case 'REMOVE_OWNED':
      var DataRemoved = Object.assign({}, state);
      delete DataRemoved[action.figureId];      
      return Object.assign({}, DataRemoved)      
    default:
      return state
  }
}

export default owned

