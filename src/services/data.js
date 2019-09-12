import _ from 'lodash';
import api from './api';

export class Data {
  constructor() {
    this.types = [];
    this.typesByName = {};
    this.typesById = {};

    this.pokemon = {};

    this.moves = [];
    this.movesByName = {};
    this.movesById = {};
  }

  async loadTypes() {
    this.types = await api.loadTypes();
    this.typesByName = _.keyBy(this.types, 'name');
    this.typesById = _.keyBy(this.types, 'id');
  }

  getType(type) {
    if (typeof type === 'string') {
      return this.typesByName[type];
    }
    return type;
  }

  async loadPokemon() {
    this.pokemon = await api.loadPokemon();

    return this.pokemon;
  }

  async loadMoves() {
    this.moves = await api.loadMoves();
    this.movesByName = _.keyBy(this.moves, 'name');
    this.movesById = _.keyBy(this.moves, 'id');
  }
}

const data = new Data();

export default data;
