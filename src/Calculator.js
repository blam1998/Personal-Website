import './Calculator.css';
import {Component} from 'react';


class Calculator extends Component{
    constructor(props){
        super(props);

        this.aiRankText = new Map([[1, "Exceptionally Weak"],
        [2,"Very Weak"], [3, "Weak"], [4, "Below Average"],
        [5, "Average"], [6, "Above Average"], [7, "Strong"],
        [8, "Very Strong"], [9, "Exceptionally Strong"]]);
        
        this.aiRank = [[0,184],[185,194],[195,203],[204,216],[217,224]
        ,[225,229],[230,233],[234,236],[237,240]];

        this.actSatMap = new Map([
            [11,620],[12,710],[13,750],[14,800],
            [15,850],[16,890],[17,930],[18,970],
            [19,1010],[20,1050],[21,1090],[22,1120],
            [23, 1150],[24, 1190],[25, 1230],[26, 1270],
            [27, 1300],[28, 1330],[29, 1380],[30, 1410],
            [31, 1440],[32, 1480],[33, 1510],[34, 1550],
            [35, 1590],[36, 1600]
            ]);
        
        this.gpaMap = new Map([
            ['1.5', 35], ['1.6', 40], ['1.7', 42], ['1.8', 44],
            ['1.9', 45], ['2.0', 46], ['2', 46], ['2.1', 47], ['2.2', 48],
            ['2.3', 49], ['2.4', 51], ['2.5', 53], ['2.6', 55],
            ['2.7', 57], ['2.8', 59], ['2.9', 61], ['3.0', 63], ['3', 63],
            ['3.1', 65], ['3.2', 66], ['3.3', 67], ['3.4', 68],
            ['3.5', 69], ['3.6', 70], ['3.7', 71], ['3.8', 73],
            ['3.9', 75], ['4.0', 77], ['4',77], ['4.1', 78], ['4.2', 79],
            ['4.3', 80], ['4.4', 80]
            ]);

        this.psatMap = new Map([
            [430, 1], [490, 2], [560, 3], [620, 4],
            [690, 5], [750, 6], [810, 7], [880, 8],
            [940, 9], [1010, 10], [1070, 11], [1130, 12],
            [1200, 13], [1260, 14], [1330, 15],
            [1390, 16], [1450, 17], [1520, 18]
            ]);

        this.scoreForm = this.scoreForm.bind(this);
        this.calculateScore = this.calculateScore.bind(this);
        this.convertGpaAi = this.convertGpaAi.bind(this);
        this.convertActSat = this.convertActSat.bind(this);
        this.calculateAiRank = this.calculateAiRank.bind(this);
        this.testInputCheck = this.testInputCheck.bind(this);
        this.gpaInputCheck = this.gpaInputCheck.bind(this);
        this.convertPsatSat = this.convertPsatSat.bind(this);
        this.psatChecker = this.psatChecker.bind(this);
        this.calculateSAT = this.calculateSAT.bind(this);
    }

    scoreForm(){
        const value = document.getElementById("test-select").value;

        let target2 = document.getElementById("test-score-div");
        
        let title = "Enter your " + value.toUpperCase() + " score.";
        
        if (document.getElementById("score-form")){
            document.getElementById("score-form").remove();
        }
        
        if (value === ""){ return;}
        
        const div = document.createElement("div");
        const content = document.createTextNode(title);
        const div_title = document.createElement("div");
    
    
        div_title.setAttribute("class", "score-form-title");
        div_title.appendChild(content);
        
        div.setAttribute("id","score-form");
        div.appendChild(div_title);
            
        const input = document.createElement("input")
        input.setAttribute("class", "score-input");
        input.setAttribute("id", "test-score-input");
        input.addEventListener("change",this.testInputCheck);
        
        if (value === "act"){
            input.setAttribute("placeholder", "Enter a value from 11 - 36");
            input.setAttribute("range", "11 - 36");
        }
        else if (value === "sat"){
            input.setAttribute("placeholder", "Enter your reading AND math SAT score. (0-1600)");
            input.setAttribute("range", "0 - 1600");
        }
        div.appendChild(input);
        
        const title2 = document.createTextNode("Enter your GPA.");
        const div2 = document.createElement("div");
        div2.setAttribute("class","score-form-title");
        div2.appendChild(title2);
        div.appendChild(div2);
        
        const input2 = document.createElement("input");
        input2.setAttribute("class", "score-input")
        input2.setAttribute("placeholder", "1.5 - 4.4");
        input2.setAttribute("id","gpa-input");
        input2.addEventListener("change",this.gpaInputCheck);
        div.appendChild(input2);
        
        const button = document.createElement("button");
        const button_title = document.createTextNode("Calculate Academic Index");
        button.setAttribute("class", "calculator-submit")
        button.appendChild(button_title);
        button.addEventListener("click",this.calculateScore);
        button.setAttribute("style", "display:block; margin-top: 10px;");
        div.appendChild(button);
        
        target2.appendChild(div);
    }

