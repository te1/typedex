import _ from 'lodash';
import api from './api';

export class Data {
  constructor() {
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

    // this.pokemon = {};
  }

  async loadTypes() {
    let data = await api.loadTypes();

    this.types = data.types;
    this.typesByName = _.keyBy(this.types, 'name');
    this.typesById = _.keyBy(this.types, 'id');

    this.typeNone = {
      name: 'none',
      caption: 'None',
      color: '#444',
    };

    this.typeAll = {
      name: 'all',
      caption: 'All',
      color: '#444',
    };

    this.categories = data.categories;
    this.categoriesByName = _.keyBy(this.categories, 'name');
    this.categoriesById = _.keyBy(this.categories, 'id');

    this.categoryAll = {
      name: 'all',
      caption: 'All',
      color: '#444',
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

  async loadPokemon() {
    this.pokemon = await api.loadPokemon();

    return this.pokemon;
  }
}

const data = new Data();

export default data;
