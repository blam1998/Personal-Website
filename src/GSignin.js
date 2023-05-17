import './GSignin.css';
import React, {Component} from 'react';
import jwt_decode from "jwt-decode";



class GSignin extends Component{

    constructor(props){
        super(props);

        this.state = {
            user : null,
        }
    }

    componentDidMount(){

        /* eslint-disable */

        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_SIGN_IN_API,
            callback: this.props.onSuccess
        });

        google.accounts.id.renderButton(
            document.getElementById("signin-btn"),{
                theme: "outline", size: "large"
            }
        );
        
        /* eslint-enable */
    }

    render(){
        return(
            <div id = "signin-btn"></div>
        )
    }
}

export default GSignin;