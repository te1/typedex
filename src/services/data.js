// import _ from 'lodash';
import api from './api';

export class Data {
  constructor() {
    this.types = {};
    this.pokemon = {};
    this.moves = {};
  }

  async loadTypes() {
    this.types = await api.loadTypes();

    return this.types;
  }

  getType(name) {
    return this.types[name];
  }

  async loadPokemon() {
    this.pokemon = await api.loadPokemon();

    return this.pokemon;
  }

  async loadMoves() {
    this.moves = await api.loadMoves();

    return this.moves;
  }
}

const data = new Data();

export default data;
