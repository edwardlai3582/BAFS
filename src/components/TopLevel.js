import React from 'react'
import { Link } from 'react-router'
import '../styles/TopLevel.css'
import NavLink from './NavLink'

const TopLevel = ({children}) => (
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
                    <li><NavLink to="/checkList" displayName="CHECKLIST" /></li>
                    <li><NavLink to="/wantList"  displayName="WANTLIST"  /></li>
                </ul>
            </nav>
        </header>
        <main>

        {children}

        </main>
    </div>
)

export default TopLevel
