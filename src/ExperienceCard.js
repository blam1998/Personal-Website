import './ExperienceCard.css';
import {Component} from 'react';



class ExperienceCard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "Experience-Card-Grid">
                <img  className = "Experience-Card-Picture" src = {this.props.Work.Image}></img>
                <div className = "Experience-Card-Flex">
                    <div className = "Job-Title">{this.props.Work.WorkTitle}</div>
                    <div className = "Job-Company"><span style = {{color: "black"}}>Company: </span>{this.props.Work.Company}</div>
                    <div className = "Job-Duration"><span style = {{color: "black"}}>Duration: </span>{this.props.Work.From + " - " + this.props.Work.To}</div>
                    <div className = "Description">
                        {this.props.Work.Description.map((x,i) => {
                            return (
                                <div className = "Description-Child">
                                    {x}
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}


export default ExperienceCard;