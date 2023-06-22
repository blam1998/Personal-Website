import './Demo.css';
import {Component} from 'react';
import {Footer} from './Footer.js';
import User from './user';
import Calculator from './Calculator';
import CollegeMatcher from './CollegeMatcher';
import Game from './Game/Game';
import PriceCalculator from './PriceCalculator';
import Todo from './Todo';
import Quicksort from './Quicksort';


class Demo extends Component{
    constructor(props){
        super(props);

        this.demoNameMap = new Map([
            ["", -1] ,["test", 0], ["college-matcher",1], ["price-calculator",2], ["todo", 3], ["game", 4], ["QS", 5],
        ]);

        this.state = {
            prevValue : -1
        }

        this.HandleSelect = this.HandleSelect.bind(this);
    }

    HandleSelect(){
        const value = document.getElementById("demo-select").value;

        if (this.demoNameMap.get(value.toString()) < 0){ return; }

        if (this.state.prevValue < 0){
            document.getElementsByClassName("demo-list")[this.demoNameMap.get(value.toString())].style.display = "flex";
        }
        else{
            document.getElementsByClassName("demo-list")[this.demoNameMap.get(this.state.prevValue)].style.display = "none";
            document.getElementsByClassName("demo-list")[this.demoNameMap.get(value.toString())].style.display = "flex";
        }

        this.setState({prevValue : value.toString()})
    }

    render(){
        return(
            <div id = "demo-div">
                <div id = "demo-div-inner">
                    <div className = "Navigation-Bar">
                        <User/>
                    </div>
                    <div id = "demo-div-content">
                        <select id = "demo-select" onChange = {() => this.HandleSelect()}>
                            <option value = "">Select Demo you'd like to see.</option>
                            <option value = "test">Test Score Converters</option>
                            <option value = "college-matcher">College Matcher</option>
                            <option value = "price-calculator">Website Price Calculator</option>
                            <option value = "todo">Personal Todo List</option>
                            <option value = "game">Text Based Game</option>
                            <option value = "QS">Quicksort Visualizer</option>
                        </select>
                        <div id = "calculator-demo" className = "demo-list">
                            <Calculator/>
                        </div>
                        <div className = "demo-list">
                            <CollegeMatcher/>
                        </div>
                        <div className = "demo-list">
                            <PriceCalculator/>
                        </div>
                        <div className = "demo-list">
                            <Todo/>
                        </div>
                        <div className = "demo-list">
                            <Game/>
                        </div>
                        <div className = "demo-list">
                            <Quicksort/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}


export default Demo;