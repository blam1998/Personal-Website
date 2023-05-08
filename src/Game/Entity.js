
class Entity{
    constructor(stats, name){
        this._name = name;
        this._hp = stats[0];
        this._maxHp = stats[1];
        this._attack = stats[2];
        this._defense = stats[3];
    }

    setName(value){
        this._name = value;
    }

    getName(){
        return this._name;
    }

    setHp(value){
        if (value < 0){
            return;
        }
        this._hp = value;
    }

    getHp(){
        return this._hp;
    }

    setAttack(value){
        if (value < 0){
            return;
        }
        this._attack = value;
    }

    getAttack(){
        return this._attack;
    }

    setDefense(value){
        if (value < 0){
            return;
        }
        this._defense = value;
    }

    getDefense(){
        return this._defense;
    }

    receiveAttack(value){
        this._hp = (value > this._defense)? this._hp - (value - this._defense) : this._hp;
        if (this._hp < 0){
            this._hp = 0;
        }

        return this._hp;
    }

    setMaxHp(value){
        if (value < 0){
            return;
        }
        this._maxHp = value;
    }

    getMaxHp(){
        return this._maxHp;
    }
}


export default Entity;