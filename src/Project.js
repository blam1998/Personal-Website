import "./Project.css"
import HorizontalSlider from './HorizontalSlider';
import {InprogressStorage, CompletedStorage} from './ItemFactory';
import {Footer} from './Footer.js';
import User from './user';
import { Inprogress } from "./Inprogress";

const projectStorage = [];

function Project(){
    return(
        <div>
            <div className = "project-name">
                Projects
            </div>
            <div className = "project-legend">
                <div>
                    <span className = "inprogress-circle">
                    </span>
                </div>
                <span>
                    Inprogress
                </span>
                <div>
                    <span className = "completed-circle">
                    </span>
                </div>
                <span>
                    Completed
                </span>
            </div>
            <div className = "Project-Page">
                <div className = "project-storage">
                    {
                        InprogressStorage.map((x,i) => {
                            return(
                                <div className = "project-item inprogress">
                                    {x}
                                </div>
                                )
                        })
                    }

                    {
                        CompletedStorage.map((x,i) => {
                            return(
                                <div className = "project-item completed">
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