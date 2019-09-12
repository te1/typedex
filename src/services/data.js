import _ from 'lodash';
import api from './api';

export class Data {
  constructor() {
    this.types = [];
    this.typesByName = {};
    this.typesById = {};
    this.typeNone = {};
    this.typePhysical = {};
    this.typeSpecial = {};
    this.typeStatus = {};

    this.pokemon = {};

    this.moves = [];
    this.movesByName = {};
    this.movesById = {};
  }

  async loadTypes() {
    this.types = await api.loadTypes();
    this.typesByName = _.keyBy(this.types, 'name');
    this.typesById = _.keyBy(this.types, 'id');

    this.typeNone = {
      name: 'none',
      caption: 'None',
      color: '#444',
    };

    this.typePhysical = {
      name: 'physical',
      caption: 'Physical',
      color: '#666',
    };

    this.typeSpecial = {
      name: 'special',
      caption: 'Special',
      color: '#777',
    };

    this.typeStatus = {
      name: 'status',
      caption: 'Status',
      color: '#888',
    };
  }

  getType(type) {
    if (typeof type === 'string') {
      switch (type) {
        case 'none':
          return this.typeNone;

        case 'physical':
          return this.typePhysical;

        case 'special':
          return this.typeSpecial;

        case 'status':
          return this.typeStatus;

        default:
          return this.typesByName[type];
      }
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
