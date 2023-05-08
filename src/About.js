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
                    <div className = "About-Me-Socials">
                        <div className = "Picture-Container">
                            <img className = "Picture" src = "./favicon.ico"></img>
                        </div>
                        <div className = "Name">Bao Lam</div>
                        <div className = "Socials">
                            <a  href = "https://github.com/blam1998" className = "fa fa-github" title = "Github" target = "_blank"></a>
                            <a  href = "https://www.linkedin.com/in/bao-lam-le-431175225/details/projects/" className = "fa fa-linkedin-square" title = "Linkedin" target = "_blank"></a>
                        </div>
                    </div>
                    <div className = "About-Me-Text">
                        {AboutText}
                    </div>
                </div>

                <div className = "Skills">
                    <h1 className = "Title"><span className = "first-letter">S</span>killsets</h1>
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
                </div>
                
            </div>
            <Footer/>
        </div>
            


    )
}


export default About;