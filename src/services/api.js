import axios from 'axios';
import cache from './cache';

const baseUrl = '/data/';
const cacheFor = 60 * 60 * 8; // 8 hours in seconds

export class Api {
  constructor() {
    this.types = [];
    this.pokemon = {};
    this.moves = [];
  }

  async loadTypes() {
    this.types = await this._load('types.json', 'types');

    return this.types;
  }

  async loadPokemon() {
    // this.pokemon = await this._load('pokemon-index');
    // return this.pokemon;
  }

  async loadMoves() {
    this.moves = await this._load('moves/index.json', 'moves');

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
