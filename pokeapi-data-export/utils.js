const fs = require('fs-extra');
const path = require('path');

const spaces = 2;

async function loadData(dir) {
  let result = [];
  let items = await fs.readdir(dir);

  for (const item of items) {
    let stat = await fs.stat(path.join(dir, item));

    if (!stat.isDirectory()) {
      continue;
    }

    let json = await fs.readJson(path.join(dir, item, 'index.json'));

    result.push(json);
  }

  return result;
}

async function exportData(file, data) {
  return await fs.outputJson(file, data, { spaces });
}

module.exports.loadData = loadData;
module.exports.exportData = exportData;
