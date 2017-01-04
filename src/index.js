/*global FB*/
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import TopLevel from './components/TopLevel'
import CheckList from './containers/CheckList'
import WantList from './containers/WantList'
import HomePage from './containers/HomePage'
import reducer from './reducers'

//const store = createStore(reducer)
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
/*
render(
  <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={TopLevel}>
          <IndexRoute component={HomePage}/>
          <Route path="checkList" component={CheckList}/>
          <Route path="wantList" component={WantList}/>
        </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
)
*/
///////////////////////////////////////////
window.fbAsyncInit = function() {
  FB.init({
    appId: '202100026921672',
    cookie: true,
    xfbml: true,
    version: 'v2.8',
  });

  render(
    <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={TopLevel}>
            <IndexRoute component={HomePage}/>
            <Route path="checkList" component={CheckList}/>
            <Route path="wantList" component={WantList}/>
          </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
  );
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
////////////////////////////////////////////
