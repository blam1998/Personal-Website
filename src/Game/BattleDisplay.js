import './BattleDisplay.css';
import {Component} from 'react';
import Game from './Game';
import { createRoot } from 'react-dom/client';
import {enemyDict} from './EnemyDict';
import {Item, Equipment, Consumable, ItemFactory, itemMap} from './Item';

const battleItemFactory = new ItemFactory();

class BattleDisplay extends Component{
    constructor(props){
        super(props);

        this.state = {
            Player:{
                "Hp": this.props.character.getHp(),
                "Attack": this.props.character.getAttack(),
                "Defense": this.props.character.getDefense()
            },
            Enemy: {
                "Hp": this.props.enemy.getHp(),
                "Attack": this.props.enemy.getAttack(),
                "Defense": this.props.enemy.getDefense()
            },
            enemyName: this.props.enemy.getName(),
            playerName: this.props.character.getName(),
            playerMaxHp: this.props.character.getMaxHp(),
            enemyMaxHp: this.props.enemy.getMaxHp(),
            turn: this.props.Turn,
            playerObj : this.props.character,
            enemyObj: this.props.enemy

        }


        this.attackHandler = this.attackHandler.bind(this);
        this.enemyAttackHandler = this.enemyAttackHandler.bind(this);
        this.run = this.run.bind(this);
        this.dropLoot = this.dropLoot.bind(this);
        this.createItem = this.createItem.bind(this);
    }

    attackHandler(){
        if (!this.state.turn){ return; }
        const currHp = this.state.enemyObj.getHp();
        let newHp = null;

        const randomNumber = Math.floor(Math.random() * 101);
        if (randomNumber <= 20){
            newHp = this.state.enemyObj.receiveAttack(Math.floor(this.state.Player.Attack * 1.5));
        }
        else{
            newHp = this.state.enemyObj.receiveAttack(this.state.Player.Attack);
        }

        this.setState({
            Enemy : {
                "Hp": newHp,
                "Attack": this.state.enemyObj.getAttack(),
                "Defense": this.state.enemyObj.getDefense()
            },
            turn: 0
        })

        const div = document.createElement("p");
        let content = null;
        if (randomNumber <= 20){
            content = document.createTextNode("You crit for " + (currHp - newHp).toString() + " Damage.");
        }
        else{
            content = document.createTextNode("You dealt " + (currHp - newHp).toString() + " Damage.");
        }
        div.appendChild(content);

        document.getElementById("dmg-history-div").appendChild(div);
        document.getElementById("dmg-history-div").scrollTop = document.getElementById("dmg-history-div").scrollHeight;
    }

    run(){
        const randomNumber = Math.floor(Math.random() * 101);

        if (randomNumber >= 90){
            document.getElementById("run-button").remove();
            const historyMsg = document.createElement("div");
            const content = document.createTextNode(this.state.enemyName + " Trapped you, now you have nowhere to run.");
            historyMsg.appendChild(content);
            document.getElementById("game-history").appendChild(historyMsg);
            document.getElementById("game-history").scrollTop = document.getElementById("game-history").scrollHeight;
            return;
        }

        document.getElementById("battle-div").remove();
    }

    enemyAttackHandler(){
        const currHp = this.state.playerObj.getHp();
        const newHp = this.state.playerObj.receiveAttack(this.state.Enemy.Attack);

        this.setState({
            Player: {
                "Hp": newHp,
                "Attack": this.state.Player.Attack,
                "Defense": this.state.Player.Defense
            },
            turn: 1
        })

        const div = document.createElement("p");
        const content = document.createTextNode(this.state.enemyName + " dealt " + (currHp - newHp).toString() + " Damage.");
        div.appendChild(content);

        document.getElementById("dmg-history-div").appendChild(div);
        document.getElementById("dmg-history-div").scrollTop = document.getElementById("dmg-history-div").scrollHeight;
    }

