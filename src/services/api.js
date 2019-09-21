import _ from 'lodash';
import axios from 'axios';
import cache from './cache';

const baseUrl = '/data/';
const cacheFor = 60 * 60 * 8; // 8 hours in seconds

export class Api {
  constructor() {
    this.types = [];
    this.categories = [];
    this.moves = [];
    // this.pokemon = {};
  }

  async loadTypes() {
    let data = await this._load('types.json', 'types');

    this.types = data.types;
    this.categories = data.categories;

    return {
      types: this.types,
      categories: this.categories,
    };
  }

  async loadPokemon() {
    // this.pokemon = await this._load('pokemon-index');
    // return this.pokemon;
  }

  async loadMoves() {
    let data = await this._load('moves/index.json', 'moves');

    // to reduce file size null/false values are ommited during export
    // to allow easy filtering they are restored here
    data = _.map(data, item => {
      return _.defaults(item, {
        z: false,
      });
    });

    this.moves = data;

    return this.moves;
  }

  async _load(url, cacheName) {
    let fetch = async () => {
      let fullUrl = baseUrl + url;
      let response = await axios.get(fullUrl);

      return response.data;
    };
    if (!cacheName) {
      cacheName = url;
    }
    let cacheKey = 'api_' + cacheName;

    let data = await cache.remember(cacheKey, cacheFor, fetch);

    return data;
  }
}

const api = new Api();

export default api;
