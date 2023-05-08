import './Todo.css';
import {Component} from 'react';
import GSignin from './GSignin';
import jwt_decode from 'jwt-decode';
import Task from './Task';
import { createRoot } from 'react-dom/client';
import validator from 'validator';
import AWS from 'aws-sdk';

const postApi = process.env.REACT_APP_TODO_POST;
const putApi = process.env.REACT_APP_TODO_PUT;
const getApi = process.env.REACT_APP_TODO_GET;


class Todo extends Component{
    constructor(props){
        super(props);

        this.state = {
            user : null,
            currTask : {
                "id": "",
                "name": "",
                "desc": ""
            }
        }

        this.root = null;

        this.httpRequestHandler = this.httpRequestHandler.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleSignInSuccess = this.handleSignInSuccess.bind(this);
        this.getTask = this.getTask.bind(this);
        this.populateTask = this.populateTask.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.submitEditTask = this.submitEditTask.bind(this);
    }

    componentDidMount(){
        const target = document.getElementById("tasks-div");

        this.root = createRoot(target);
    }

    componentWillUnmount(){
        this.root.unmount();
    }

    httpRequestHandler = (method, data) => {
        //Method --> POST,PUT,GET,...
        //data --> Json object
        const httpReq = new XMLHttpRequest();
        const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/)[1];
        var endPoint = "";

        switch(method){
            case "POST":
                endPoint = postApi;
                break;
            case "PUT":
                endPoint = putApi;
                break;
            case "GET":
                endPoint = getApi + '?id=' + validator.escape(data.id);
                break;
            default:
                break;
        }

        
        var result = null;
        
        async function updateData(endPoint, method, data){
            result = await fetch(endPoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => 
                {
                    if (!response.ok){
                        throw new Error(response.status);
                    }
                    else{
                        return response.json()
                    }
                })
            .catch((error) => {
                console.log(error);
            })

            return result
        }

        async function getData(endPoint, method){
            result = await fetch(endPoint, {
                method: method,
            })
            .then(response => 
                {
                    if (!response.ok){
                        throw new Error(response.status);
                    }
                    else {
                        return response.json()
                    }
                })
            .catch((error) => {
                console.log(error);
            })


            return result
        }
        
        if (method !== "GET"){
            result = updateData(endPoint, method, data);
        }
        else{
            result = getData(endPoint, method);
        }
        
