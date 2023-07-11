import './ExperienceCard.css';
import {Component} from 'react';



class ExperienceCard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "Experience-Card-Grid">
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
                    <div style = {{margin: "0 auto", fontWeight: "bold", fontSize: "2rem"}}>Relevant Projects</div>
                    <div className = "Job-Projects">
                        {this.props.Work.Projects.map((x,i) => {
                            return(
                                <div className = "Description-Child">{x}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}


export default ExperienceCard;