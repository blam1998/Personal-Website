import {ItemBox} from "./ItemBox";
import {ItemBoxFrame} from './ItemBoxFrame';
import {Inprogress, Completed} from './Inprogress';


/*ItemBox
    Props: {
        ProjectName
        Date
        Summary
        ShortDescription
    }
*/

/*ItemBoxFrame
    props = {
        ItemBox
        Id
        Title
        Image
    }
*/


const InprogressStorage = []
const CompletedStorage = []

function CreateItem(Data, Storage){
    Data.map((element,index) =>{
        Storage.push(<ItemBoxFrame ItemBox = {<ItemBox ProjectName = {element.ProjectName} Date = {element.Date} Summary = {element.Summary} 
            ShortDescription = {element.ShortDescription} Github = {element.Github}
             Id = {element.Id} Languages = {element.Languages}
             VideoSrc = {element.VideoSrc} />} Id = {element.Id} Title = {element.ProjectName} Image = {element.Image} Demo = {element.Demo}/>)
    })
}

CreateItem(Inprogress, InprogressStorage);
CreateItem(Completed, CompletedStorage);

export {InprogressStorage as InprogressStorage, CompletedStorage as CompletedStorage}