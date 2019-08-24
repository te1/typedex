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
    let value = await this.get(key);

    return value != null;
  }

  async _setItem(key, value, seconds) {
    key = this._getKey(key);
    value = await this._getResult(value);

    let record = this._wrap(value, seconds);
    record = await this._store.setItem(key, record);

    return this._unwrap(record);
  }

  async put(key, value, ttl) {
    if (ttl == null) {
      return await this._setItem(key, value);
    }

    let seconds = this._getSeconds(ttl);

    return await this._setItem(key, value, seconds);
  }

  async set(key, value, ttl) {
    return await this.put(key, value, ttl);
  }

  async add(key, value, ttl) {
    if (await !this.has(key)) {
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
    key = this._getKey(key);

    let record = await this._store.getItem(key);

    let value = await this._checkExpires(key, record);

    if (value == null && defaultValue != null) {
      return await this._getResult(defaultValue);
    }

    return value;
  }

  async pull(key, defaultValue) {
    let value = await this.get(key, defaultValue);

    await this.forget(key);

    return value;
  }

  async forget(key) {
    key = this._getKey(key);

    return await this._store.removeItem(key);
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
    if (ttl < 0) {
      return 0;
    }
    return ttl;
  }

  async _getResult(value) {
    if (typeof value === 'function') {
      return await value();
    }
    return value;
  }

  _wrap(value, seconds) {
    let expires;

    if (typeof seconds === 'number') {
      let now = new Date();
      expires = new Date(now.getTime() + seconds * 1000);
    }

    return {
      value,
      expires,
    };
  }

  _unwrap(record) {
    if (record == null) {
      return;
    }
    return record.value;
  }

  async _checkExpires(key, record) {
    if (record && this._isValidDate(record.expires)) {
      let now = new Date();

      if (now > record.expires) {
        await this.forget(key);
        return;
      }
    }

    return this._unwrap(record);
  }

  _isValidDate(date) {
    // https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date/44198641#44198641

    return (
      date &&
      Object.prototype.toString.call(date) === '[object Date]' &&
      !isNaN(date)
    );
  }
}
