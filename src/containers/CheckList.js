import React from 'react'
import { connect } from 'react-redux'
import '../styles/CheckList.css'
import MLData from '../ML.json'
import Series from '../components/Series'

class CheckList extends React.Component {
    constructor() {
        super();
        this.state = {
            toybiz: true
        };
        this.ClickToToybiz = this.ClickToToybiz.bind(this);
        this.ClickToHasbro = this.ClickToHasbro.bind(this);
    }
    
    ClickToToybiz() {
        this.setState({toybiz: true});
    }
    
    ClickToHasbro() {
        this.setState({toybiz: false});
    }
    
    qq(toybiz){this.setState({toybiz: toybiz});}
    
    render(){
        let toybizNum = 0;
        let hasbroNum = 0;
        for (let key in MLData.Toybiz) {
            if (MLData.Toybiz.hasOwnProperty(key)) {
                toybizNum +=  MLData.Toybiz[key].reduce( 
                    (previousValue, currentValue, currentIndex, array) => currentValue.figures.length + previousValue
                    , 0)   
            }
        }
        for (let key in MLData.Hasbro) {
            if (MLData.Hasbro.hasOwnProperty(key)) {
                hasbroNum +=  MLData.Hasbro[key].reduce( 
                    (previousValue, currentValue, currentIndex, array) => currentValue.figures.length + previousValue
                    , 0)   
            }
        }
        let showNum = this.state.toybiz? toybizNum : hasbroNum;
        
        let ownedToybizNum=0;
        let ownedHasbroNum=0;
        for (let key in this.props.owned) {
            if (this.props.owned.hasOwnProperty(key)) {
                if(this.props.owned[key].Brand === "Toybiz"){
                    ownedToybizNum++;    
                }
                else{
                    ownedHasbroNum++;    
                }   
            }
        }
        let showOwnedNum = this.state.toybiz? ownedToybizNum : ownedHasbroNum;
        
        let toybizButtonClass = this.state.toybiz? "" : "notCurrent";
        let hasbroButtonClass = this.state.toybiz? "notCurrent" : "";
        let whichSeries = [];
        
        if(this.state.toybiz){
            for (let key in MLData.Toybiz){
                if (MLData.Toybiz.hasOwnProperty(key)) {
                    whichSeries.push(<h2 key={"Toybiz"+key} className="typeWrapper">{key}</h2>, ...MLData.Toybiz[key].map(series =>
                        <Series key={series.seriesname} owned={this.props.owned} seriesData={series} seriesBrand={"Toybiz"} />
                    ));        
                }   
            }
        }
        else{
            for (let key in MLData.Hasbro) {
                if (MLData.Hasbro.hasOwnProperty(key)) {
                    whichSeries.push(<h2 key={"Hasbro"+key} className="typeWrapper">{key}</h2>, ...MLData.Hasbro[key].map(series =>
                        <Series key={series.seriesname} owned={this.props.owned} seriesData={series} seriesBrand={"Hasbro"} />
                    ));        
                }   
            }            
        }
        
        return (
            <div className="checkListWrapper">
                <div className="tOrHWrapper">
                    <button className={toybizButtonClass} onClick={
                        this.ClickToToybiz
                    }>
                        Toybiz
                    </button>
                    <button className={hasbroButtonClass} onClick={
                        this.ClickToHasbro    
                    }>
                        Hasbro
                    </button>
                </div>
                <section className="topLevelChildrenWrapper">
                    <div className="showNum"> { showOwnedNum+" / "+showNum } </div>
                    { whichSeries }      
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  owned: state.owned  
})

export default connect( mapStateToProps, null)(CheckList)
