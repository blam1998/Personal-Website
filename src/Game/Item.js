

export class Item{
    constructor(name, itemType, value, quantity){
        this._name = name; //string
        this._itemType = itemType; //string --> consumable, equipment, material
        this._value = value; //array(int) ``[hp,atk,def,heal,hp+,atk+,def+]
        this._quantity = quantity;//int
    }

    setName(value){
        this._name = value;
    }

    getName(){
        return this._name;
    }

    setItemType(value){
        this._itemType = value;
    }

    getItemType(){
        return this._itemType;
    }

    setValue(value){
        this._value = value;
    }

    getValue(){
        return this._value;
    }

    setQuantity(value){
        this._quantity = value;
    }

    getQuantity(){
        return this._quantity;
    }

    addQuantity(value){
        this._quantity = parseInt(this._quantity) + parseInt(value);
    }
}

//5
//string, string, string, 
export class Equipment extends Item{
    constructor(name, itemType, slot, value, quantity){
        super(name, itemType, value, quantity);

        this._slot = slot;
        this._hp = this.getValue()[0];
        this._attack = this.getValue()[1];
        this._defense = this.getValue()[2];
    }

    setSlot(value){
        //value == string
        this._slot = value;
    }

    getSlot(){
        return this._slot;
    }

    setHp(value){
        this._hp = value;
    }

    getHp(){
        return this._hp;
    }

    setAttack(value){
        this._attack = value;
    }

    getAttack(){
        return this._attack;
    }

    setDefense(value){
        this._defense = value;
    }

    getDefense(){
        return this._defense;
    }
}


export class Consumable extends Item{
    constructor(name, itemType, value, quantity){
        super(name, itemType, value, quantity);

    }
}

export class Material extends Item{
    constructor(name, itemType, value, quantity){
        super(name, itemType, value, quantity);
    }
}



export class ItemFactory{
    constructor(){
    }

    createConsumable(name, itemType, value, quantity){
        return new Consumable(name, itemType, value, quantity);
    }

    createEquipment(name, itemType, slot, value, quantity){
        return new Equipment(name, itemType, slot, value, quantity);
    }

    createMaterial(name, itemType, value, quantity){
        return new Material(name, itemType, value, quantity);
    }
}


const itemMap = new Map([
    ["Wolf Meat", ["Wolf Meat", "Material", [0,0,0,0,0,0,0], 1]],
    ["Wolf Pelt", ["Wolf Pelt", "Material", [0,0,0,0,0,0,0], 1]],
    ["Berries", ["Berries", "Material", [0,0,0,0,0,0,0], 1]],
    ["Iron Scraps", ["Iron Scraps", "Material", [0,0,0,0,0,0,0], 1]],
    ["Iron Ingot", ["Iron Ingot", "Material", [0,0,0,0,0,0,0], 1]],


    ["Cooked Wolf Meat", ["Cooked Wolf Meat", "Consumable", [0,0,0,10,0,0,0], 1]],
    ["Lavish Meal", ["Lavish Meal", "Consumable", [0,0,0,0,1,1,1], 1]],


    ["Beginner Helmet", ["Beginner Helmet", "Equipment", "Helmet", [1,0,0,0,0,0,0], 1]],
    ["Beginner Armor", ["Beginner Armor", "Equipment", "Armor", [2,0,0,0,0,0,0], 1]],
    ["Beginner Gloves", ["Beginner Gloves", "Equipment", "Gloves", [1,0,0,0,0,0,0], 1]],
    ["Beginner Pants", ["Beginner Pants", "Equipment", "Pants", [2,0,0,0,0,0,0], 1]],
    ["Beginner Shoes", ["Beginner Shoes", "Equipment", "Shoes", [1,0,0,0,0,0,0], 1]],
    ["Leather Helmet", ["Leather Helmet", "Equipment", "Helmet", [1,0,1,0,0,0,0], 1]],
    ["Leather Armor", ["Leather Armor", "Equipment", "Armor", [2,1,4,0,0,0,0], 1]],
    ["Leather Gloves", ["Leather Gloves", "Equipment", "Gloves", [0,0,1,0,0,0,0], 1]],
    ["Leather Pants", ["Leather Pants", "Equipment", "Pants", [2,1,3,0,0,0,0], 1]],
    ["Leather Shoes", ["Leather Shoes", "Equipment", "Shoes", [0,0,1,0,0,0,0], 1]],
    ["Iron Helmet", ["Iron Helmet", "Equipment", "Helmet", [4,2,4,0,0,0,0], 1]],
    ["Iron Armor", ["Iron Armor", "Equipment", "Armor", [10,5,10,0,0,0,0], 1]],
    ["Iron Gloves", ["Iron Gloves", "Equipment", "Gloves", [4,2,4,0,0,0,0], 1]],
    ["Iron Pants", ["Iron Pants", "Equipment", "Pants", [6,3,6,0,0,0,0], 1]],
    ["Iron Shoes", ["Iron Shoes", "Equipment", "Shoes", [4,2,4,0,0,0,0], 1]],
])

//String : array[array]
const craftMap = new Map([
    ["Lavish Meal", ["Max HP: 1 \n Max Attack: 1\n Max Defense: 1",["Berries", 100], ["Wolf Meat", 40]]],
    ["Cooked Wolf Meat", ["Heals for 10 hp.",["Wolf Meat", 1]]],


    ["Iron Ingot", ["Material used to craft armor.", ["Iron Scraps", 10]]],


    ["Leather Helmet", ["Max HP: 1 \n Attack: 0 \n Defense: 1", ["Wolf Pelt", 5]]],
    ["Leather Armor", ["Max HP: 2 \n Attack: 1 \n Defense: 4", ["Wolf Pelt", 8]]],
    ["Leather Pants", ["Max HP: 2 \n Attack: 1 \n Defense: 3", ["Wolf Pelt", 6]]],
    ["Leather Gloves", ["Max HP: 0 \n Attack: 0 \n Defense: 1", ["Wolf Pelt", 4]]],
    ["Leather Shoes", ["Max HP: 0 \n Attack: 0 \n Defense: 1", ["Wolf Pelt", 4]]],
    ["Iron Helmet", ["Max HP: 4 \n Attack: 2 \n Defense: 4", ["Iron Ingot", 5]]],
    ["Iron Armor", ["Max HP: 10 \n Attack: 5 \n Defense: 10", ["Iron Ingot", 8]]],
    ["Iron Gloves", ["Max HP: 4 \n Attack: 2 \n Defense: 4", ["Iron Ingot", 6]]],
    ["Iron Pants", ["Max HP: 6 \n Attack: 3 \n Defense: 6", ["Iron Ingot", 4]]],
    ["Iron Shoes", ["Max HP: 4 \n Attack: 2 \n Defense: 4", ["Iron Ingot", 4]]],

])

export {itemMap, craftMap};