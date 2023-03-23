
/**
 * Create a base class the defines some basic functions and data
 */
export default class BaseClass {
    //json data
    json: any;

    /**
     * 
     * @param obj 
     * @param callBack 
     * Works exactly like setState in react only I include a function for a callback if needed
     */
    setCompState(obj: any, callBack: any) {
        this.json = { ...this.json, ...obj };
        if (callBack) {
            callBack();
        }
    }


    /**
     * 
     * @param json 
     * set the data
     */
    setJson(json: any) {
        this.json = json;
    }

    /**
     * get the data if to preserve private json var
     */
    getJson() {
        return this.json
    }
}




/**
 * Declare planet class component
 */
class Planet extends BaseClass {
    json = {
        type: "planets",
        rotation_period: "",
        orbital_period: "",
        diameter: "",
        climate: "",
        gravity: "",
        terrain: "",
        surface_water: "",
        population: "",
        residents: [],
        name: "",
        films: [],
        created: "",
        edited: "",
        url: ""

    }
}

/**
 * Declare Person class component
 */
class Person extends BaseClass {
    json = {
        type: "person",
        name: "",
        height: "",
        mass: "",
        hair_color: "",
        skin_color: "",
        eye_color: "",
        birth_year: "",
        gender: "",
        homeworld: "",
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: "",
        edited: "",
        url: ""
    }
}


/**
 * 
 * @returns the class data for the factory
 */
function forFactory() {
    return { planets: Planet, people: Person }
}


export { forFactory }
