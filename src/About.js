import './About.css';
import './firefly.css';
import {Footer} from "./Footer.js";
import {AboutText, LanguagesText, OtherSkillsText, AboutMeText} from './AboutText.js';
import {Work} from './Inprogress.js';
import User from './user';
import Project from './Project';
import Fuse from 'fuse.js';
import ExperienceCard from './ExperienceCard';
import AboutMe from './AboutMe';
import 'react-bootstrap-typeahead/css/Typeahead.css';


var tempArray = new Array();
for (let i = 0; i < 25; i++){
    tempArray.push(new Object());
}


var skillList = [];

const searchList = [];

for (var i = 0; i < LanguagesText.length; i++){
    searchList.push({content:LanguagesText[i]});
    skillList.push(LanguagesText[i]);
}

OtherSkillsText.map((x,i) => {
    searchList.push({content:x});
    skillList.push(x);
})


function About(){
    

    return(
        <div className = "Homepage">
            <div className = "background-fixed"></div>
            <div className = "Navigation-Bar">
                <User/>
            </div>
            <div className = "Homepage-Body" id = "homepage-body-color2">
                <div className = "About-Me">
                    <div className = "firefly-container">
                        {
                            tempArray.map((x,i) => {
                                return(<div className = "firefly" key = {"firefly-" + i}></div>)
                            })
                        }
                    </div>
                    <div className = "About-Me-Socials">
                        <div className = "Picture-Container">
                            <img className = "Picture" src = "./favicon.ico"></img>
                        </div>
                        <div className = "Name title">Bao Lam Le</div>
                        <div className = "normal-text" style = {{margin: "0 auto", textAlign: "center"}}>Bachelor of Science, Computer Science</div>
                        <div className = "normal-text" style = {{margin: "0 auto", textAlign: "center"}}>University of California, <span style = {{color: "blue"}}>Riverside</span></div>
                    </div>
                    <div className = "about-me-title">
                        <div><span id = "Front-end">Front-end</span> Software Developer</div>
                        <div>Aspiring to become <span style = {{color: "orange"}}>Full Stack Software Developer</span></div>
                    </div>
                </div>

                <div className = "About-Me-Detail">
                    <div className = "Flex-Title">
                        <h1 className = "one-word-title" style = {{color: "black"}}>A B O U T </h1>
                        <h1 className = "one-word-title">M E</h1>
                    </div>
                    <div style = {{height: "50px"}}> </div>
                    <AboutMe About = {AboutMeText} AboutText = {AboutText} Skill = {skillList}/>
                </div>

                <div style = {{height: "100px"}}> </div>
                <div className = "Work-Experience">
                    <div className = "Flex-Title">
                        <h1 className = "one-word-title">W O R K </h1>
                        <h1 className = "one-word-title">H I S T O R Y</h1>
                    </div>
                    <ExperienceCard Work = {Work}/>
                </div>


                <div className = "Projects">
                    <Project/>
                </div>

                
            </div>
            <Footer/>
        </div>
            


    )
}


export default About;