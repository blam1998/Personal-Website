import './CharacterDisplay.css';
import {Component} from 'react';
import character1 from './Game.js';

class CharacterDisplay extends Component{
    constructor(props){
        super(props);
        this.state = {
            Equipment : new Map([
                ["Helmet", this.props.character.getEquipment()[0]? this.props.character.getEquipment()[0].getName() : "none"],
                ["Armor", this.props.character.getEquipment()[1]? this.props.character.getEquipment()[1].getName() : "none"],
                ["Gloves", this.props.character.getEquipment()[2]? this.props.character.getEquipment()[2].getName() : "none"],
                ["Pants", this.props.character.getEquipment()[3]? this.props.character.getEquipment()[3].getName() : "none"],
                ["Shoes", this.props.character.getEquipment()[4]? this.props.character.getEquipment()[4].getName() : "none"]
            ]),
            Buff : [],
            Stats : {
                "Hp": this.props.character.getHp(),
                "maxHp": this.props.character.getMaxHp(),
                "Defense": this.props.character.getDefense(),
                "Attack": this.props.character.getAttack()
            },
            Character : this.props.character
        }
    }

    componentDidUpdate(){
        
        const helm = this.state.Character.getEquipment()[0];
        const armor = this.state.Character.getEquipment()[1];
        const gloves = this.state.Character.getEquipment()[2];
        const pants = this.state.Character.getEquipment()[3];
        const shoes = this.state.Character.getEquipment()[4];

        this.setState({
            Equipment: new Map([
                ["Helmet", helm? helm.getName() : "none"],
                ["Armor", armor? armor.getName() : "none"],
                ["Gloves", gloves? gloves.getName() : "none"],
                ["Pants", pants? pants.getName() : "none"],
                ["Shoes", shoes? shoes.getName() : "none"]
            ]),
            Buff: [],
            Stats : {
                "Hp": this.state.Character.getHp(),
                "maxHp": this.state.Character.getMaxHp(),
                "Defense": this.state.Character.getDefense(),
                "Attack": this.state.Character.getAttack()
            }
        });

    }


    render(){
        return(
            <div className = "character-class">
                <div className = "character-display-header">
                    Equipment
                    <div>{"Helmet: " + this.state.Equipment.get("Helmet") + (this.state.Character.getEquipment()[0]? "  (HP: " + this.state.Character.getEquipment()[0].getValue()[0] + " ATK: " + this.state.Character.getEquipment()[0].getValue()[1] + " DEF: "  + this.state.Character.getEquipment()[0].getValue()[2] + ")": "")}</div>
                    <div>{"Armor: " + this.state.Equipment.get("Armor") + (this.state.Character.getEquipment()[1]? "  (HP: " + this.state.Character.getEquipment()[1].getValue()[0] + " ATK: " + this.state.Character.getEquipment()[1].getValue()[1] + " DEF: "  + this.state.Character.getEquipment()[1].getValue()[2] + ")": "")}</div>
                    <div>{"Gloves: " + this.state.Equipment.get("Gloves") + (this.state.Character.getEquipment()[2]? "  (HP: " + this.state.Character.getEquipment()[2].getValue()[0] + " ATK: " + this.state.Character.getEquipment()[2].getValue()[1] + " DEF: "  + this.state.Character.getEquipment()[2].getValue()[2] + ")": "")}</div>
                    <div>{"Pants: " + this.state.Equipment.get("Pants") + (this.state.Character.getEquipment()[3]? "  (HP: " + this.state.Character.getEquipment()[3].getValue()[0] + " ATK: " + this.state.Character.getEquipment()[3].getValue()[1] + " DEF: "  + this.state.Character.getEquipment()[3].getValue()[2] + ")": "")}</div>
                    <div>{"Shoes: " + this.state.Equipment.get("Shoes") + (this.state.Character.getEquipment()[4]? "  (HP: " + this.state.Character.getEquipment()[4].getValue()[0] + " ATK: " + this.state.Character.getEquipment()[4].getValue()[1] + " DEF: "  + this.state.Character.getEquipment()[3].getValue()[2] + ")": "")}</div>
                </div>
                <div className = "character-display-header">
                    Stats
                    <div>
                        <div>{"HP: " + this.state.Stats.Hp + "/" + this.state.Stats.maxHp}</div>
                        <div>{"Attack: " + this.state.Stats.Attack}</div>
                        <div>{"Def: " + this.state.Stats.Defense}</div>
                        
                    </div>
                </div>
            </div>)
    }
}


export default CharacterDisplay;