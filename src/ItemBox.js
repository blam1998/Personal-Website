import './ItemBox.css'
import {Component} from 'react';
import ReactPlayer from 'react-player';

function GetShortDescription(props){
    return(
        <div className = "ItemBox-ShortDescription">
            {props.ShortDescription.map((element, index) => {
                return(
                    <li key = {"Child" + index} className = "ItemBox-List">
                        {element}
                    </li>
                )
            })}
        </div>
    )
}

function GetSkillsFlair(props){
    return(
        <div className = "ItemBox-Languages">
            {props.Languages.map(((element,index) => {
                return(
                    <div key = {index} className = "ItemBox-Languages-Elements">{element}</div>
                )}
            ))}
        </div>
    )
}

function GetGithub(props){
    if (props.Github === "#"){
        return
    }
    else{
        return (
            <a className = "fa fa-github" target = "_blank" href = {props.Github} title = "Github"></a>
        )
    }
}

/*
function GetVideo(props){
    if (props.VideoSrc !== "#"){
        return(
            props.VideoSrc.map((x,i) => {
                return(<div className = "ItemBox-Youtube-Div">
                    <h2 className = "ItemBox-Video-Title"> {x[0]} </h2>
                    <video id = {"Video+" + props.Id + "." + i} className = "ItemBox-Video" controls>
                        <source src = {x[1]} type = "video/mp4"></source>
                    </video>
                </div>)
            })
        )

    }
    else{
        return
    }
}
*/

function GetVideo(props){
    if (props.VideoSrc !== "#"){
        return(
            props.VideoSrc.map((x,i) => {
                return(<div className = "ItemBox-Youtube-Div">
                    <h2 className = "ItemBox-Video-Title"> {x[0]} </h2>
                    <ReactPlayer 
                    className = "react-player"
                    width = "100%" 
                    height = "auto"
                    url = {x[1]}
                    playing = {false}
                    loop = {false}
                    muted = {false}
                    controls = {true}
                    id = {"Video+" + props.Id + "." + i}/>
                </div>)
            })
        )

    }
    else{
        return
    }
}

/*
==========Deprecated=========
function GetPDF(props){
    if (props.Readme !== "#"){
        return (
            <div className = "Readme-Div">
                <iframe className = "Readme-Iframe" src = {props.Readme} allowFullScreen></iframe>
            </div>
        )
    }
    else{
        return;
    }
}
*/

class ItemBox extends Component{
    constructor(props){
        /*
        Props: {
            ProjectName
            Date
            Summary
            ShortDescription
            Id
            Github
            VideoSrc
            VideoTitle
            Languages
            Readme
        }
        */
        super(props);
    }


    render(){
        return(
            <div className = "ItemBox-Outer-Frame">
                <div className = "ItemBox-Inner-Frame">
                    <div className = "ItemBox-Project-Name title">
                        {this.props.ProjectName}
                        <GetGithub Github = {this.props.Github}/>
                    </div>
                    <GetSkillsFlair Languages = {this.props.Languages} />
                    <div className = "ItemBox-Date">
                        <b className = "title">Date: </b> <span className = "normal-text">{this.props.Date}</span>
                    </div>
                    <div className = "ItemBox-Summary">
                        <b className = "title">Summary: </b><span className = "normal-text">{this.props.Summary}</span>
                    </div>
                    
                    <GetShortDescription ShortDescription = {this.props.ShortDescription}/>
                    
                    <GetVideo Id = {this.props.Id} VideoSrc = {this.props.VideoSrc} />
                </div>
            </div>
        )
    }
}

export{ItemBox as ItemBox};