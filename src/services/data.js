import _ from 'lodash';
import api from './api';

export class Data {
  constructor() {
    this.generations = [];
    this.generationsByName = {};
    this.generationsById = {};

    this.types = [];
    this.typesByName = {};
    this.typesById = {};
    this.typeNone = {};
    this.typeAll = {};

    this.categories = [];
    this.categoriesByName = {};
    this.categoriesById = {};
    this.categoryAll = {};

    this.moves = [];
    this.movesByName = {};
    this.movesById = {};

    this.moveDetails = {};

    // this.pokemon = {};
  }

  async loadGenerations() {
    this.generations = await api.loadGenerations();
    this.generationsByName = _.keyBy(this.generations, 'name');
    this.generationsById = _.keyBy(this.generations, 'id');
  }

  getGeneration(generation) {
    if (typeof generation === 'string') {
      return this.generationsByName[generation];
    }
    return generation;
  }

  async loadTypes() {
    let data = await api.loadTypes();

    this.types = data.types;
    this.typesByName = _.keyBy(this.types, 'name');
    this.typesById = _.keyBy(this.types, 'id');

    this.typeNone = {
      name: 'none',
      caption: 'None',
      color: '#4a5568',
    };

    this.typeAll = {
      name: 'all',
      caption: 'All',
      color: '#4a5568',
    };

    this.categories = data.categories;
    this.categoriesByName = _.keyBy(this.categories, 'name');
    this.categoriesById = _.keyBy(this.categories, 'id');

    this.categoryAll = {
      name: 'all',
      caption: 'All',
      color: '#4a5568',
    };
  }

  getType(type) {
    if (typeof type === 'string') {
      switch (type) {
        case 'none':
          return this.typeNone;

        case 'all':
          return this.typeAll;

        default:
          return this.typesByName[type];
      }
    }
    return type;
  }

  getCategory(category) {
    if (typeof category === 'string') {
      switch (category) {
        case 'all':
          return this.categoryAll;

        default:
          return this.categoriesByName[category];
      }
    }
    return category;
  }

  async loadMoves() {
    this.moves = await api.loadMoves();
    this.movesByName = _.keyBy(this.moves, 'name');
    this.movesById = _.keyBy(this.moves, 'id');
  }

  getMove(move) {
    if (typeof move === 'string') {
      return this.movesByName[move];
    }
    return move;
  }

  async getMoveDetails(move) {
    if (typeof move === 'object') {
      move = move.name;
    }

    this.moveDetails[move] = await api.loadMoveDetails(move);

    return this.moveDetails[move];
  }

  async loadPokemon() {
    this.pokemon = await api.loadPokemon();

    return this.pokemon;
  }
}

const data = new Data();

export default data;
