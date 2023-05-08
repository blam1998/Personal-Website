import './Task.css';
import {Component} from 'react';



class Task extends Component{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event) => {
        const target = document.getElementById(event.target.id).parentNode;
        target.nextSibling.style.display === 'block'? 
        target.nextSibling.style.display = "none" : target.nextSibling.style.display = "block";
    }

    render(){
        return(
            <div id = "task-outer-div">
                {
                    this.props.data.map((target) => {
                        return(
                            <div id = {"parent-task" + target.id} key = {target.id} className = "parent-task">
                                <div className = "task-name-div">
                                    <div id = {target.id} key = {target.id} className = "task-name" onClick = {(event) => {this.handleClick(event)}}>{target.name}</div>
                                    <div id = "task-buttons">
                                        <button id = "task-edit-button" onClick = {this.props.editFunc}>Edit</button>
                                        <button id = "task-name-button" onClick = {this.props.func}>X</button>
                                    </div>
                                </div>
                                <div className = "task-desc">{target.desc}</div>
                            </div>
                        )   
                        
                    })
                }
            </div>
        )
    }
}


export default Task;