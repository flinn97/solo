
/**
 * Create a factory that can add all the components
 */
class Factory {

    factory: any ={
       

    }

    /**
     * 
     * @param register 
     * register any component to the factory
     */
    registerComponents(register: any){
        if(register.name){
            this.factory[register.name]= register.component;
        }
    }

    /**
     * 
     * @param obj 
     * @returns a new component from the data
     * Used to create raw data into class components to be used.
     */
    getComponent(obj:any){

        let keys = Object.keys(this.factory);

        //check if the factory includes this typ of component
        if(keys.includes(obj.component)){
            let key = obj.component;
            let comp = new this.factory[key]();
            comp.setJson({...comp.getJson(), ...obj.json, _id:Math.floor(Math.random()*100000)});
            return comp;     
        }  
    }
}
export default Factory;