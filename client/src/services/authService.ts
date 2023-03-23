import ComponentList from "../models/componentList";
/**
 * Create an auth service that can work with the server
 */
export class Auth {

    //include the component list
    componentList: ComponentList;
    URL = "http://localhost:4000/"
    constructor(componentList: ComponentList) {
        this.componentList = componentList;
    }

    /**
     * 
     * @param dispatch 
     * Get all the data from the server. When done turn off the loading screen in App with dispatch.
     */
    async getAlltheData(dispatch: any) {
        try {
            await this.getDataByEndpoint("people/", "");
            await this.getDataByEndpoint("planets/", "?getCache=true");
            dispatch({ start: true });
        }
        catch (e) {
            console.log(e);
        }


    }

    /**
     * 
     * @param endpoint 
     * @param search 
     * Get a list of data by enpoint and include a param if needed
     */
    async getDataByEndpoint(endpoint: string, search: string) {
        try {
            let response = await fetch(this.URL + endpoint + search);
            let data = await response.json();
            for (let obj of data) {
                obj.type = endpoint.slice(0, -1);
            }
            await this.componentList.addComponents(data);
        }
        catch (e) {
            console.log(e);
        }
    }




}