    createItem(itemName, amount){
        //Use battleItemFactory to create item and return it
        const itemType = itemMap.get(itemName)[1];
        let item = null;
        if (itemType === "Material"){
            item = battleItemFactory.createMaterial(itemName, itemType, itemMap.get(itemName)[2], itemMap.get(itemName)[3]);
        }

        if (itemType === "Equipment"){
            item = battleItemFactory.createEquipment(itemName, itemType, itemMap.get(itemName)[2], itemMap.get(itemName)[3], itemMap.get(itemName)[4]);
        }

        if (itemType === "Consumable"){
            item = battleItemFactory.createConsumable(itemName, itemType, itemMap.get(itemName)[2], itemMap.get(itemName)[3]);
        }

        item.setQuantity(amount);

        return item;
    }

    dropLoot(){
        let lootPool = [];
        //Item name : [Int(percentage), Int Quantity] (0 - 100)
        //Use Item Map to create Item.
        this.state.enemyObj.getLoot().forEach((value,key) => {
            const randomX = Math.round(Math.random() * 100);
            if (randomX <= value[0]){
                lootPool.push(this.createItem(key, value[1]));
            }
        })

        for (let i = 0; i < lootPool.length; i++){
            this.state.playerObj.addItemToInventory(lootPool[i], lootPool[i].getQuantity());
        }

        for (let i = 0; i < lootPool.length; i++){
            const historyMsg = document.createElement("div");
            const content = document.createTextNode("You got " + lootPool[i].getQuantity() +  " " + lootPool[i].getName() + ".");
            historyMsg.appendChild(content);
            document.getElementById("game-history").appendChild(historyMsg);
            document.getElementById("game-history").scrollTop = document.getElementById("game-history").scrollHeight;
        }

        if (lootPool.length >= 1){
            const historyMsg = document.createElement("div");
            const content = document.createTextNode("-----------------------------");
            historyMsg.appendChild(content);
            document.getElementById("game-history").appendChild(historyMsg);
            document.getElementById("game-history").scrollTop = document.getElementById("game-history").scrollHeight;
        }
    }

    componentDidUpdate(){
        const battle = document.getElementById("battle-div");

        if (this.state.Player.Hp <= 0){
            this.state.playerObj.Die();

            const historyMsg = document.createElement("div");
            const content = document.createTextNode("You died. You lost 1 Max HP, 1 Max Attack, 1 Max Defense, and your current equipment.");
            historyMsg.appendChild(content);
            document.getElementById("game-history").appendChild(historyMsg);
            document.getElementById("game-history").scrollTop = document.getElementById("game-history").scrollHeight;

            if (battle){
                battle.remove()
            }

            return;
        }

        else if (this.state.Enemy.Hp <= 0){
            this.dropLoot();
            if (battle){
                battle.remove()
            }
            
            return;
        }

        if (this.state.turn === 0){
            this.enemyAttackHandler();
        }

    }

    componentDidMount(){
        if (this.state.turn === 0){
            this.enemyAttackHandler();
        }
    }



    render(){
        return(
            <div>
                <div className = "turn-display">{this.state.turn? "Your turn" : "Enemy Turn"}</div>
                <div className = "battle-hp-stats">
                    <div className = "battle-hp-stats-obj">
                        <div id = "player-stats-div">
                            <div>{this.state.playerName}</div>
                            <div>{"Hp: " + this.state.Player.Hp + " / " + this.state.playerMaxHp}</div>
                            <div>{"Attack: " + this.state.Player.Attack}</div>
                            <div>{"Defense: " + this.state.Player.Defense}</div>
                        </div>
                        <div id = "enemy-stats-div">
                            <div>{this.state.enemyName}</div>
                            <div>{"Hp: " + this.state.Enemy.Hp + " / " + this.state.enemyMaxHp}</div>
                            <div>{"Attack: " + this.state.Enemy.Attack}</div>
                            <div>{"Defense: " + this.state.Enemy.Defense}</div>
                        </div>
                    </div>
                    <div className = "battle-hp-stats-obj">
                        <div id = "dmg-history-div">
                        </div>
                    </div>
                </div>
                <div className = "user-interface">
                    <button onClick = {()=> this.attackHandler()}>Attack</button>
                    <button onClick = {() => this.run()} id = "run-button">Run</button>
                </div>
                <div className = "combat-log"></div>
            </div>
        )
    }
}

export default BattleDisplay;