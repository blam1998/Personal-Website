import './Footer.css'
import {Component} from 'react';


class Footer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "Homepage-Footer">
                <div className = "Footer-Column1">
                    <h2> Contact Me</h2>
                    <div className = "Footer-Column-Elements">
                        <i className = "fa fa-envelope"></i>
                        <span> baolamleh@gmail.com</span>
                    </div>
                </div>
                <div className = "Footer-Column2">
                    <h2> Miscellaneous</h2>
                    <div className = "Footer-Column-Elements">
                        <i className = "fa fa-map-marker"></i>
                        <span> Los Angeles, California</span>
                    </div>
                    <div className = "Footer-Column-Elements">
                        <a  href = "https://github.com/blam1998" className = "fa fa-github" title = "Github" target = "_blank"> Github</a>
                    </div>
                    
                    <div className = "Footer-Column-Elements">
                        <a  href = "https://www.linkedin.com/in/bao-lam-le-431175225/details/projects/" className = "fa fa-linkedin-square" title = "Linkedin" target = "_blank"> Linkedin</a>
                    </div>
                </div>
            </div>
        )
    }
}

export {Footer as Footer}