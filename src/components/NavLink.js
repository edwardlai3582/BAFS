import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import '../styles/NavLink.css'

const NavLink = ({to, displayName}) => (
  <Link to={to} activeClassName="linkActive" className="linkClass" >
    {displayName}
  </Link>    
)

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired   
}

export default NavLink    