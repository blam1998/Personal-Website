import './PriceCalculator.css';
import React, {Component} from 'react';


class PriceCalculator extends Component{
    constructor(props){
        super(props);
        this.state = {
            memberPortal: [0,100],
            sql: [0,200],
            payment: [0,300],
            database: [0,500],
            pagePrice: 100,
            discount: .80,
            total: 0,
            prevPages: 0,
        }

        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.pagesHandler = this.pagesHandler.bind(this);
    }

    handleCheckBoxChange = (event) => {
        switch(event.target.id){
            case 'member-portal':
                if (this.state.memberPortal[0] === 0){
                    this.setState({
                        memberPortal: [1, this.state.memberPortal[1]],
                        total: this.state.total + this.state.memberPortal[1]
                    })
                }
                else{
                    this.setState({
                        memberPortal: [0, this.state.memberPortal[1]],
                        total: this.state.total - this.state.memberPortal[1]
                    })
                }
                break;
            case 'sql':
                if (this.state.sql[0] === 0){
                    this.setState({
                        sql: [1, this.state.sql[1]],
                        total: this.state.total + this.state.sql[1]
                    })
                }
                else{
                    this.setState({
                        sql: [0, this.state.sql[1]],
                        total: this.state.total - this.state.sql[1]
                    })
                }
                break;
            case 'payment':
                if (this.state.payment[0] === 0){
                    this.setState({
                        payment: [1, this.state.payment[1]],
                        total: this.state.total + this.state.payment[1]
                    })
                }
                else{
                    this.setState({
                        payment: [0, this.state.payment[1]],
                        total: this.state.total - this.state.payment[1]
                    })
                }
                break;
            case 'database':
                if (this.state.database[0] === 0){
                    this.setState({
                        database: [1, this.state.database[1]],
                        total: this.state.total + this.state.database[1]
                    })
                }
                else{
                    this.setState({
                        database: [0, this.state.database[1]],
                        total: this.state.total - this.state.database[1]
                    })
                }
                break;
            default:
                break;
        }
    }

    pagesHandler = (event) => {

        if (event.target.value <= 0 || !Number.isInteger(parseInt(event.target.value))){
            this.setState({
                total: (this.state.total - (this.state.prevPages * (parseInt(this.state.pagePrice) * (this.state.prevPages >= 5? this.state.discount : 1)))),
                prevPages: 0,
            })
            return;
        }

        if (parseInt(event.target.value) < 5){
            this.setState({
                total: (this.state.total - (this.state.prevPages * (this.state.pagePrice * (this.state.prevPages >= 5? this.state.discount : 1)))) + (parseInt(event.target.value) * this.state.pagePrice),
            })
        }
        else{
            this.setState({
                total: (this.state.total - (this.state.prevPages * (this.state.pagePrice * (this.state.prevPages >= 5? this.state.discount : 1)))) + (parseInt(event.target.value) * (this.state.pagePrice * this.state.discount)),
            })
        }

        this.setState({
            prevPages: parseInt(event.target.value)
        })
    }



    render(){
        return(
        <fieldset className = "PriceCalculator">
            <legend>
                Price Estimate
            </legend>
            <div style = {{marginBottom: "1rem"}}>Check all that is required for your website</div>
            <div className = "Checklist" style = {{marginBottom: "1rem"}}>
                <div>
                    <span>Member Portal</span>
                    <input type = "checkbox" id = "member-portal"  onChange = {this.handleCheckBoxChange}></input>
                </div>
                <div>
                    <span>SEO Optimization</span>
                    <input type = "checkbox" id = "sql"  onChange = {this.handleCheckBoxChange}></input>
                </div>
                <div>
                    <span>Payment System</span>
                    <input id = "payment" type = "checkbox"  onChange = {this.handleCheckBoxChange}></input>
                </div>
                <div>
                    <span>Database Integration</span>
                    <input type = "checkbox" id = "database"  onChange = {this.handleCheckBoxChange}></input>
                </div>
            </div>
            <div>
                <div style = {{marginBottom: "1rem"}}>How many page does your website have?</div>
                <div style = {{display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1rem"}}>
                    <div>
                        <input onChange = {this.pagesHandler}></input>
                        <span style = {{marginLeft: "1rem",}}>Page(s)</span> 
                    </div>
                </div>
            </div>
            <div style = {{border: "1px dashed black", width: "100%", marginBottom: "1rem"}}></div>
            <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div>Estimated Price</div>
                <div>{"$" + this.state.total}</div>
            </div>
        </fieldset>)
    }
}

export default PriceCalculator;