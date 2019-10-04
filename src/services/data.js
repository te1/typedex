import _ from 'lodash';
import api from './api';

export class Data {
  constructor() {
    this.generations = [];
    this.generationsByName = {};

    this.types = [];
    this.typesByName = {};
    this.typeNone = {};
    this.typeAll = {};

    this.categories = [];
    this.categoriesByName = {};
    this.categoryAll = {};

    this.moves = [];
    this.movesByName = {};

    this.moveDetails = {};

    // this.pokemon = {};
  }

  async loadGenerations() {
    let data = await api.loadGenerations();

    // build caption, because it's not included by default
    data.generations = _.map(data.generations, item => {
      return {
        ...item,
        caption: 'Gen ' + item.num,
      };
    });

    this.generations = data.generations;
    this.generationsByName = _.keyBy(this.generations, 'name');

    // TODO versionGroups, versions
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
    let data = await api.loadMoves();

    // to reduce file size null/false values are ommited during export
    // to allow easy filtering they are restored here
    data.moves = _.map(data.moves, item => {
      return _.defaults(item, {
        z: false,
      });
    });

    this.moves = data.moves;
    this.movesByName = _.keyBy(this.moves, 'name');

    // TODO targets, flags
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

  // async loadPokemon() {
  //   this.pokemon = await api.loadPokemon();

  //   return this.pokemon;
  // }
}

const data = new Data();

export default data;
