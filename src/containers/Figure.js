import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addOwned, removeOwned, addWanted, removeWanted } from '../actions'

import '../styles/Figure.css'

let Figure = ({ figureData,figureBrand, owned, wanted, addOwned, removeOwned, addWanted, removeWanted}) => {
    
    return (
        <div className="figureWrapper">
        
            <div className="figureLeft">
            <div className="roundedOne">
                <input type="checkbox" id={figureData.id} value="None" checked={(figureData.id in owned)} onChange={() => {
                    if(figureData.id in owned){
                        removeOwned(figureData.id);
                    }
                    else{
                        figureData.Brand=figureBrand;
                        addOwned(figureData);   
                    }
                }} />
                <label htmlFor={figureData.id}></label>
            </div>     

            <div className="figureName" >
                {figureData.name}
            </div>
            </div>
            <button className={(figureData.id in wanted)?'figureButton remove':'figureButton add'} onClick={() => {
                if(figureData.id in wanted){
                    removeWanted(figureData.id);
                }
                else{
                    figureData.Brand=figureBrand;
                    addWanted(figureData);    
                }
            }} >
                {(figureData.id in wanted)?'-':'+'}
            </button>
        </div>
    )
}

Figure.propTypes = {
  figureData: PropTypes.object,
  figureBrand: PropTypes.string,
}

const mapStateToProps = (state) => ({
  owned: state.owned,
  wanted: state.wanted    
})

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    addOwned: addOwned, 
    removeOwned: removeOwned,
    removeWanted: removeWanted,
    addWanted: addWanted
  }, dispatch)
)

export default connect( mapStateToProps, mapDispatchToProps)(Figure)
