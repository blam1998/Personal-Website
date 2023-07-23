import './AboutMe.css';
import {Component} from 'react';


class AboutMe extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "About-Me-Main-Div">
                <div className = "About-Me-Detail-Grid-Container">
                    <div className = "About-Me-Description">
                        <div className = "Name normal-text"><span className = "title" style = {{textDecoration: "none", fontWeight: "bold"}}>Name: </span>{this.props.About.Name}</div>
                        {/*<div className = "Gender normal-text"><span className = "title" style = {{textDecoration: "none", fontWeight: "bold"}}>Gender: </span>{this.props.About.Gender}</div>*/}
                        <div className = "Location normal-text"><span className = "title" style = {{textDecoration: "none", fontWeight: "bold"}}>Location: </span>{this.props.About.Location}</div>
                        <div className = "Degree normal-text"><span className = "title" style = {{textDecoration: "none", fontWeight: "bold"}}>Degree: </span>{this.props.About.Degree}</div>
                        <div className = "Major normal-text"><span className = "title" style = {{textDecoration: "none", fontWeight: "bold"}}>Major: </span>{this.props.About.Major}</div>
                        <div className = "College normal-text"><span className = "title" style = {{textDecoration: "none", fontWeight: "bold"}}>College: </span>{this.props.About.College}</div>
                        {/*<div className = "Duration"><span style = {{textDecoration: "none", fontWeight: "bold"}}>Duration: </span>{this.props.About.Duration}</div>*/}
                        <div className = "Hobby normal-text"><span className = "title" style = {{textDecoration: "none", fontWeight: "bold"}}>Hobbies:</span>{this.props.About.Hobby}</div>
                    </div>
                    <div className = "About-Me-Text normal-text">{this.props.AboutText}</div>
                </div>
                <div className = "normal-text" style = {{margin: "2rem auto", textAlign: "center"}}><span className = "title" style = {{textDecoration: "none", fontWeight: "bold"}}>Languages/Frameworks </span></div>
                <div className = "Skill-Outer">
                    {this.props.Skill.map((x,i) => {
                        return(
                            <span className = "Skill-Element normal-text">{x + (i === (this.props.Skill.length - 1)? "." : ",")}</span>
                        )
                    })}
                </div>
            </div>
        )
    }
}


export default AboutMe;