    calculateScore(){
        const target = document.getElementById("test-select");
        const testScore = document.getElementById("test-score-input").value;
        const gpaScore = document.getElementById("gpa-input").value;
        
        if (target.value === "sat" && (testScore > 1600 || testScore < 0 || !testScore)){
            return;
        } 
        
        else if (target.value === "act" && (testScore < 11 || testScore > 36 || !testScore)){
            return;
        }
        
        else if (!gpaScore || gpaScore < 1.5 || gpaScore > 4.4){
            return;
        }
        
        let ai = 0;
        
        ai += this.convertGpaAi(parseFloat(gpaScore).toFixed(1));
        
        if (target.value === "act"){
            ai += this.convertActSat(parseInt(testScore)) * .10;
        }
        else{
            ai += parseInt(testScore) * .10;
        }
    
        if (document.getElementById("result")){
            document.getElementById("result").value = ai;
            this.calculateAiRank(ai);
            return;
        }
        
        const title = document.createElement("div");
        const content = document.createTextNode("Your Academic Index Score.");
        title.appendChild(content);
        
        const readOnly = document.createElement("input");
        readOnly.setAttribute("readOnly", "");
        readOnly.setAttribute("id", "result");
        readOnly.setAttribute("class", "score-input");
        readOnly.value = ai;
        
        document.getElementById("gpa-input").after(readOnly);
        document.getElementById("result").before(title);
        this.calculateAiRank(ai);
    }

    convertGpaAi(){
        const gpa = document.getElementById("gpa-input");

        if (gpa.value < 1.5){
            return 35;
        }

        return this.gpaMap.get(gpa.value.toString());
    }

    convertActSat(value){

        return this.actSatMap.get(value);
    }

    calculateAiRank(){
        let target = document.getElementById("result");
        const value = target.value;
        let result = 0;
        for (let i = 0; i < this.aiRank.length; i++){
            if (this.aiRank[i][1] >= value){
                result = i + 1;
                break;
            }
        }
        
        if (document.getElementById("ar-result")){
            document.getElementById("ar-result").value = result + " (" + this.aiRankText.get(result) + ")";
            return;
        }
        
        const div = document.createElement("div");
        const title = document.createTextNode("Your Academic Index Rank (1 - 9).")
        div.appendChild(title);
        
        const input = document.createElement("input");
        input.setAttribute("readOnly","");
        input.setAttribute("id","ar-result");
        input.setAttribute("class", "score-input");
        input.value = result + " (" + this.aiRankText.get(result) + ")";
        
        target.after(input);
        target.after(div);
    }

    testInputCheck(){
        let targetType = document.getElementById("test-select").value;
        let currentTarget = document.getElementById("test-score-input");

        if (targetType === "default" || (targetType === "act" && currentTarget.value >= 11 && currentTarget.value <= 36) || (targetType === "sat" && currentTarget.value >= 0 && currentTarget.value <= 1600)){
            if (document.getElementById("test-score-error")){
                document.getElementById("test-score-error").remove();
            }
            return;
        }
        
        if (document.getElementById("test-score-error")){
            return;
        }
        
        if (targetType === "act"){
            const div = document.createElement("div");
            const title = document.createTextNode("Your ACT score must be within the range of 11 and 36.")
            div.appendChild(title);
            div.setAttribute("id", "test-score-error");
            div.setAttribute("class", "calculator-error-msg");
            currentTarget.after(div);
        }
        
        else{
            const div = document.createElement("div");
            const title = document.createTextNode("Your SAT Math + Sat Writing score must be within the range of 0 and 1600.")
            div.appendChild(title);
            div.setAttribute("id", "test-score-error");
            div.setAttribute("class", "calculator-error-msg");
            currentTarget.after(div);
        }
    }

    
    gpaInputCheck(){
        const currentTarget = document.getElementById("gpa-input");
        if (!currentTarget){ return; }
        if (currentTarget.value >= 1.5 && currentTarget.value <= 4.4){
            if (document.getElementById("gpa-error")){
                document.getElementById("gpa-error").remove();
            }
            return;
        }
        
        if (document.getElementById("gpa-error")){
            return;
        }
        
        const div = document.createElement("div");
        const title = document.createTextNode("Your GPA score must be within the range of 1.5 and 4.4.")
        div.appendChild(title);
        div.setAttribute("class", "calculator-error-msg");
        div.setAttribute("id", "gpa-error");
        currentTarget.after(div);
    }

