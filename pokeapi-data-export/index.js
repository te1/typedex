const fs = require('fs-extra');
const path = require('path');
const exportTypes = require('./types');
const exportPokemon = require('./pokemon');
const exportMoves = require('./moves');

const source = path.join(__dirname, '..', 'pokeapi-data', 'data', 'api', 'v2');
const target = path.join(__dirname, '..', 'public', 'data');

async function main() {
  try {
    await fs.emptyDir(target);

    await exportTypes(source, target);
    // await exportPokemon(source, target);
    await exportMoves(source, target);
  } catch (err) {
    console.error(err);
  }
}

main();
