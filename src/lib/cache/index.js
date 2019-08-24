import localforage from 'localforage';

export default class Cache {
  constructor(name = 'App', storeName = 'cache', prefix = '') {
    this._store = localforage.createInstance({
      name,
      storeName,
    });

    this._prefix = prefix;
  }

  async has(key) {
    return (await this.get(key)) != null;
  }

  async put(key, value, ttl) {
    if (ttl == null) {
      return await this._store.setItem(
        this._getKey(key),
        this._getResult(value)
      );
    }

    let seconds = this._getSeconds(ttl);

    if (seconds <= 0) {
      return await this.forget(key);
    }

    // TODO expire
    return await this._store.setItem(this._getKey(key), this._getResult(value));
  }

  async set(key, value, ttl) {
    return await this.put(key, value, ttl);
  }

  async add(key, value, ttl) {
    if (ttl != null && this._getSeconds(ttl) <= 0) {
      return false;
    }

    if ((await this.get(key)) == null) {
      return await this.put(key, value, ttl);
    }

    return false;
  }

  async forever(key, value) {
    return await this.put(key, value);
  }

  async remember(key, ttl, callback) {
    let value = await this.get(key);

    if (value != null) {
      return value;
    }

    return await this.put(key, callback, ttl);
  }

  async rememberForever(key, callback) {
    return await this.remember(key, null, callback);
  }

  async get(key, defaultValue) {
    let value = await this._store.getItem(this._getKey(key));

    // TODO expire

    if (value == null && defaultValue != null) {
      return this._getResult(defaultValue);
    }

    return value;
  }

  async pull(key, defaultValue) {
    let value = await this.get(key, defaultValue);

    await this.forget(key);

    return value;
  }

  async forget(key) {
    return await this._store.removeItem(this._getKey(key));
  }

  async delete(key) {
    return await this.forget(key);
  }

  async clear() {
    return await this._store.clear();
  }

  _getKey(key) {
    if (this._prefix) {
      return this._prefix + key;
    }
    return key;
  }

  _getSeconds(ttl) {
    // TODO NYI
    return ttl;
  }

  _getResult(value) {
    if (typeof value === 'function') {
      return value();
    }
    return value;
  }
}
