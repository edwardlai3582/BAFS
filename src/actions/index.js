import * as consts from '../consts';
import axios from 'axios';

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

export const loginWithToken = (token)=> {
  return function (dispatch) {
    //dispatch(requestPosts(subreddit))
    console.log("send "+token)
    return axios.get(`http://localhost:3001/api/authenticate?token=${token}`)
      .then(response => {
        //response.json()
        localStorage.setItem("jwtToken", response.data.token);
        dispatch({
          type: consts.TOKENEXISTS,
          exists: true          
        });
        console.log(response)
      })
      .then(json =>{}
        //dispatch(receivePosts(subreddit, json))
      )
  }
}

export const tokenExists = (exists) => ({
  type: consts.TOKENEXISTS,
  exists
})