    convertPsatSat(current){
        const psatBase = 400;

        if (document.getElementById("psat-sat-result")){
            document.getElementById("psat-sat-result").remove();
        }

        if (!this.psatChecker(document.getElementById("psat-score"))){
            return;
        }

        if (document.getElementById("psat-error")){
            document.getElementById("psat-error").remove();
        }
        
        
        let newString = current.value.toString().slice(0,-1) + "0";
        let newVal = parseInt(newString);
        
        let temp = newVal;
        
        while (temp > 400){
            if (this.psatMap.get(temp)){
                break;
            }
            temp -= 10;
        }
        
        let satScore = 0;
        if ((newVal === temp && newVal !== 400) || temp > 400){
            satScore = newVal - psatBase - (this.psatMap.get(temp) * 10) + 630;
        }
        else if (temp === 400){
            satScore = 630;
        }
        
        const targetToAppend = document.getElementById("psat-score");
        const div2 = document.createElement('div');
        div2.setAttribute("id", "psat-sat-result");
        const div = document.createElement("div");
        const title = document.createTextNode("Your SAT equivalent.");
        div.appendChild(title);
        
        const input = document.createElement("input");
        input.setAttribute("readonly","");
        input.setAttribute("class", "score-input");
        input.value = satScore;
        
        div2.append(div);
        div2.append(input);
        targetToAppend.after(div2);
    }

    psatChecker(current){
        if (!current.value){ return false; }
        
        if (current.value < 400 || current.value > 1520){
            if (document.getElementById("psat-error")){
                return false;
            }
            const div = document.createElement("div");
            const title = document.createTextNode("Your PSAT score must be within the range of 400 and 1520.");
            div.appendChild(title);
            div.setAttribute("class","calculator-error-msg");
            div.setAttribute("id", "psat-error");
            document.getElementById("psat-score").after(div);
            return false;
        }

        return true;
    }

    calculateSAT(target){
        if (document.getElementById("score-holder")){
            document.getElementById("score-holder").remove();
        }
        
        if (!target.value || target.value < 11 || target.value > 36){
            if (document.getElementById("act-error")){
                return;
            }
            const div = document.createElement("div");
            const title = document.createTextNode("Your ACT score must be within the range of 11 and 36.");
            div.appendChild(title);
            div.setAttribute("class", "calculator-error-msg");
            div.setAttribute("id", "act-error");
            document.getElementById("act-sat-input").after(div);
            return;
        }
        
        if (document.getElementById("act-error")){
            document.getElementById("act-error").remove();
        }
        
        const targetToAppend = document.getElementById("act-sat-input");
        
        const divHolder = document.createElement("div");
        divHolder.setAttribute("id", "score-holder");
        
        const div = document.createElement("div");
        const content = document.createTextNode("Your SAT Equivalent.")
        
        div.appendChild(content);
        
        const inputRead = document.createElement("input");
        inputRead.setAttribute("readonly", "");
        inputRead.setAttribute("class", "score-input");
        inputRead.value = this.convertActSat(parseInt(target.value));
        
        divHolder.appendChild(div);
        divHolder.appendChild(inputRead);
        targetToAppend.after(divHolder);
    }

    
    render(){
        return(
            <div className = "calculator-div">
                <div className = "fieldset-div">
                    <fieldset className = "aci-div">
                        <legend style = {{border: "1px solid black", padding: "4px 4px 4px 4px", fontWeight: "bold", fontSize: "1.5rem"}} >Test Score To Academic Index</legend>
                            <div id = "test-score-div">
                                <div>
                                    Your SAT Math and Reading score or your ACT composite
                                </div>
                                <select onChange = {() => this.scoreForm()} id = "test-select" class = "calculator-select">
                                    <option value = "">Pick ACT or SAT</option>
                                    <option value = "act">ACT</option>
                                    <option value = "sat">SAT</option>
                                </select>
                            </div>
                    </fieldset>
                </div>
                <div className = "fieldset-div">
                    <fieldset className = "aci-div">
                        <legend style = {{border: "1px solid black", padding: "4px 4px 4px 4px", fontWeight: "bold", fontSize: "1.5rem"}} >PSAT to SAT Conversion</legend>
                        <div id = "psat-sat-div">
                            <div>Enter your PSAT score.</div>
                            <input placeholder = "400-1520" class = "score-input" id = "psat-score"/>
                            <button onClick = {() => this.convertPsatSat(document.getElementById("psat-score"))} class = "calculator-submit">Convert</button>
                        </div>
                    </fieldset>
                </div>
                <div className = "fieldset-div">
                    <fieldset className = "aci-div">
                        <legend style = {{border: "1px solid black", padding: "4px 4px 4px 4px", fontWeight: "bold", fontSize: "1.5rem"}}>
                            ACT to SAT
                        </legend>
                        <div id = "act-sat-div">
                            <div>
                                Enter your ACT score.
                            </div>
                            <input class = "score-input" placeholder = "11 - 36" id = "act-sat-input"/>
                            <button onClick = {() => this.calculateSAT(document.getElementById("act-sat-input"))} class = "calculator-submit">
                                Convert
                            </button>
                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }
}

export default Calculator;