        return result;
    }

    handleSignOut = (event) => {
        this.setState({
            user: null,
        })

        /* eslint-disable */
        google.accounts.id.disableAutoSelect();
        /* eslint-enable */

        document.getElementById("gSignIn").style.display = "block";
        document.getElementById("gSignOut").style.display = "none";
    }

    handleSignInSuccess = (response) => {
        //sub is id.
        var userObject = jwt_decode(response.credential);
        this.setState({
            user: {
                "id" : userObject.sub,
                "picture" : userObject.picture,
                "email" : userObject.email
            }
        }, () => {this.getTask()})

        console.log(userObject);
        
        document.getElementById("g-image").setAttribute("src", userObject.picture);
        document.getElementById("g-image-in").setAttribute("src", userObject.picture);
        document.getElementById("g-name").innerHTML = userObject.email;
        document.getElementById("g-full-name").innerHTML = userObject.given_name + " " + userObject.family_name;

        if (Object.keys(userObject).length != 0){
            document.getElementById("gSignIn").style.display = "none";
            document.getElementById("gSignOut").style.display = "block";
        }

    }

    getTask(){
        const jsonObj = {
            "id": this.state.user.id
        }

        //On success it works, what if response fails?
        const response = this.httpRequestHandler("GET", jsonObj)
        .then(data => {
            if (data){
                this.populateTask(data)
            }
            else{
                this.registerUser();
            }
        })
    }

    populateTask = (data) => {
        if (!data.tasks){
            return;
        }
        
        this.root.render(<Task data = {data.tasks} func = {this.handleDeleteTask} editFunc = {this.handleEditTask}/>)

        return
    }

    registerUser = (data) => {
        const jsonObj = {
            "id": this.state.user.id
        }

        this.httpRequestHandler("POST", jsonObj)
        .then(() => {
            this.populateTask(null)
        })
    }

    handleAddTask = () => {

        if (!this.state.currTask.name){
            return;
        }

        const jsonObj = {
            "id": this.state.user.id,
            "tasks": [{
                "name": validator.escape(this.state.currTask.name),
                "desc": validator.escape(this.state.currTask.desc)
            }],
            "method": "Add"
        }

        this.httpRequestHandler("PUT", jsonObj)
        .then((data) => {
            this.populateTask(data)
            document.getElementById("task-add").style.display = "none";
            document.getElementById("add-task-name").value = "";
            document.getElementById("add-task-desc").value = "";
        })
    }

    

    handleDeleteTask = (event) => {
        const taskName = validator.escape(event.target.parentNode.previousSibling.innerHTML);
        const desc = validator.escape(event.target.parentNode.parentNode.nextSibling.innerHTML);

        const jsonObj = {
            "id": this.state.user.id,
            "tasks" :[{
                "id": validator.escape(event.target.parentNode.previousSibling.id),
                "name" : taskName,
                "desc" : desc
            }],
            "method": "Delete"
        }

        this.httpRequestHandler("PUT", jsonObj)
        .then((data) => {
            this.populateTask(data)
        })
    }

    handleEditTask = (event) => {
        const taskName = event.target.parentNode.previousSibling.innerHTML;
        const desc = event.target.parentNode.parentNode.nextSibling.innerHTML;

        document.getElementById("edit-task-name").value = taskName;
        document.getElementById("edit-task-desc").value = desc;
        document.getElementById("task-edit").style.display = "flex";

        this.setState({
            currTask: {
                "id": validator.escape(event.target.parentNode.previousSibling.id),
                "name": validator.escape(taskName),
                "desc": validator.escape(desc)
            }
        })

        return;
    }

    submitEditTask = (event) => {
        const target = event.target;
        const taskName = event.target.previousSibling.previousSibling.value;
        const desc = event.target.previousSibling.value;

        const jsonObj = {
            "id": this.state.user.id,
            "tasks" :[{
                "id": validator.escape(this.state.currTask.id),
                "name" : validator.escape(taskName),
                "desc" : validator.escape(desc)
            }],
            "method": "Update"
        }


        this.httpRequestHandler("PUT", jsonObj)
        .then((data) => {
            this.populateTask(data);
            document.getElementById("task-edit").style.display = "none";
        })
    }

    render(){
        return(
            <div style = {{width: "100%"}}>
                <div style = {{display: "flex", flexDirection:"column", alignItems: "center", width: '100%'}}>
                    <div id = "gSignIn">
                        <div>Welcome to Kazekito's Todo List.</div>
                        <div style = {{textAlign: "center"}}>Please login to continue.</div>
                        <div style = {{marginTop: "2rem"}}>
                            <GSignin onSuccess = {this.handleSignInSuccess}/>
                        </div>
                    </div>
                    <div id = "gSignOut">
                        <div style = {{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                            <div className = "profile">
                                <a id = "g-image-a" onClick = {(event) => {
                                    const target = document.getElementById("profile-collapsible");
                                    target.style.display = target.style.display === "flex"? "none" : "flex";
                                }}>
                                    <img id = "g-image"></img>
                                    <div id = "profile-collapsible">
                                        <div id = 'name-flex'>
                                            <img id = "g-image-in"></img>
                                            <div id = "g-full-name" style = {{wordWrap: "break-word"}}></div>
                                        </div>
                                        <div id = "g-name"></div>
                                        <button onClick = {this.handleSignOut}>Sign Out</button>
                                    </div>
                                </a>
                            </div>
                            <button id = "add-task-button" onClick = {() => {document.getElementById("task-add").style.display = "flex"}}>
                                Add Task
                            </button>
                        </div>
                        <div className = "todo-popup">
                            <div id = "task-add">
                                <div class = "task-add-inner" id = "add-popup">
                                    <button className = "operation-close" onClick = {
                                        (event) => {
                                            const parent = event.target.parentNode.parentNode.style.display = "none";
                                        }}>X</button>
                                    <div id = "title">Add a New Task</div>
                                    <textarea id = "add-task-name" placeholder = "Task Name" onChange = {(data) => {this.setState({currTask : {"name" : data.target.value, "desc" : this.state.currTask.desc}})}}></textarea>
                                    <textarea id = "add-task-desc" placeholder = "Task Description" onChange = {(data) => {this.setState({currTask : {"name" : this.state.currTask.name, "desc" : data.target.value}})}}></textarea>
                                    <button onClick = {this.handleAddTask}>Add Task</button>
                                </div>
                            </div>
                            <div id = "task-edit">
                                <div class = "task-add-inner" id = "edit-popup">
                                    <button className = "operation-close" onClick = {
                                        (event) => {
                                            const parent = event.target.parentNode.parentNode.style.display = "none";
                                        }}>X</button>
                                    <div id = "title">Edit Current Task</div>
                                    <textarea id = "edit-task-name" placeholder = "Task Name"></textarea>
                                    <textarea id = "edit-task-desc" placeholder = "Task Description"></textarea>
                                    <button onClick = {this.submitEditTask}>Edit Task</button>
                                </div>
                            </div>
                        </div>
                        <div className = "todo-body-div">
                            <div id = "tasks-div">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Todo;