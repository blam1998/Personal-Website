import "./Project.css"
import HorizontalSlider from './HorizontalSlider';
import {InprogressStorage, CompletedStorage} from './ItemFactory';
import {Footer} from './Footer.js';
import User from './user';
import { Inprogress } from "./Inprogress";

const projectStorage = [];

function buttonClick(event){
    const target = document.getElementById("inprogress-projects");
    const target2 = document.getElementById("complete-projects");

    if (event.target.innerHTML === "Completed" && target2.style.display === "flex"){return;}
    else if (event.target.innerHTML === "Inprogress" && target.style.display === "flex"){return;}

    target.style.display = target.style.display == "flex"? "none" : "flex";
    target2.style.display = target2.style.display == "flex"? "none" : "flex";

    if (event.target.innerHTML === "Inprogress"){
        event.target.classList.add("project-active");
        event.target.nextSibling.classList.remove("project-active");
    }
    else{
        event.target.previousSibling.classList.remove("project-active");
        event.target.classList.add("project-active");
    }

}

function Project(){
    return(
        <div style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h1 className = "one-word-title">
                P R O J E C T S
            </h1>
            <div className = "button-div">
                <button onClick = {(e) => buttonClick(e)} className = "project-button">Inprogress</button>
                <button onClick = {(e) => buttonClick(e)} className = "project-button project-active">Completed</button>
            </div>
            <div className = "Project-Page">
                <div className = "project-storage inprogress" id = "inprogress-projects">
                    {
                        InprogressStorage.map((x,i) => {
                            return(
                                <div className = "project-item inprogress">
                                    {x}
                                </div>
                                )
                        })
                    }
                </div>

                <div className = "project-storage complete" id = "complete-projects" style = {{display: "flex"}}>
                    {
                        CompletedStorage.map((x,i) => {
                            return(
                                <div className = "project-item completed" style = {{animationDuration: ((i + 1) * 0.125).toString() + 's'}}>
                                    {x}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default Project;