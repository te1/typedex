import config from '../config';
import Cache from '../lib/cache';

const cache = new Cache(config.appName);

export default cache;
