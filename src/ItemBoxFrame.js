import "./ItemBoxFrame.css"
import {Component} from "react";
import React from 'react';
import PopupModal from './PopupModal';
import {ItemBox} from './ItemBox';
import {motion} from 'framer-motion';

/*
What is in an ItemBox?
Project Name:
Date:
Summary:
Short Description:
*/


class ItemBoxFrame extends Component{
    constructor(props){
        /*
        props = {
            ItemBox
            Id
            Title
            Image
        }
        */
        super(props);
        this.state = {
            isClicked : false
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.handleImage = this.handleImage.bind(this);

    }

    clickHandler(){
        let suffix = this.props.Id;
        document.getElementById("Popup-Modal+" + suffix).style.display = "block";
        document.getElementById("Popup-Modal+" + suffix).className += ' my-animation';
    }

    handleImage(id, demo){
        if (!demo){
            return;
        }


        /*
        const target = document.getElementById("Image+"+id);
        const div = document.createElement("div");
        const content = document.createTextNode("Demo");
        div.setAttribute("class", "image-demo");
        div.appendChild(content);
        target.after(div);
        */
    }

    render(){
        return(
            <div className = "ItemBoxFrame">
                <div className = "ItemBox-Open-Frame" onClick = {this.clickHandler}>
                    <img className = "ItemBoxFrame-Image" src = {this.props.Image} title = {this.props.Title} id = {"Image+"+ this.props.Id} onLoad = {() => this.handleImage(this.props.Id, this.props.Demo)}></img>
                    <div id = {"ItemBox+"+this.props.Id} className = "ItemBoxFrame-Title">
                        {this.props.Title}
                    </div>
                </div>
                <PopupModal Data ={this.props.ItemBox} Id = {this.props.Id}/>
                

            </div>
        )
    }
}





export {ItemBoxFrame as ItemBoxFrame}