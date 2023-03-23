import * as React from "react";
import Factory from "./models/factory";
import ComponentList from "./models/componentList";
import { forFactory } from "./models/myComponents";
import { Auth } from "./services/authService";
import LoadingScreen from "./view/loadingScreen";
import StarWarsDash from "./view/starWarsDash";
import Background from "./assets/starwarsBack.jpg"
import "./App.css"

//Iprops
interface IProps {
}


//state interface
interface IState {
  factory?: Factory,
  componentList?: ComponentList,
  auth?: Auth,
  start: boolean,
  showContent?: boolean
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.dispatch = this.dispatch.bind(this);
    this.state={
      start:false
    }
  }

  /**
   * On mount set up a couple of extremely useful tools for separation of services and components
   */
  async componentDidMount(): Promise<void> {
    //set up the factory with your components in models
    let factory = new Factory();
    let obj: any = await forFactory();
    for (const key in obj) {
      factory.registerComponents({ name: key, component: obj[key] });
    }
    //Set up the componentList to be used with the factory
    let componentList = new ComponentList(factory);
    //set up auth and get all the data from the backend when this is done start will be set to true.
    let auth = new Auth(componentList);
    
    //make these components available in state.
    this.setState({ factory: factory, componentList: componentList, auth: auth, });
  }

  /**
   * 
   * @param obj 
   * provide a way to change global state.
   */
  dispatch(obj: any) {
    this.setState({ ...obj });
  }

  render() {
    // send dispatch and state as props.
    const props = {app:{state:this.state, dispatch:this.dispatch}}
    return (
      <div className="fullScreen">
        <img className="imageBackground" src={Background}/>
         {!this.state.showContent&&(
        <div className="startButton startText" onClick={()=>{
          this.setState({showContent:true});
          //start getting the data
          if(this.state.auth!==undefined){
            this.state.auth.getAlltheData(this.dispatch);
          }
          
        }}> Star Wars API Go!</div>)}
        {this.state.showContent&&(
        <>
        {!this.state.start ? (<LoadingScreen />) : (<StarWarsDash {...props} />)}
        </>)}
      </div>
    );
  }
}