import './CollegeMatcher.css';
import {Component} from 'react';

const college0 = new Map([
    ["NE", "College of the Atlantic, Salisbury, Simmons, St. Anselm, St. Michael’s"],
    ["M-A/NYPA", "Adelphi, Allegheny, Juniata, Marymount Manhattan, Pace U, St. John’s U, Susquehanna, Ursinus, Wagner, Washington College"],
    ["Midwest", "Bradley, U Cincinnati, Cornell College, John Carroll, U Kansas, U Missouri, U Nebraska, Ohio U, Ripon, Xavier U (OH)"],
    ["South", "Agnes Scott, Clark Atlanta, Eckerd, Flagler, FL International, Guilford, High Point, Hollins, Loyola New Orleans, RandolphMacon, Roanoke, Stetson, Xavier (LA)"],
    ["Southwest", "Arizona State, U Houston, U New Mexico, Northern Arizona, U Oklahoma"],
    ["West", "Alaska Pacific, Cal Lutheran, Evergreen State (WA), Fort Lewis, Hawaii Pacific, U Hawaii-Manoa, Humboldt State (CA), College of ID, U of La Verne, Linfield, Mills College, Montana State, U Montana, U Northern Colorado, U North Texas, Pacific U, Pacific Lutheran, Regis, U Utah, Western State-CO, Whittier, U Wyoming"]
    ]);

const college1 = new Map([
    ["NE", "Bennington, Bentley, Bryant U, Champlain, Clark U, Fairfield U, Hampshire, U New Hampshire, U Mass, Providence, Quinnipiac, Salve Regina, Wheaton College (MA)"],
    ["M-A/NYPA", "Clarkson U, Drew U, Drexel, Eugene Lang, Fordham, Goucher, Hampton, Hobart & William Smith, Hofstra, Howard, Ithaca College, Marist, McDaniel, Muhlenberg, Sarah Lawrence, St. John’s College (MD), St. Lawrence, Temple, Union College "],
    ["Midwest", "Beloit, Creighton, Denison, DePaul, DePauw, Earlham, Gustavus Adolphus, Hope College, IL Wesleyan, Indiana U, LakeForest, Kalamazoo,  Knox, Loyola Chicago, Marquette , Miami U of Ohio, Ohio State, Ohio Wesleyan, Purdue, St. Olaf, Wittenberg, College of Wooster"],
    ["South", "Auburn, Belmont, Birmingham-Southern, Centre, College of Charleston, Furman, James Madison, Millsaps, Morehouse, Old Dominion, Rollins, Spelman, Tampa"],
    ["Southwest", "U of Arizona, Austin College, Baylor U, Hendrix, Southwestern U, St. Edward’s (TX), St. John’s College (NM)"],
    ["West", "Chapman U, U Colorado- Boulder, Colorado State U, Loyola Marymount, St. Mary’s of CA, U of the Pacific, U Portland, U Redlands, U San Francisco, Seattle U, Western Washington U, Willamette"],
    ["Other", "Franklin U of Switzerland, Quest University, Simon Fraser (Canada)"]
    ]);
    
const college2 = new Map([
    ["NE", "Emerson, Holy Cross, Mount Holyoke, U Vermont"],
    ["M-A/NYPA", "American U, Bard, U Delaware, Dickinson, Franklin & Marshall, Gettysburg, U Maryland, U Pittsburgh, Rensselaer Polytechnic (RPI), Rochester Inst. of Tech (RIT), Skidmore, Stevens Inst. of Tech, Syracuse"],
    ["Midwest", "Lawrence U, U Minnesota, Rose-Hulman, St Louis U"],
    ["South", "U Alabama, Clemson, Elon, Oxford College of Emory, Rhodes College, U of the South (Sewanee), Virginia Tech"],
    ["Southwest", "SMU, TCU, Trinity U-TX"],
    ["West", "Brigham Young, Cal Poly-SLO, CO School of Mines, U Denver, Gonzaga, Lewis & Clark, U Puget Sound, Whitman"],
    ["Other", "U British Columbia, University College-Dublin (Ireland), U Edinburgh, U Glasgow, U of St Andrews (Scotland), U Toronto"],
    ]);

const college3 = new Map([
    ["NE", "Babson, Bates, Brandeis, Colby, Connecticut College, Northeastern, Smith, Trinity College, Worcester Polytechnic (WPI)"],
    ["M-A/NYPA", "Barnard, Bucknell, Bryn Mawr, Colgate, George Washington, Hamilton, Lafayette, Lehigh, U Rochester, USMA-West Point, US Naval Academy, Villanova"],
    ["Midwest", "Case Western Reserve, Grinnell, Kenyon, Oberlin, Macalester, U Wisconsin"],
    ["South", "U Florida, U Georgia, U Miami, U Richmond, Wake Forest, Washington & Lee"],
    ["Southwest", "Texas A&M"],
    ["West", "UC-Santa Barbara, Occidental, Pepperdine, Pitzer, Reed, U San Diego, Santa Clara, Scripps, U Washington, US Air Force Academy"],
    ["Other", "Durham U (UK), McGill (Canada), Trinity College-Dublin (Ireland)"]
    ]);

