import Entity from './Entity';

class Enemy extends Entity{
    constructor(stats, name, loot){
        super(stats, name);
        this._loot = loot;
    }

    setLoot(map){
        this._loot = map;
    }

    getLoot(){
        return this._loot;
    }
}



export default Enemy;