import system from '../utils/system.js';

const {
  readFile
} = system

const planetNames = readFile("./data/planets.json", "planets");


export default {
    planetNames
};