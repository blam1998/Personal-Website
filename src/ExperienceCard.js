import './ExperienceCard.css';
import {Component} from 'react';



class ExperienceCard extends Component{
    constructor(props){
        super(props);
        //this.props.Work.Description
    }

    render(){
        return(
            <div className = "Experience-Card-Grid">
                <div className = "Experience-Card-Flex">
                    <div className = "Job-Title header">{this.props.Work.WorkTitle}</div>
                    <div className = "Job-Company normal-text" ><span  className = "title">Company: </span>{this.props.Work.Company}</div>
                    <div className = "Job-Duration normal-text"><span className = "title">Duration: </span>{this.props.Work.From + " - " + this.props.Work.To}</div>

                    <div className = "title">Relevant Projects</div>
                    <div className = "Job-Projects">
                        {this.props.Work.Projects.map((x,i) => {
                            return(
                                <div className = "Description-Child">{x}</div>
                            )
                        })}
                    </div>
                </div>
                <div className = "Description">
                    {this.props.Work.Description.map((x,i) => {
                        return(
                            <li className = "custom-child"><div>✶</div><div className = "normal-text">{x}</div></li>
                        )
                    })}
                </div>
            </div>
        )
    }
}


export default ExperienceCard;