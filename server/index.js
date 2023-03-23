/*
    This is just a small sample to get you started. 
    Note that the docker setup will be looking for `index.js`,
    so it's best to use this file or the same file name.
 */
const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch");
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

//easy use URL
const URL = 'https://swapi.dev/api/';
let peopleCache = {};
/**
 * star wars is cool!
 */
app.get('/', (req, res) => res.send('Star Wars is Cool!'));

/**
 * get all the people in the database by calling getApi
 * allow sort on query params for name, height and mass.
 */
app.get('/people', async (req, res) => {
    try {
        //set endpoint people
        let endpoint = "people/"

        //get the amount of people that exist in the database.
        let peopleCount = await getDataCount(endpoint);

        //Get all the people by pagination.
        let people = await getAPI(endpoint, peopleCount);
        //check for sortBy
        let checkSortBy =["mass", "height", "name"]
        if (checkSortBy.includes(req.query.sortBy)) {

            //sort the array
            people.sort(function (a, b) {
                key = req.query.sortBy;
                //check if values are ints or floats or just strings and then compare
                let aStr = isFloatorInt(a[key]);
                let bStr = isFloatorInt(b[key])
                if (aStr < bStr) {
                    return -1;
                }
                if (aStr > bStr) {
                    return 1;
                }
                return 0;
            })
        }
        res.json(people);
    }

    catch (e) {
        console.log(e);
    }
})

/**
 * get all the planets in the database by calling getApi
 * map the planets to a new array
 */
app.get('/planets', async (req, res) => {
    try {
        //set endpoint planet
        let endpoint = "planets/"

        //get planet count
        let planetCount = await getDataCount(endpoint);

        //Get all the planets by pagination.
        let planets = await getAPI(endpoint, planetCount);

        //get the names of the residents
        for (let planet of planets) {
            if (planet.residents.length > 0) {

                //get each residents name and inject it into the planet data
                for (let i = 0; i < planet.residents.length; i++) {

                    //if we sent in getCache then we can make things quicker
                    if (req.query.getCache) {
                        let newResident = peopleCache[planet.residents[i].slice(0, -1)]
                        planet.residents[i] = newResident
                    }

                    //else we will have to get everything new.
                    else {
                        let newResident = await fetchItem(planet.residents[i]);
                        planet.residents[i] = newResident.name
                    }

                }
            }
        }
        res.json(planets);
    }

    catch (e) {
        console.log(e);
    }
})

/**
 * Get the amount of things that exist in the database at a certain endpoint
 */
async function getDataCount(endpoint) {
    let countResponse = await fetch(URL + endpoint);
    let data = await countResponse.json();
    let dataCount = parseInt(data.count);
    return (dataCount);
}

/**
 * 
 * @param {*} endpoint 
 * @param {*} amount 
 * @returns all the data specified by the endpoint by pagination
 */
async function getAPI(endpoint, amount) {

    //setup
    let requests = [];

    //create a list of promises
    for (i = 1; i <= amount + 1; i++) {
        requests.push(fetch(URL + endpoint + i))
    }

    //get the data asynchronously
    let data = await promiseExecution(requests);
    return data;

}


/*
* return the data of all the promises.
 */
let promiseExecution = async (arr) => {
    const promise = await Promise.all(arr);
    let data = [];
    for (let response of promise) {
        // so long as the data is found we can create the data
        let responseData = await response.json();
        if (responseData.detail !== "Not found") {
            data.push(responseData);
            //save people to a cache so that they can be used for worlds.
            if (response.url.includes("people")) {
                peopleCache[response.url] = responseData.name;
            }

        }
    }
    return data;

};

/**
 * 
 * @param {*} endpoint 
 * @returns the data of the endpoint.
 */
async function fetchItem(endpoint) {
    try {

        let response = await fetch(endpoint);
        let responseData = await response.json();
        return responseData;
    }
    catch (e) {
        console.log(e)
    }

}

/**
 * 
 * @param {*} str 
 * @returns a string an integer or a float depending on the str
 */
function isFloatorInt(str) {

    let integer = str;

    // Remove leading/trailing white space
    str = str.trim();

    // Check for empty string or string with only a minus sign
    if (str !== "" && str !== "-" && str !== ".") {

        // Check for a valid integer using a regular expression
        if (/^-?\d+$/.test(str)) {
            integer = parseInt(str);
        }
        // Check for a valid float using a regular expression
        if (/^-?\d+(\.\d+)?$/.test(str)) {
            integer = parseFloat(str);
        }

    }
    return integer;
}



app.listen(PORT, () => console.log(` app listening on port ${PORT}!`));
