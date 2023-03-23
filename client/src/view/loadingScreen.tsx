import * as React from "react";
import "./css/loadingScreen.css"

//Iprops
interface IProps {
  app?:any
}


//state interface
interface IState {
  text?: string
}

export default class ShowInfo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    
    this.state={
      text:"loading"
    }
  }

  /**
   * Create some cool UI for the loading screen while the api does its thing
   */
  async componentDidMount(): Promise<void> {
    if(this.state.text){
      while(true){
        let textObj:any ={
          loading: 'loading.',
          ['loading.']: "loading..",
          ['loading..']: "loading...",
          ['loading...']: "loading",

        }

        let text = textObj[this.state.text];
        const delay = (ms:any) => new Promise(res => setTimeout(res, ms));
        await delay(100);
        this.setState({text:text})
      }
      }
  }

  render() {

    return (
      <div className="screen">

        <div className="loading loadingtText">{this.state.text}</div>
       
       
      </div>
    );
  }
}