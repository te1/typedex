import _ from 'lodash';
import axios from 'axios';
import cache from './cache';

const baseUrl = '/data/';
const cacheFor = 60 * 60 * 8; // 8 hours in seconds

export class Api {
  constructor() {
    this.generations = [];

    this.types = [];
    this.categories = [];

    this.moves = [];
    this.moveDetails = {};

    // this.pokemon = {};
  }

  async loadGenerations() {
    let data = await this._load('generations.json', 'generations');

    this.generations = data.generations;
    // TODO versionGroups, versions

    return {
      generations: this.generations,
    };
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

  async loadMoves() {
    let data = await this._load('moves.json', 'moves');

    this.moves = data.moves;
    // TODO targets, flags

    return {
      moves: this.moves,
    };
  }

  async loadMoveDetails(moveName) {
    let url = 'move/' + moveName + '.json';
    let cacheName = 'moves_' + moveName;

    let data = await this._load(url, cacheName);

    this.moveDetails[moveName] = data;

    return this.moveDetails[moveName];
  }

  // async loadPokemon() {
  //   // this.pokemon = await this._load('pokemon-index');
  //   // return this.pokemon;
  // }

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
