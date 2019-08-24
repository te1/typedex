import axios from 'axios';
import cache from './cache';

const cacheFor = 60 * 60; // 1 hour in seconds
const base = 'https://pokeapi.co/api/v2/';

export class Api {
  constructor() {
    this._lists = {};
  }

  async load() {
    await this._loadList('type');
  }

  async _loadList(name) {
    let fetch = async () => {
      let url = base + name + '?limit=10000';
      let response = await axios.get(url);

      return response.data;
    };

    let data = await cache.remember(name, cacheFor, fetch);

    this._lists[name] = data;
  }
}

const api = new Api();

export default api;
