import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeWanted } from '../actions'

import '../styles/WantList.css'

let WantList = ({wanted, removeWanted}) => {
    let wantArray=[];
    for (var key in wanted) {
        if (wanted.hasOwnProperty(key)) {
            wantArray.push(wanted[key]);
        }
    }
    wantArray.sort(function(a, b){        
        if(a.id < b.id){
            return -1;
        }else if(a.id > b.id){
            return 1;
        }
        return 0;
    });

    return (
        <section className="topLevelChildrenWrapper">
        <div className="wantlistWrapper">
            <h2>
                WANT LIST
            </h2>
            <ul>
                {wantArray.map(figure =>
                    <li key={figure.id} className="figureLi">
                        {figure.series}: {figure.name}
                        <button onClick={() => {removeWanted(figure.id)}} >
                            {'Remove'}
                        </button>
                    </li>
                )}       
            </ul>
        </div>
        </section>    
    )
}

const mapStateToProps = (state) => ({
  wanted: state.wanted    
})

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    removeWanted: removeWanted
  }, dispatch)
)
export default connect( mapStateToProps, mapDispatchToProps)(WantList)
