import './Battle.css';
import React, {Component} from 'react';
import enemyDict from './EnemyDict.js';



class Battle{
    constructor(character, enemy){
        this.character = character;
        this.enemy = enemy;
        this.fight = this.fight.bind(this);
    }

    fight(){
        this.character.setHp(2);
        const div = document.createElement("div");
        const content = document.createTextNode("Kekw");
        div.appendChild(content);

        const target = document.getElementById("battle-div");
        target.appendChild(div)
        return this.character;
    }
}


export default Battle;
