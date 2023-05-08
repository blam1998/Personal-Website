import "./PopupModal.css"
import {Component, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';


class PopupModal extends Component{
    constructor(props){
        /*
        props = {
            Id
            Data
        }
        */

        super(props);
        this.state = {
            isOpen : false,
            delay: Infinity,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        let suffix = this.props.Id;
        var vidSuffix = this.props.Id + ".0";
        /*Only two close events, anything else gets ignored*/
        if (e.target.className == "Popup-Modal my-animation" || e.target.className == "Popup-Modal-Close"){
            document.getElementById("Popup-Modal+" + suffix).className = "Popup-Modal";
        }
        else{
            return;
        }

        this.setState(prevState=>({
            isOpen : !prevState.isOpen,
        }));

        

        if (this.isOpen){
            document.getElementById("Popup-Modal+" + suffix).style.display = "block";
            
        }
        else{
            /*
            while (document.getElementById("Video+" + vidSuffix) != null){
                document.getElementById("Video+" + vidSuffix).pause();
                vidSuffix = parseFloat(vidSuffix) + 0.1;
                vidSuffix = vidSuffix.toString();
            }
            */

            var stopAllYouTubeVideos = () => { 
                var iframes = document.querySelectorAll('iframe');
                Array.prototype.forEach.call(iframes, iframe => { 
                  iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', 
                func: 'stopVideo' }), '*');
               });
              }
              stopAllYouTubeVideos();
            
            document.getElementById("Popup-Modal+" + suffix).style.display = "none";
            
        }
    }

    render(){
        return(
            
            <div className = "Popup-Modal" id = {"Popup-Modal+" + this.props.Id} onClick = {(target) => this.handleClick(target)}>
                
                <div className = "Popup-Modal-Inner">
                    <div className = "Popup-Modal-Content">
                        <span className = "Popup-Modal-Close" href = "#" onClick = {(target) => this.handleClick(target)}>X</span>
                        {this.props.Data}
                    </div>
                </div>
                    
            </div>
            
        )
    }
}

export default PopupModal;