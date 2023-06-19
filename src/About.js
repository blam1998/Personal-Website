import './About.css';
import {Footer} from "./Footer.js";
import {AboutText, LanguagesText, OtherSkillsText} from './AboutText.js';
import User from './user';
import Project from './Project';
import Fuse from 'fuse.js';
import 'react-bootstrap-typeahead/css/Typeahead.css';

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

const options = {
    includeScore: true,
    keys: ['content']
};

const fuse = new Fuse(searchList, options);

function searchCard(content){
    const result = fuse.search(content);
    const highLight = [];

    for (var i = 0; i < result.length; i++){
        if (result[i].score < 0.3){
            highLight.push(result[i].item.content);
        }
    }

    const target = document.getElementsByClassName("skill-cards")[0];

    highLight.map((x,i) => {
        document.getElementById(x).classList.add('card-highlight');
        target.insertBefore(document.getElementById(x), target.firstChild);
    })

    const filtered = skillList.filter(item => !highLight.includes(item));
    filtered.map((x) => {
        if (document.getElementById(x).classList.contains('card-highlight')){
            document.getElementById(x).classList.remove('card-highlight');
        }
    });

}

function About(){
    

    return(
        <div className = "Homepage">
            <div className = "Navigation-Bar">
                <User/>
            </div>
            <div className = "Homepage-Body" id = "homepage-body-color2">
                <div className = "About-Me">
                    <div className = "About-me-bg"></div>
                    <div className = "About-Me-Socials">
                        <div className = "Picture-Container">
                            <img className = "Picture" src = "./favicon.ico"></img>
                        </div>
                        <div className = "Name">Bao Lam Le</div>
                        <div style = {{fontSize: "1.25rem"}}>Bachelor of Science, Computer Science</div>
                        <div style = {{fontSize: "1.25rem"}}>University of California, <span style = {{color: "blue"}}>Riverside</span></div>
                    </div>
                    <div className = "about-me-title">
                        <div><span style = {{color: "lightblue"}}>Front-end</span> Software Developer</div>
                        <div style={{paddingLeft: "2rem"}}>Aspiring to become <span style = {{color: "orange"}}>Full Stack Software Developer</span></div>
                    </div>
                </div>
                <div style = {{height: "200px", width: "100%"}}>
                </div>

                <div className = "Skills">
                    <div className = "skills-background"></div>
                    <h1 className = "Title" style = {{color: "White", fontWeight: "Bold", fontSize: "3rem"}}>What I Know</h1>
                    <input placeholder = "Search" className = "skill-search" onChange = {(event) => {searchCard(event.target.value)}}></input>
                    <div className = "skill-cards">
                        {
                            skillList.map((x,i) => {
                                return(
                                    <div className = "cards translate-cards" id = {x} index = {i}>{x}</div>
                                )
                            })
                        }
                    </div>
                </div>


                <div className = "Projects">
                    <Project/>
                    <div className = "pre-footer" style = {{height: "100%", width: "100%"}}></div>
                </div>

                
            </div>
            <Footer/>
        </div>
            


    )
}


export default About;