const college4 = new Map([
    ["NE", "Boston College, Boston U, Bowdoin, Middlebury, Olin, Tufts U, Wesleyan U, Wellesley"],
    ["M-A/NYPA", "Carnegie Mellon, Haverford, NYU, Swarthmore, Vassar"],
    ["Midwest", "Carleton, U Michigan, Notre Dame, Washington U St Louis"],
    ["South", "Davidson, Emory, Georgia Tech, UNC-Chapel Hill, Tulane, U Virginia, William & Mary"],
    ["Southwest", "U Texas-Austin"],
    ["West", "Cal-Berkeley, UCLA, UCSD, Claremont McKenna, Colorado College, Harvey Mudd, USC"]
    ]);

const college5 = new Map([
    ["NE", "Amherst, Brown U, Dartmouth, Harvard, MIT, Williams, Yale"],
    ["M-A/NYPA", "Columbia U, Cornell U, Georgetown, Johns Hopkins, U Penn, Princeton"],
    ["Midwest", "U Chicago, Northwestern"],
    ["South", "Duke U, Vanderbilt U"],
    ["Southwest", "Rice U"],
    ["West", "Cal Tech, Pomona, Stanford"],
    ["Other", "NYU-Abu Dhabi, Oxford, Cambridge, Minerva, Yale-NUS"]
    ]);
    
const collegeArray = [college0, college1, college2, college3, college4, college5];

class CollegeMatcher extends Component{
    constructor(props){
        super(props);

        this.match = this.match.bind(this);
    }

    match(){
        const region = document.getElementById("region-select").value;
        const score = document.getElementById("score-select").value;

        if (!region || !score){
            return;
        }
        
        var belowMatch = "";
        var onMatch = "";
        
        for (let i = 0; i < parseInt(score); i++){
            if (collegeArray[i].has(region.toString())){
                belowMatch = belowMatch.concat(", " ,collegeArray[i].get(region.toString()));
            }
        }
        
        if (collegeArray[parseInt(score)].has(region.toString())){
            onMatch = onMatch.concat(collegeArray[parseInt(score)].get(region.toString()));
        }
        
        if (document.getElementById("below-div")){
            document.getElementById("below-div").remove();
        }
        
        if (document.getElementById("on-div")){
            document.getElementById("on-div").remove();
        }
        
        const belowTarget = document.getElementById("likely-colleges");
        const belowDiv = document.createElement("div");
        belowDiv.setAttribute("id","below-div");
        belowDiv.setAttribute("class", "college-match-result");
        
        const onTarget = document.getElementById("matching-colleges");
        const onDiv = document.createElement("div");
        onDiv.setAttribute("id", "on-div");
        onDiv.setAttribute("class", "college-match-result");
        
        //Cleaning string and adding div.
        if (belowMatch){
            belowMatch = belowMatch.substring(2);
            belowDiv.appendChild(document.createTextNode(belowMatch));
            belowTarget.appendChild(belowDiv);
        }
        else{
            belowDiv.appendChild(document.createTextNode("No colleges fit in this category."));
            belowTarget.appendChild(belowDiv);
        }
        
        if (onMatch){
            onDiv.appendChild(document.createTextNode(onMatch));
            onTarget.appendChild(onDiv);
        }
        
        else{
            onDiv.appendChild(document.createTextNode("No colleges fit in this category."));
            onTarget.appendChild(onDiv);
        }
        
        if (belowTarget.style.display === "none"){
            belowTarget.style.display = "block";
        }
        
        if (onTarget.style.display === "none"){
            onTarget.style.display = "block";
        }
    }

    render(){
        return(
            <div>
            <fieldset className = "college-matching-field">
                <legend style = {{border: "1px black solid", padding: "4px 4px 4px 4px", fontWeight: "bold", backgroundColor:"white" }}>
                    College Matching
                </legend>
                <select id = "region-select" className = "college-select">
                    <option value = "">Select a region</option>
                    <option value = "NE">North East</option>
                    <option value = "M-A/NYPA">M-A/ NYPA</option>
                    <option value = "Midwest">Midwest</option>
                    <option value = "South">South</option>
                    <option value = "Southwest">Southwest</option>
                    <option value = "West">West</option>
                    <option value = "Other">Other</option>
                </select>
                <select id = "score-select" className = "college-select">
                    <option value = "">Select your GPA, SAT Total Score (0-1600), ACT Score</option>
                    <option value = "0">Under 3.0 GPA, 1050+ SAT, 23+ ACT</option>
                    <option value = "1">3.0 - 3.4 GPA, 1100+ SAT, 25+ ACT</option>
                    <option value = "2">3.5 - 3.6 GPA, 1200+ SAT, 27+ ACT</option>
                    <option value = "3">3.7 - 3.8 GPA, 1300+ SAT, 30+ ACT</option>
                    <option value = "4">3.9 - 4.0 GPA, 1400+ SAT, 32+ ACT</option>
                    <option value = "5">4.0+ GPA, 1500+ SAT, 33 ACT</option>
                </select>
                <div id = "likely-colleges" style = {{display: "none"}}>
                    <h2 style = {{padding: "4px 4px 4px 0px", fontWeight: "bold"}} className = "college-match-h2">Colleges that will likely accept you</h2>
                </div>
                <div id = "matching-colleges" style = {{display: "none"}}>
                    <h2 style = {{padding: "4px 4px 4px 0px", fontWeight: "bold"}} className = "college-match-h2">
                        Colleges that matches your score
                    </h2>
                </div>
                <button style = {{marginTop: "10px"}} onClick = {() => this.match()} className = "college-button">Match</button>
            </fieldset>
        </div>
          )
    }
}


export default CollegeMatcher;