import * as React from "react";
import MapList from "./components/mapList";
import ShowInfo from "./showInfo";
import "./css/showList.css"
//Iprops
interface IProps {
  app?:any
}


//state interface
interface IState {
  showInfo?: boolean
}

/**
 * show a list of all the data,
 * Show an info list
 */
export default class ShowList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    
    this.state={
    }
  }

  render() {
    const props = {app:this.props.app};
    return (
      <div className="listContainer">
        <div className="listItems">
       <div className="listContainerText">List / <p className="text" style={{fontSize:"22px", margin:"0px", marginLeft:"5px"}}>{props.app.state.switchCase}</p></div>
       <div  className="topListItem"><div className="listContainerText">Name</div> <div className="listContainerText">#  of Films</div></div>
       <MapList {...props} />
       </div>
       {this.props.app.state.showItem&&(<ShowInfo {...props}/>)}
      </div>
    );
  }
}