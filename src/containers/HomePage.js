/*global FB*/

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import { browserHistory } from 'react-router'
import { loginWithToken } from '../actions'

import '../styles/HomePage.css'

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    FB.getLoginStatus((response)=> {
      if (response.status === 'connected') {
        this.setState({login: true});
        //browserHistory.push('wantList');
      }
    });
  }

  login() {
    FB.login((response)=> {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
        });
        console.log(response);
        this.props.loginWithToken(response.authResponse.accessToken);
        this.setState({login: true});
          //browserHistory.push('wantList');
        }
      else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'public_profile,email'});
  }

  logout(){
    FB.logout((response)=> {
      // Person is now logged out
      console.log("bye");
    });
    this.setState({login: false});
  }

  render(){
    return (
      <section className="homeWrapper">
        {this.props.auth.exists?
          <div>

            {this.props.auth.user?
              <div>
                {this.props.auth.user.fbname}
                <img src={this.props.auth.user.fbpicture} alt={this.props.auth.user.fbname} />
              </div>
              : "sss"}
          </div>
          :
          this.state.login?<button onClick={this.logout}>logout</button>:<a href="#" onClick={this.login}>Login</a>
        }
        </section>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    loginWithToken: loginWithToken
  }, dispatch)
)

export default connect( mapStateToProps, mapDispatchToProps)(HomePage)
