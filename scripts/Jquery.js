//const { on } = require("nodemon");
//import {myVar} from "./Test.js";

function createElement(tag,content,attrs){
    /*
    tag: type of the tag. E.g: p,h1,b
    content: What goes in between the tags. E.g: <b> Content </b>
    attrs: href:, src:, etc. (Must be array)
    */
    var e = ""
    var elem = '<' + tag + '></' + tag + '>'
    if (attrs !== undefined){
        e = $(elem).attr(attrs)
        e.append(content)
    }

    return e ? e : "<" + tag + ">" + content + "</" + tag + '>';
}

function createUrl(foodName){
    var apiKey = "DEMO_KEY";
    const front = "https://api.nal.usda.gov/fdc/v1/foods/search?query=";
    const back = "&dataType=Branded&pageSize=5&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&api_key=";
    foodName = foodName.replace(" ","%20");
    return front + foodName + back + apiKey;
}

String.prototype.replaceAt = function(index,replacement){
    return this.substring(0,index) + replacement + this.substring(index + 1,this.length);
}

String.prototype.isspace = function(){
    for (i = 0; i < this.length; ++i){
        if (this[i] !== " "){
            return false;
        }
    }

    return true;
}
function stringFixer(string){
    string = string.toLowerCase();
    if (string[0] !== "null"){
        string = string.replaceAt(0,string[0].toUpperCase());
    }
    else{
        return "";
    }


    for (i = 1; i < string.length; ++i){
        if (string[i-1] == ' '){
            string = string.replaceAt(i,string[i].toUpperCase());
        }
    }
    return string;
}

/*
foodArray:
description: #product name (string)
packageWeight: #weight (string)
servingSize: (int)
servingSizeUnit: (string)
foodNutrients: #nutrients (array)
    -nutrientName
    -percentDailyValue
    -value
    -unitName
ingredients: #list of ingredients (string)
*/

function addFood(foodArray){

    if (!foodArray.length){
        $(createElement("div",$(".fname").innerHTML + "Does not exist in database.",{"class":"errorDNE"})).appendTo(".collapsible");
        return;
    }

    foodArray.forEach(element =>{
        var header = $(createElement("h4","",{"class":"headerCollapsible"})).appendTo(".collapsible");
        var div = $(createElement("div","",{"class":"divCollapsible", "style":"display: none;"})).appendTo(".collapsible");

        //Name
        $(createElement("a",stringFixer(element.description),{"href":"#", "class":"collapsibleA"})).appendTo(header);
        $(createElement("div","Nutrition Facts",{"class":"title"})).appendTo(div);
        $(createElement("div",stringFixer(element.description)),{"class":"name"}).appendTo(div);
        
        var servingDiv = $(createElement("div","",{"class":"servingSizeDiv"}));
        servingDiv.appendTo(div);

        $(createElement("div","Serving Size: " + element.servingSize.toString() + " " + element.servingSizeUnit,{"class":"servingSizeName"})).appendTo(servingDiv);

        $(createElement("hr","",{"class":"bar1"})).appendTo(div);

        $(createElement("div","Amount per Serving"),{"class":"amountPerServing"}).appendTo(div);

        $(createElement("hr","",{"class":"bar2"})).appendTo(div);

        
        element.foodNutrients.forEach(nutrient =>{
            $(createElement("div",nutrient.nutrientName + ": " + nutrient.value.toString() + " " + nutrient.unitName, {"class":"nutrient"})).appendTo(div);
        });

        $(createElement("hr","",{"class":"bar1"})).appendTo(div);
        $(createElement("div","Ingredients",{"class":"ingredientTitle"})).appendTo(div);
        $(createElement("div",stringFixer(element.ingredients)),{"class":"ingredient"}).appendTo(div);

    });
}


function Test(){
    $.ajax
    ({
        type: 'POST',
        url: '/Foods',
        data: {name:"Kazekito"},
        contentType: 'application/json',
        datatype: 'json',
        success : function(){
            console.log("Post successful");
        },
        error : function(){
            console.log("Post failed");
        }
    })

}

function searchFood(){
    var input = document.getElementById("fname").value;

    //If input is blank or filled with whitespace, do nothing.
    //Else search the database for the food name.
    if (input.length === 0 || input.isspace()){
        return;
    }

    let newUrl = createUrl(input);
    let foodArr = new Array();
    $.ajax
    ({
        type: 'GET',
        url: newUrl,
        dataType: "json",
        success : function(dict){
            dict.foods.forEach(element => {
                foodArr.push(element);
            });
            console.log(foodArr);
            //fs.writeFileSync("../data.json",dict,'utf-8');
            addFood(foodArr);
        },
        error : function(){
            alert("Error: failed to get data from database.");
        }
    });
}

/*
Used to manipulate html text
*/
$(document).on("ready",function(){
});

$("#btn2").on("click",function(){
    Test();
});

$("#btn1").on("click",function(){
    if($(".collapsible").length){
        $(".collapsible").empty();
    }
    searchFood();
})

$(".collapsible").on("click","a",function(e){
    e.preventDefault();
    var nextDiv = $(this).parent().next("div");
    if (nextDiv.is(":visible")){
        nextDiv.hide();
    }
    else{
        nextDiv.show();
    }
});