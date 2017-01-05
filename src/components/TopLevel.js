import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import '../styles/TopLevel.css'
import NavLink from './NavLink'

import { tokenExists } from '../actions'

class TopLevel extends React.Component {
  constructor() {
    super();
    this.state = {
      qq: false
    };
    //this.login = this.login.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem('jwtToken');
    if (!token || token === '') {
      this.props.tokenExists(false);
    } else {
      this.props.tokenExists(true);
    }
  }

  render(){
    return (
      <div className="topLevelWrapper" >
          <header>
              <h1>
                  <Link className="linkHomeClass" to="/">
                      <div className="headerAbbr">
                          BAFS
                      </div>
                      <div className="headerNotAbbr">
                          MARVEL LEGENDS BAFS
                      </div>
                  </Link>
              </h1>
              <nav>
                  <ul>
                      <li>{this.props.auth.exists?"logout":"login"}</li>
                      <li><NavLink to="/checkList" displayName="CHECKLIST" /></li>
                      <li><NavLink to="/wantList"  displayName="WANTLIST"  /></li>
                  </ul>
              </nav>
          </header>
          <main>

          {this.props.children}

          </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    tokenExists: tokenExists
  }, dispatch)
)

export default connect( mapStateToProps, mapDispatchToProps)(TopLevel)
