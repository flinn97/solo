import Factory from "./factory";
import BaseClass from "./myComponents";

export default class ComponentList {

    /**
     * Set components 
     * Add an easy way to access lists of components
     */
    components: BaseClass[] = [];
    componentsList: any = {};
    factory: Factory;
    constructor(factory: Factory) {
        this.add = this.add.bind(this);
        this.getComponents = this.getComponents.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.factory = factory;


    }

    /**
     * 
     * @returns all the components inside the tech
     */
    getComponents() {
        return this.components
    }

    /**
     * 
     * @param arr of components to add
     * add one to many components into the list
     * 
     */
    async add(arr: BaseClass[]) {
        if (arr.length > 0) {
            for (const key in arr) {
                let comp = [...this.components];
                await comp.push(arr[key]);
                this.components = comp;
            }
            await this.setComponentsList();
        }

    }

    /**
     * if this is a new type of component that has never been added before add a new array.
     * Otherwise add it to the current array
     */
    setComponentsList() {
        let comps = [...this.components];
        let tempcomps: any = {};
        if (comps.length > 0) {
            for (const key in comps) {
                let type = comps[key].getJson().type;
                if (Object.keys(tempcomps).includes(type)) {
                    tempcomps[type] = [...tempcomps[type], comps[key]];
                }
                else {
                    tempcomps[type] = [comps[key]]
                }
            }
            this.componentsList = tempcomps;
        }

    }


    /**
     * 
     * @param arr 
     *  add any amount of raw data as a component into the list.
     */
    async addComponents(arr: any[]) {
        let prep = []
        //for all the data
        if (arr.length > 0) {
            for (const key in arr) {
                //have the factory create a component
                if(arr[key].type){
                let comp = await this.factory.getComponent({ component: arr[key].type, json: arr[key] });
                if (comp) {
                    prep.push(comp);
                }
            }
            }

            this.components = [...this.components, ...prep];
            this.setComponentsList();
        }
    }

    /**
     * 
     * @param list 
     * @param id 
     * @param filterKey 
     * @returns a filtered list of what was asked for with the default being the full list.
     */
    getList(list: string, id: string, filterKey: string,) {



        let temp: any = [];
        if (list !== undefined) {
            //get the list
            if (this.componentsList[list] !== undefined) {
                temp = [...this.componentsList[list]];
            }

            //filter it by the filter key 
            if (id !== undefined) {
                let key = filterKey !== undefined ? filterKey : "name"
                temp = temp.filter((data: any) => data.getJson()[key] === id);
            }
        }
        return temp;

    }

    /**
     * 
     * @param list 
     * @param id 
     * @param filterKey 
     * @returns a component of what was asked for with the default being the the first component in the list.
     */
    getComponent(list: string, id: string, filterKey: string,) {
        let temp: any = [];
        if (list !== undefined) {
        //get the list
        if (this.componentsList[list] !== undefined) {
            temp = [...this.componentsList[list]];
        }

        //filter it by the filter key
        if (id !== undefined) {
            let key = filterKey !== undefined ? filterKey : "_id"
            temp = temp.filter((data: any) => data.getJson()[key] === id);
        }
    }
        return list === undefined? temp : temp[0];

    }



}
