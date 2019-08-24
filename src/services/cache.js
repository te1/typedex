import config from '../config';
import Cache from '../lib/cache';

const cache = new Cache({
  name: config.appName,
});

export default cache;
