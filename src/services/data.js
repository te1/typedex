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

  getType(type) {
    if (typeof type === 'string') {
      return this.types[type];
    }
    return type;
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
