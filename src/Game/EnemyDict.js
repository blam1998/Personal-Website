//Skill map
//skill type --> heal, attack, debuff attack
//debuff type --> def, attack

//[skill type, .value(s) ]

//string: int

const wolfStat = new Map([
    ["Hp", 20],
    ["Def", 5],
    ["Atk", 12],
    ["Loot", new Map([
        ["Wolf Pelt", [100,1]],
        ["Wolf Meat", [100,1]]
    ])],
])

const goblinStat = new Map([
    ["Hp", 40],
    ["Def", 9],
    ["Atk", 18],
    ["Loot", new Map([
        ["Iron Scraps", [50,1]],
        ["Wolf Meat", [50,1]],
        ["Leather Helmet", [50,1]],
        ["Leather Armor", [50,1]],
        ["Leather Pants", [50,1]],
        ["Leather Gloves", [50,1]],
        ["Leather Shoes", [50,1]],
        ["Iron Helmet", [5,1]],
        ["Iron Gloves", [5,1]],
        ["Iron Shoes", [5,1]],
    ])],
])

const goblinChief = new Map([
    ["Hp", 60],
    ["Def", 15],
    ["Atk", 25],
    ["Loot", new Map([
        ["Iron Ingot", [50,1]],
        ["Wolf Meat", [50,1]],
        ["Leather Helmet", [50,1]],
        ["Leather Armor", [50,1]],
        ["Leather Pants", [50,1]],
        ["Leather Gloves", [50,1]],
        ["Leather Shoes", [50,1]],
        ["Iron Helmet", [15,1]],
        ["Iron Armor", [5,1]],
        ["Iron Pants", [10,1]],
        ["Iron Gloves", [15,1]],
        ["Iron Shoes", [15,1]],
        ["Lavish Meal", [10,1]],
    ])],
])

const goblinLord = new Map([
    ["Hp", 60],
    ["Def", 20],
    ["Atk", 55],
    ["Loot", new Map([
        ["Iron Ingot", [50,1]],
        ["Wolf Meat", [50,1]],
        ["Leather Helmet", [50,1]],
        ["Leather Armor", [50,1]],
        ["Leather Pants", [50,1]],
        ["Leather Gloves", [50,1]],
        ["Leather Shoes", [50,1]],
        ["Iron Helmet", [15,1]],
        ["Iron Armor", [5,1]],
        ["Iron Pants", [10,1]],
        ["Iron Gloves", [15,1]],
        ["Iron Shoes", [15,1]],
        ["Lavish Meal", [10,1]],
    ])],
])


const enemyDict = new Map([
    ["Wolf", wolfStat],
    ["Angry Wolf", wolfStat],
    ["Sad Wolf", wolfStat],
    ["Happy Wolf", wolfStat],
    ["Tommy", wolfStat],
    ["Mad Wolf", wolfStat],
    ["Crazy Wolf", wolfStat],
    ["League of Legends Player", wolfStat],
    ["Goblin", goblinStat],
    ["Goblin Chief", goblinChief],
    ["Goblin Lord", goblinLord], 

]);



export {enemyDict};

