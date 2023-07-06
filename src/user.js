import './user.css';
import './PopupModal.css';
import {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {motion} from "framer-motion";
import React from 'react';

class user extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.name = "Kazekito".split("");
        this.container = {
            hidden: {
                opacity: 0
            },

            show: {
                opacity: 1,
                transition: {staggerChildren: 0.1, duration: 2},
                
            },

            
        }

        this.item = {
            hidden: {
                opacity: 0
            },

            show: {
                opacity: 1
            },

        }

        this.active = []
        this.handleDropDown = this.handleDropDown.bind(this);
        this.handleCloseDropDown = this.handleCloseDropDown.bind(this);

    }


    handleDropDown = (event) => {
        var dropDown = event.target.nextSibling;
        dropDown.style.display = dropDown.style.display === 'block'? 'none' : 'block';
    }

    handleCloseDropDown = (event) =>{
        document.getElementsByClassName("dropDownMenu")[0].style.display = "none";
        //event.target.parentNode.parentNode.style.display = "none";
    }


    handleClick(){
        document.getElementById("Popup-Modal+Resume").style.display = "block";
    }

    render(){
        return(
            <div className = "Intro">
                <div className = "User-Intro-Frame">
                    <div className = "UserName one-word-title">
                        <motion.div
                        variants = {this.container}
                        initial = "hidden"
                        animate = "show">
                            {this.name.map((x,i) => {
                                return(<motion.a key = {i} variants = {this.item}>{x}</motion.a>)
                            })}
                        </motion.div>
                    </div>
                        
                    <div className = "User-Nav-Div-Flex">
                        <div id = "about" className = "User-Nav-Div">
                            <NavLink  className = "User-Nav-Icons left-right-underline" to = "/" activestyle = "true" style = {{color: "white"}}>About</NavLink>
                        </div>
                        <div id = "demo" className = "User-Nav-Div">
                            <NavLink  className = "User-Nav-Icons left-right-underline" to = "/Demo" activestyle = "true" style = {{color: "white"}} >Demo</NavLink>
                        </div>
                    </div>
                    <div className = "navBarDropDown">
                        <nav>
                            <a href = "#" className = "dropDownMenuButton" onClick = {this.handleDropDown}>Menu</a>
                            <div className = "dropDownMenu">
                                <li onClick = {this.handleCloseDropDown}><NavLink  className = "User-Nav-Icons" to = "/" activestyle = "true">About</NavLink></li>
                                <li onClick = {this.handleCloseDropDown}><NavLink  className = "User-Nav-Icons" to = "/Demo" activestyle = "true">Demo</NavLink></li>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            )
    }
}

export default user;