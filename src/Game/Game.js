import './Game.css';
import {Component} from 'react';
import User from '../user';
import React from 'react';
import CharacterDisplay from './CharacterDisplay';
import Battle from './Battle';
import BattleDisplay from './BattleDisplay';
import Character from './Character';
import Enemy from './Enemy';
import {Item, Equipment, Consumable, ItemFactory, itemMap} from './Item';
import { createRoot} from 'react-dom/client';
import Inventory from './Inventory';
import {enemyDict} from './EnemyDict';
import {forageMap} from './Forage';
import Craft from './Craft';
import {Footer} from "../Footer.js";


function createEquipment(factory, name){
    return factory.createEquipment(itemMap.get(name)[0],itemMap.get(name)[1], itemMap.get(name)[2], itemMap.get(name)[3], itemMap.get(name)[4]);
}

function createConsumable(factory, name){
    return factory.createConsumable(itemMap.get(name)[0], itemMap.get(name)[1], itemMap.get(name)[2], itemMap.get(name)[3]);
}

function createMaterial(factory, name){
    return factory.createMaterial(itemMap.get(name)[0], itemMap.get(name)[1], itemMap.get(name)[2], itemMap.get(name)[3]);
}



class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            forage: 0,
            forageFunction: null,
        }

        this.factory = new ItemFactory();
        this.enemyNameArray = Array.from(enemyDict.keys());

        const helm = createEquipment(this.factory, "Beginner Helmet");
        const armor = createEquipment(this.factory, "Beginner Armor");
        const gloves = createEquipment(this.factory, "Beginner Gloves");
        const Pants = createEquipment(this.factory, "Beginner Pants");
        const shoes = createEquipment(this.factory, "Beginner Shoes");
        const meal = createConsumable(this.factory, "Lavish Meal");
        meal.setQuantity(2);
        const wolf = createMaterial(this.factory, "Wolf Meat");
        wolf.setQuantity(10);
        const ingot = createMaterial(this.factory, "Iron Ingot");
        ingot.setQuantity(30);


        this.character1 = new Character([10,10,10,10], new Map([[helm.getName(), helm], [armor.getName(), armor], [gloves.getName(), gloves],
         [Pants.getName(), Pants], [shoes.getName(), shoes], [meal.getName(), meal], [wolf.getName(), wolf], [ingot.getName(), ingot]]), [null, null, null, null, null], "Corgi");
        this.Character = this.Character.bind(this);
        this.Battle = this.Battle.bind(this);
        this.closePrevious = this.closePrevious.bind(this);
        this.Inventory = this.Inventory.bind(this);
        this.Forage = this.Forage.bind(this);
        this.createItem = this.createItem.bind(this);
        this.ForageHandler = this.ForageHandler.bind(this);
        this.Craft = this.Craft.bind(this);
        

        //name, itemType, (slot),value, quantity
        //value --> [hp,atk,def,heal,hp+,atk+,def+]
        
        
    }

    closePrevious(){
        const character = document.getElementById("character-div");
        const inventory = document.getElementById("inventory-div");
        const crafting = document.getElementById("crafting-div");

        if (character){
            character.remove();
            return 5;
        }

        if (crafting){
            crafting.remove();
            return 2;
        }

        //Need to save data or erase data.

        if (inventory){
            inventory.remove();
            return 4;
        }
    }

    Character(){
        const battle = document.getElementById("battle-div");
        if (battle){return;}

        if (this.closePrevious() === 5){
            return;
        }

        const div = document.createElement("div");
        div.setAttribute("id", "character-div");
        const target = document.getElementById("game-full-div-id");

        //ReactDOM.render(<Character/>, div);
        const root = createRoot(div);
        root.render(<CharacterDisplay character = {this.character1}/>);

        target.appendChild(div);
    }

    Battle(){

        if (this.state.forage){
            alert("Can't battle while foraging.");
            return;
        }

        const battle = document.getElementById("battle-div");
        if (battle){return;}

        this.closePrevious();

        const div = document.createElement("div");
        div.setAttribute("id", "battle-div");
        const target = document.getElementById("game-full-div-id");

        const historyMsg = document.createElement("div");
        const randomIndex = Math.floor(Math.random() * this.enemyNameArray.length);
        const enemyStatsDict = enemyDict.get(this.enemyNameArray[randomIndex]);
        const enemyHp = enemyStatsDict.get("Hp");
        const enemyAtk = enemyStatsDict.get("Atk");
        const enemyDef = enemyStatsDict.get("Def");
        const loot = enemyStatsDict.get("Loot");

        const content = document.createTextNode("You encountered a "+ this.enemyNameArray[randomIndex] + ".");
        historyMsg.appendChild(content);
        document.getElementById("game-history").appendChild(historyMsg);
        document.getElementById("game-history").scrollTop = document.getElementById("game-history").scrollHeight;

        const randomEnemy = new Enemy([enemyHp, enemyHp, enemyAtk, enemyDef], this.enemyNameArray[randomIndex], loot)

        const root = createRoot(div);
        target.appendChild(div);
        root.render(<BattleDisplay character = {this.character1} enemy = {randomEnemy} Turn = {Math.floor(Math.random() * 2)}/>);

    }

    Inventory(){
        const battle = document.getElementById("battle-div");
        if (battle){return;}

        if (this.closePrevious() === 4){
            return;
        }
        
        const div = document.createElement("div");
        div.setAttribute("id", "inventory-div");
        const target = document.getElementById("game-full-div-id");

        const root = createRoot(div);
        root.render(<Inventory Character = {this.character1}/>);

        target.appendChild(div);


    }

    ForageHandler(){
        const lootPool = [];
                
        forageMap.forEach((value,key) => {
            const randomX = Math.round(Math.random() * 100);
            if (value >= randomX){
                lootPool.push(this.createItem(key,1))
            }
        });

        for (let i = 0; i < lootPool.length; i++){
            const historyMsg = document.createElement("div");
            const content = document.createTextNode("You foraged " + lootPool[i].getQuantity() +  " " + lootPool[i].getName() + ".");
            historyMsg.appendChild(content);
            document.getElementById("game-history").appendChild(historyMsg);
            document.getElementById("game-history").scrollTop = document.getElementById("game-history").scrollHeight;
        }
                
        for (let i = 0; i < lootPool.length; i++){
            this.character1.addItemToInventory(lootPool[i],1);
        }

        if (lootPool.length !== 0){
            <Inventory Character = {this.character1}/>
        }
    }

    Forage(){
        const battle = document.getElementById("battle-div");

        if (battle){
            alert("Can't forage in battle!");
            return;
        }

        //If you're not foraging.
        if (!this.state.forage){
            document.getElementById("forage-button").innerHTML = "Stop Foraging"

            const intervalId = setInterval(this.ForageHandler, 3000);

            this.setState({
                forageFunction : intervalId,
                forage: 1,
            });
        }

        //If you're Foraging.
        else if (this.state.forage){
            document.getElementById("forage-button").innerHTML = "Hunt & Forage"
            clearInterval(this.state.forageFunction);
            this.setState({
                forageFunction: null,
                forage: 0,
            });

        }
        
    }


    createItem(itemName, amount){
        const itemType = itemMap.get(itemName)[1];
        let item = null;
        if (itemType === "Material"){
            item = this.factory.createMaterial(itemName, itemType, itemMap.get(itemName)[2], itemMap.get(itemName)[3]);
        }

        if (itemType === "Equipment"){
            item = this.factory.createEquipment(itemName, itemType, itemMap.get(itemName)[2], itemMap.get(itemName)[3], itemMap.get(itemName)[4]);
        }

        if (itemType === "Consumable"){
            item = this.factory.createConsumable(itemName, itemType, itemMap.get(itemName)[2], itemMap.get(itemName)[3]);
        }

        item.setQuantity(amount);

        return item;
    }

    Craft(){
        //Can't craft in battle
        const battle = document.getElementById("battle-div");
        if (battle){return;}

        if (this.closePrevious() === 2){
            return;
        }

        const div = document.createElement("div");
        div.setAttribute("id", "crafting-div");
        const target = document.getElementById("game-full-div-id");

        //ReactDOM.render(<Character/>, div);
        const root = createRoot(div);
        root.render(<Craft Character = {this.character1}/>);

        target.appendChild(div);

    }


    render(){
        return(
            <div>
                <div className = "game-background">
                    <div className = "Navigation-Bar">
                        <User/>
                    </div>
                    <div className = "game-full-div" id = "game-full-div-id">
                        <div className = "game-gui">
                            <button className = "game-gui-button" onClick = {() => this.Battle()}>Battle</button>
                            <button className = "game-gui-button" onClick = {() => this.Forage()} id = "forage-button">Hunt & Forage</button>
                            <button className = "game-gui-button" onClick = {() => this.Craft()}>Crafting</button>                            
                            <button className = "game-gui-button" onClick = {() => this.Inventory()}>Inventory</button>
                            <button className = "game-gui-button" onClick = {() => this.Character()}>Character</button>
                        </div>
                        <div id = "game-history"></div>
                    </div>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        )
    }
}



export default Game;