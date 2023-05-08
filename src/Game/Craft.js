import './Craft.css';
import {Component} from 'react';
import {Item, Equipment, Consumable, ItemFactory, itemMap, craftMap} from './Item';



const craftRequirement = new Map([]);
let currTarget = null;
const currFactory = new ItemFactory();

class Craft extends Component{
    constructor(props){
        super(props);

        this.state = {
            character: this.props.Character,
            craftCount: 0,
        }

        this.craftName = [];

        this.craftItem = this.craftItem.bind(this);
    }

    componentDidMount(){
        for (let i = 0; i < this.craftName.length; i++){
            document.getElementById("item"+i).addEventListener("click", function(event){
                const clickedElement = event.target;
                const name = clickedElement.innerHTML;
                currTarget = clickedElement.innerHTML;
                const target = document.getElementById("crafting-requirement-id");
                target.innerHTML = '';
                const requirement = craftRequirement.get(name);

                for (let i = 0; i < requirement.length; i++){
                    target.appendChild(requirement[i]);
                }
            });
        }

    }

    craftItem(){
        const requirements = craftMap.get(currTarget);
        const amount = document.getElementById("amount").value;

        if (amount <= 0 || !Number.isInteger(parseInt(amount))){
            console.log(amount);
            return;
        }

        if (!requirements){
            return;
        }

        for (let i = 1; i < requirements.length; i++){
            //Material doesn't exist
            if (!this.state.character.getInventoryMap().has(requirements[i][0])){
                const historyMsg = document.createElement("div");
                const content = document.createTextNode("You can't craft " + currTarget);
                historyMsg.appendChild(content);
                document.getElementById("game-history").appendChild(historyMsg);
                document.getElementById("game-history").scrollTop = document.getElementById("game-history").scrollHeight;
                return;
            }
        }

        for (let j = 1; j < requirements.length; j++){
            let ourAmount = this.state.character.getInventoryMap().get(requirements[j][0]);
            let targetAmount = requirements[j][1] * amount;

            if (ourAmount <  targetAmount){
                const historyMsg1 = document.createElement("div");
                const content1 = document.createTextNode("You can't craft " + currTarget);
                historyMsg1.appendChild(content1);
                document.getElementById("game-history").appendChild(historyMsg1);
                document.getElementById("game-history").scrollTop = document.getElementById("game-history").scrollHeight;
                return;
            }
        }

        //Delete items from your inventory
        for (let i = 1; i < requirements.length; i++){
            this.state.character.subtractItemFromInventory(requirements[i][0], requirements[i][1] * amount);
            this.state.character.subtractInventoryMap(requirements[i][0], requirements[i][1] * amount);
        }

        const itemType = itemMap.get(currTarget)[1];
        const value = itemMap.get(currTarget)[2];

        if (itemType === "Consumable"){
            this.state.character.addItemToInventory(currFactory.createConsumable(currTarget, "Consumable", value, 1), amount);
        }

        if (itemType === "Equipment"){
            this.state.character.addItemToInventory(currFactory.createEquipment(currTarget, "Equipment", itemMap.get(currTarget)[2], itemMap.get(currTarget)[3], 1), amount);
        }

        if (itemType === "Material"){
            this.state.character.addItemToInventory(currFactory.createConsumable(currTarget, "Material", value, 1), amount);
        }

        const historyMsg = document.createElement("div");
        const content = document.createTextNode("You crafted " + amount.toString() + " " + currTarget + ".");
        historyMsg.appendChild(content);
        document.getElementById("game-history").appendChild(historyMsg);
        document.getElementById("game-history").scrollTop = document.getElementById("game-history").scrollHeight;
    }

    render(){
        let x = 0;
        craftMap.forEach((value,key) => {
            this.craftName.push(<button id = {"item"+x}>{key}</button>)
            let requirements = [];

            let temp = document.createElement("div");
            let tempContent = document.createTextNode(value[0]);
            temp.appendChild(tempContent);
            requirements.push(temp);

            for (let i = 1; i < value.length; i++){
                const div = document.createElement("div");
                const content = document.createTextNode(value[i][0] + " (x" + value[i][1].toString() + ")" + "  Have (x" + (this.state.character.getInventoryMap().has(value[i][0])?  this.state.character.getInventoryMap().get(value[i][0]).toString() + ")" : "0)"))
                div.appendChild(content);
                requirements.push(div);
            }
            craftRequirement.set(key, requirements);
            x++;
        });

        return(
            <div className = "crafting-main">
                <div className = "crafting-item-name">
                    {this.craftName.map((value, index) => {
                        return(value);
                    })
                    

                    }
                </div>
                <div className = "crafting-requirement-main">
                    <div className = "crafting-requirement" id = "crafting-requirement-id"></div>
                    <div className = "crafting-confirm">
                        <input placeholder = "Amount.." id = "amount"></input>
                        <button id = "craft-button" onClick = {() => this.craftItem()}>Craft</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Craft;