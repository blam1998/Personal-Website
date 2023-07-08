import './AboutMe.css';
import {Component} from 'react';


class AboutMe extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "About-Me-Detail-Grid-Container">
                <div className = "About-Me-Detail-Picture-Container">
                    <img className = "About-Me-Detail-Picture" src = "GrizzCub.jpg"></img>
                </div>
                <div className = "About-Me-Description">
                    <div className = "Name"><span style = {{textDecoration: "none", fontWeight: "bold"}}>Name: </span>{this.props.About.Name}</div>
                    <div className = "Gender"><span style = {{textDecoration: "none", fontWeight: "bold"}}>Gender: </span>{this.props.About.Gender}</div>
                    <div className = "Location"><span style = {{textDecoration: "none", fontWeight: "bold"}}>Location: </span>{this.props.About.Location}</div>
                    <div className = "Degree"><span style = {{textDecoration: "none", fontWeight: "bold"}}>Degree: </span>{this.props.About.Degree}</div>
                    <div className = "Major"><span style = {{textDecoration: "none", fontWeight: "bold"}}>Major: </span>{this.props.About.Major}</div>
                    <div className = "College"><span style = {{textDecoration: "none", fontWeight: "bold"}}>College: </span>{this.props.About.College}</div>
                    <div className = "Duration"><span style = {{textDecoration: "none", fontWeight: "bold"}}>Duration: </span>{this.props.About.Duration}</div>
                    <div className = "Hobby"></div>
                    <div className = "Skill"><span style = {{textDecoration: "none", fontWeight: "bold"}}>Languages/Frameworks: </span>{
                    this.props.Skill.map((x,i) => {
                        
                        return(
                            <span className = "Skill-Element">{x + (i === (this.props.Skill.length - 1)? "." : ",")}</span>
                        )
                    })}</div>
                </div>
                <div className = "About-Me-Text">{this.props.AboutText}</div>
            </div>
        )
    }
}


export default AboutMe;