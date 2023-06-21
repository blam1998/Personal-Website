import './Quicksort.css';
import {Component} from 'react';


class Quicksort extends Component{
    constructor(props){
        super(props);
        this.input = [];
        this.generateArray = this.generateArray.bind(this);
        this.solve = this.solve.bind(this);
        this.quicksort = this.quicksort.bind(this);
        this.partition = this.partition.bind(this);
        this.generateRandomArray = this.generateRandomArray.bind(this);
        this.clean = this.clean.bind(this);
    }

    clean(){
        const target = document.getElementsByClassName("Quicksort-Main-Div")[0];
        //const child = document.getElementsByClassName('Quicksort-Element-Container');
        let child = target.lastElementChild;

        if (!child){return;}

        while (child && child.className !== "Quicksort-Button"){
            target.removeChild(child);
            child = target.lastElementChild;
        }
    }

    generateRandomArray(){
        this.input = [];
        for (var i = 0; i < 8; i++){
            this.input.push(Math.floor(Math.random() * 10));
        }
    }

    quicksort(array, low, high){

        if (low < high){
            var pi = this.partition(array,low,high);
            this.quicksort(array, low, pi - 1);
            this.quicksort(array, pi + 1, high);
        }

    }

    partition(array, low, high){
        var pivot = array[high];

        var i = (low - 1);

        for (var j = low; j < high; j++){
            if (array[j] <= pivot){
                i = i + 1
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                this.generateArray(array, j, i);
            }
        }

        var temp2 = array[high];
        array[high] = array[i+1];
        array[i+1] = temp2;

        this.generateArray(array, i + 1, high);

        return (i + 1);
    }

    solve(){

        this.quicksort(this.input,0,this.input.length - 1);

    }

    generateArray(array, curr, swap){
        const target = document.getElementsByClassName("Quicksort-Main-Div")[0];


        const result = document.createElement('div');
        result.setAttribute('class', 'Quicksort-Element-Container');

        array.map((x,i) => {
            var temp1 = document.createElement('span');
            temp1.setAttribute('class', 'Quicksort-Element');
            if (curr >= 0 && swap >= 0){
                if (i === curr){
                    temp1.classList.add("Curr");
                }
                if (i === swap){
                    temp1.classList.add("Swap");
                }
            }
            if (i === array.length - 1){
                temp1.classList.add('Pivot');
            }
            temp1.innerHTML = x.toString();
            result.appendChild(temp1);
        })
        target.appendChild(result);
    }

    render(){
        return(
            <div className = "Quicksort-Main-Div">
                <div className = "Quicksort-Legend">
                    <div className = "Quicksort-Legend-Color">
                        <div className = "QS-Color Green"></div>
                        <div>Element to Swap with Orange</div>
                    </div>

                    <div className = "Quicksort-Legend-Color">
                        <div className = "QS-Color Orange"></div>
                        <div>Element to compare with Pivot</div>
                    </div>

                    <div className = "Quicksort-Legend-Color">
                        <div className = "QS-Color Blue"></div>
                        <div>Pivot</div>
                    </div>
                </div>
                <button className = "Quicksort-Button" onClick = {() => {this.generateRandomArray(); this.clean(); this.solve();}}>Visualize and Solve Random Array</button>
            </div>
        )
    }
}

export default Quicksort;