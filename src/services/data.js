import _ from 'lodash';
import types from '../assets/data/types.json';
import moves from '../assets/data/moves.json';

export class Data {
  constructor() {
    this.types = [];
    this.typesByName = {};
    this.typeNone = {};
    this.typeAll = {};

    this.moves = [];
  }

  loadTypes() {
    this.types = types;
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

    Object.freeze(this.types);
    Object.freeze(this.typesByName);
    Object.freeze(this.typeNone);
    Object.freeze(this.typeAll);
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

  loadMoves() {
    this.moves = moves;

    Object.freeze(this.moves);
  }
}

const data = new Data();

export default data;
