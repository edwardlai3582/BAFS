import * as consts from '../consts';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const addOwned = (figure) => ({
  type: 'ADD_OWNED',
  figure
})

export const removeOwned = (figureId) => ({
  type: 'REMOVE_OWNED',
  figureId
})

export const addWanted = (figure) => ({
  type: 'ADD_WANTED',
  figure
})

export const removeWanted = (figureId) => ({
  type: 'REMOVE_WANTED',
  figureId
})

/*
export const loginWithToken = (token) => ({
  type: types.LOGIN_WITH_TOKEN,
  token
})
*/
export const tokenExists = (...args) => {
  return function (dispatch) {
    dispatch({
      type: consts.TOKENEXISTS,
      exists: args[0]
    });
    if(args[0] && args[1]){
      dispatch({
        type: consts.USERDATA,
        user: args[1]
      });
    }
  }
}

export const loginWithToken = (token)=> {
  return function (dispatch) {
    //dispatch(requestPosts(subreddit))
    console.log("send "+token)
    return axios.get(`http://localhost:3001/api/authenticate?token=${token}`)
      .then(response => {
        if(response.data.message){
            console.log(response.data.message)
        }
        else{
          localStorage.setItem("jwtToken", response.data.token);
          dispatch(tokenExists(true, jwtDecode(response.data.token)._doc));
          console.log(response)
        }
      })
  }
}
