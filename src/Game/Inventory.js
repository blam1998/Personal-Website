import "./Inventory.css";
import React, {Component} from 'react';


class Inventory extends Component{
    constructor(props){
        super(props);
        this.state = {
            myInventory : this.props.Character.getInventory(),
            myCharacter : this.props.Character,
            render: false,
        }
        this.character = this.props.Character;
        this.useItem = this.useItem.bind(this);
        this.equipItem = this.equipItem.bind(this);
    }

    useItem(itemName){
        this.setState({
            render: !this.state.render
        })

        if (this.character.getInventory().get(itemName).getItemType() != "Consumable"){
            alert("Can't 'Use' Equipment or Material, Please click Equip");
            return;
        }

        const item = this.character.getInventory().get(itemName);
        
        this.character.useItem(item);
    }

    equipItem(itemName){
        this.setState({
            render: !this.state.render
        })
        if (this.character.getInventory().get(itemName.toString()).getItemType() !== "Equipment"){
            alert("Can't 'Equip' Consumable, Please click 'use'");
            return;
        }

        const item = this.character.getInventory().get(itemName);
        this.character.equipItem(item);

    }

    render(){
        var x = [];
        this.character.getInventory().forEach((value, key) => {
            let button1 = null;
            let button2 = null;

            if (value.getItemType() === "Consumable"){
                button1 = <button className = "use-button" onClick = {()=> this.useItem(key)}>Use</button>;
            }
            else if (value.getItemType() === "Equipment"){
                button2 = <button className = "use-button" onClick = {()=> this.equipItem(key)}>Equip</button>
            }

            x.push(
            <div className = "inventory-row" id = {key}>
                <div className = "inventory-column name">{key}</div>
                <div className = "inventory-column type">{value.getItemType()}</div>
                <div className = "inventory-column equipment">{value.getItemType() === "Equipment"? value.getSlot() : "---"}</div>
                <div className = "inventory-column heal">{value.getValue()[3]}</div>
                <div className = "inventory-column hp">{value.getItemType() === "Equipment"? value.getValue()[0] : value.getValue()[4]}</div>
                <div className = "inventory-column atk">{value.getItemType() === "Equipment"? value.getValue()[1] : value.getValue()[5]}</div>
                <div className = "inventory-column def">{value.getItemType() === "Equipment"? value.getValue()[2] : value.getValue()[6]}</div>
                <div className = "inventory-column quantity">{value.getQuantity()}</div>
                {button1}
                {button2}
            </div>
            );
        })

        return(
        <div id = "inventory">
            <div className = "inventory-row">
                <div className = "inventory-column name">Name</div>
                <div className = "inventory-column type">Type</div>
                <div className = "inventory-column equipment">Equipment Slot</div>
                <div className = "inventory-column heal">Heal</div>
                <div className = "inventory-column hp">HP+</div>
                <div className = "inventory-column atk">Atk+</div>
                <div className = "inventory-column def">Def+</div>
                <div className = "inventory-column quantity">Quantity</div>
            </div>
            {x}
            
            
        </div>
        )
    }
}

export default Inventory;