
import Entity from './Entity';

class Character extends Entity{
    constructor(stats, inventory, equipment, name){
        //stats = [hp, attack, defense]
        super(stats, name);

        //Map (String : Object)
        this._inventory = inventory;
        this._inventoryMap = new Map([]);

        const temp = [];
        this._inventory.forEach((value,key) => {
            temp.push([key, value.getQuantity()])
        });

        for (let i = 0; i < temp.length; i++){
            this._inventoryMap.set(temp[i][0], temp[i][1]);
        }

        //Array[Object](5)
        //Helmet, Armor,...., Shoes
        this._equipment = equipment;

        this.slotMap = new Map([
            ["Helmet", 0], ["Armor", 1], ["Gloves", 2], ["Pants", 3], ["Shoes", 4]
        ])

        this.setInventory = this.setInventory.bind(this);
        this.getInventory = this.getInventory.bind(this);
        this.setEquipment = this.setEquipment.bind(this);
        this.getEquipment = this.getEquipment.bind(this);
        this.useItem = this.useItem.bind(this);
        this.unequipItem = this.unequipItem.bind(this);
        this.addItemToInventory = this.addItemToInventory.bind(this);
    }
    //[0 or 1, string, int]
    setInventory(arrayObj){
        if (arrayObj[0] === 1){
            if (this._inventory.has(arrayObj[1])){
                this._inventory.get(arrayObj[1]).set(arrayObj[1], this._inventory.get(arrayObj[1]) + arrayObj[2]);
            }
        }

        if (arrayObj[0] === 0){
            if (!this._inventory.has(arrayObj[1])){
                return;
            }

            this._inventory.get(arrayObj[1]).set(arrayObj[1], this._inventory.get(arrayObj[1]) - arrayObj[2]);
        }
    }

    getInventory(){
        return this._inventory;
    }


    setInventoryMap(arrayObj){
        this._inventoryMap = arrayObj;
    }

    getInventoryMap(){
        return this._inventoryMap;
    }

    addInventoryMap(itemName, value){

        if (this._inventoryMap.has(itemName)){
            const currVal = this._inventoryMap.get(itemName);
            this._inventoryMap.set(itemName, currVal + value);
            return;
        }

        this._inventoryMap.set(itemName, value);
    }

    subtractInventoryMap(itemName, value){
        const currVal = this._inventoryMap.get(itemName);
        this._inventoryMap.set(itemName, currVal - value);

        if (this._inventoryMap.get(itemName) <= 0){
            this._inventoryMap.delete(itemName);
        }
    }

    setEquipment(arrayObj){
        this._equipment = [...arrayObj];
    }

    getEquipment(){
        return this._equipment;
    }

    useItem(item){
        const value = item.getValue();

        if (value[3] > 0){
            //If food over-heals
            if ((this.getHp() + value[3]) > this.getMaxHp()){
                this.setHp(this.getMaxHp());
            }
            //Add hp normally
            else{
                this.setHp(this.getHp() + value[3])
            }
        }
        if(value[4] > 0){
            this.setMaxHp(this.getMaxHp() + value[4]);
        }
        if (value[5] > 0){
            this.setAttack(this.getAttack() + value[5]);
        }
        if (value[6] > 0){
            this.setDefense(this.getDefense() + value[6]);
        }

        const newItem = this._inventory.get(item.getName());
        newItem.setQuantity(item.getQuantity() - 1);
        this._inventory.set(item.getName(), newItem);

        this.subtractInventoryMap(item.getName(), 1);

        if (item.getQuantity() <= 0){
            this.getInventory().delete(item.getName());
        }
    }

    addItemToInventory(item, amount){
        if (!item){return;}

        if (this.getInventory().has(item.getName())){
            var currTarget = this.getInventory().get(item.getName());
            currTarget.addQuantity(amount);
            this.getInventory().set(item.getName(),currTarget);
        }
        else{
            item.setQuantity(amount);
            this.getInventory().set(item.getName(), item);
        }

        this.addInventoryMap(item.getName(), amount);
    }

    subtractItemFromInventory(itemName, amount){
        if (!this._inventory.has(itemName)){
            return;
        }

        this._inventory.get(itemName).setQuantity(this._inventory.get(itemName).getQuantity() - amount);

        if (this._inventory.get(itemName).getQuantity() <= 0){
            this._inventory.delete(itemName);
        }
    }


    Die(){
        const equip = this.getEquipment();
        for (let i = 0; i < 5; i++){
            if (!equip[i]){ continue; }
            const hp = equip[i].getValue()[0];
            const atk = equip[i].getValue()[1];
            const def = equip[i].getValue()[2];

            this._maxHp = this._maxHp - hp;
            this._attack = this._attack - atk;
            this._defense = this._defense - def;
        }

        this._maxHp = this._maxHp > 0? this._maxHp - 1 : 0;
        this._attack = this._attack > 0? this._attack - 1 : 0;
        this._defense = this._defense > 0? this._defense - 1: 0;

        this.setEquipment([null,null,null,null,null]);
    }

    //slot is equipment index 
    //equipment --> array[Item]
    unequipItem(slot){
        //Item object

        var currEquip = this.getEquipment()[slot];
        const value = currEquip.getValue();

        //hp, atk, def, heal, hp+, atk+, def+
        //subtract stats from player
        this.setMaxHp(this.getMaxHp() - value[0]);
        this.setAttack(this.getAttack() - value[1]);
        this.setDefense(this.getDefense() - value[2]);


        //remove the item
        const equipArray = this.getEquipment();
        equipArray[slot] = null;
        this.setEquipment(equipArray);

        //add item to inventory
        this.addItemToInventory(currEquip, 1);
        this.addInventoryMap(currEquip.getName(), 1);

    }

    equipItem(item){
        const value = item.getValue();
        const slot = item.getSlot();

        //if equipment slot is taken, unequip item.
        if (this.getEquipment()[this.slotMap.get(slot)]){
            this.unequipItem(this.slotMap.get(slot));
        }

        //copy current equipment and replace equipment slot with the new equipment
        const currEquipment = this.getEquipment();
        let array = [...currEquipment];
        array[this.slotMap.get(slot)] = item;
        
        

        this.setEquipment(array);
        

        //Add equipment stats as psuedo equiping mech.
        this.setMaxHp(this.getMaxHp() + value[0]);
        this.setAttack(this.getAttack() + value[1]);
        this.setDefense(this.getDefense() + value[2]);

        if (this.getMaxHp() <= this.getHp()){
            this.setHp(this.getMaxHp());
        }

        //remove item from inventory
        this._inventory.get(item.getName()).setQuantity(this._inventory.get(item.getName()).getQuantity() - 1);

        if (this._inventory.get(item.getName()).getQuantity() <= 0){
            this._inventory.delete(item.getName());
        }

        this.subtractInventoryMap(item.getName(), 1);
    }
}

export default Character;