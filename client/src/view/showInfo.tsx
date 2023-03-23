import * as React from "react";
import BaseClass from "../models/myComponents";


//Iprops
interface IProps {
  app?:any
}


//state interface
interface IState {
  showInfo?: string
}

/**
 * Show all the info of the current Item
 */
export default class ShowInfo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    
    this.state={
    }
  }

  render() {

    const app = this.props.app;
    let currentItem = app.state.showItem;
    let doNotDisplay= ["type", "_id", "created", "edited", "url", "films", "homeworld", "species","vehicles", "starships"];
    return (
      <div className="info scroller" style={{height:'500x', paddingTop:"5px", }}>
        <div  className=" scroller">
        <div className="infoText" style={{width:"100%", }}>Info:</div>
        
        {Object.keys(currentItem.getJson()).filter((key:string)=>{return (!doNotDisplay.includes(key))}).map((key:any, index:number)=>
        <div className="listItem" style={{borderBottom:"none", cursor:"auto"}} key={index}>
          {key}: {currentItem.getJson()[key]}
        </div>
        )}
       
       </div>
      </div>
    );
  }
}