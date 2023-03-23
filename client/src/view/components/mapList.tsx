import * as React from "react";
import BaseClass from "../../models/myComponents";
import "../css/showList.css"

//Iprops
interface IProps {
  app?:any
}


//state interface
interface IState {
  
}

/**
 * Create a map that can handle different cases.
 */
export default class MapList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    
    this.state={
    }
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let switchCase = state.switchCase;
    //use the componentList to seemlessly gather a list together
    let mapList = state.componentList.getList(switchCase);
    
    return (
      <div className="list scroller" style={{height:'500px'}}>
        
       {mapList.map((listItem:BaseClass, index:number)=>
       <div className="listItem" key={index}>
            <div className="films" onClick={()=>{app.dispatch({showItem:listItem})}}>
                {listItem.getJson().name}
            </div>
            <div style={{marginRight:"40px"}}>
            {listItem.getJson().films?.length}
            </div>
       </div>
       )}
       
      </div>
    );
  }
}