import axios from 'axios';
import _ from 'lodash';
import cache from './cache';

const baseUrl = 'https://pokeapi.co/api/v2/';
const cacheFor = 60 * 60 * 8; // 8 hours in seconds

export class Api {
  constructor() {
    this.lists = {};
    this.items = {};
  }

  async load() {
    await this._loadList('type');
    await this._loadListItems('type');
  }

  async _loadList(name) {
    let fetch = async () => {
      let url = baseUrl + name + '?limit=10000';
      let response = await axios.get(url);

      return response.data;
    };
    let cacheKey = 'api_' + name;

    let data = await cache.remember(cacheKey, cacheFor, fetch);

    this.lists[name] = data;
  }

  async _loadListItems(name) {
    return await Promise.all(
      _.map(this.lists[name].results, name => {
        return this._loadItem(name, name.name, name.url);
      })
    );
  }

  async _loadItem(listName, itemName, itemUrl) {
    let fetch = async () => {
      let response = await axios.get(itemUrl);

      return response.data;
    };

    let cacheKey = 'api_' + listName + '_' + itemName;

    let data = await cache.remember(cacheKey, cacheFor, fetch);

    if (!this.items[listName]) {
      this.items[listName] = {};
    }

    this.items[listName][itemName] = data;
  }
}

const api = new Api();

export default api;
