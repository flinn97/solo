import * as React from "react";
import ShowList from "./showList";
import './css/starWarsDash.css'

//Iprops
interface IProps {
  app?:any
}


//state interface
interface IState {
 switchCase?: string
}

/**
 * The dashboard after all the data was loaded
 */
export default class StarWarsDash extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    
    this.state={
    }
  }

  render() {
    const props = {app: {...this.props.app, state:{...this.props.app.state, switchCase:this.state.switchCase}}};
    return (
      <div className="container">
       <div className="text">Star Wars API</div>
       <div className="selectList">
       <div className="selectListItem" onClick={()=>{this.setState({switchCase:"people"})}}>People</div>
       <div className="selectListItem" onClick={()=>{this.setState({switchCase:"planets"})}}>Planets</div>
       </div>
       {this.state.switchCase && (<ShowList {...props} />)}
      </div>
    );
  }
}