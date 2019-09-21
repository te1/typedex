const path = require('path');
const _ = require('lodash');
const utils = require('./utils');

function getTypeDamage(damages, factor) {
  return _.map(damages, item => {
    return {
      type: item.name,
      factor,
    };
  });
}

function getTypeColor(typeName) {
  switch (typeName) {
    case 'normal':
      return '#9a9da1';

    case 'fire':
      return '#f8a54f';

    case 'water':
      return '#559edf';

    case 'electric':
      return '#edd53f';

    case 'grass':
      return '#5dbe62';

    case 'ice':
      return '#7ed4c9';

    case 'fighting':
      return '#d94256';

    case 'poison':
      return '#b563ce';

    case 'ground':
      return '#d78555';

    case 'flying':
      return '#9bb4e8';

    case 'psychic':
      return '#f87c7a';

    case 'bug':
      return '#9dc130';

    case 'rock':
      return '#cec18c';

    case 'ghost':
      return '#6970c5';

    case 'dragon':
      return '#0773c7';

    case 'dark':
      return '#5f606d';

    case 'steel':
      return '#5596a4';

    case 'fairy':
      return '#ef97e6';

    default:
      return '#999999';
  }
}

function getCategoryColor(categoryName) {
  switch (categoryName) {
    case 'physical':
      return '#d76753';

    case 'special':
      return '#6483b6';

    case 'status':
      return '#b8b1a2';

    default:
      return '#999999';
  }
}

async function exportTypes(source, target) {
  console.log('loading types...');

  let types = await utils.loadData(path.join(source, 'type'));

  console.log(`processing ${types.length} types...`);

  // only types that have at least one pokemon
  types = _.filter(types, type => type.pokemon.length);

  let caption, damage, damageTaken, damageDone;

  types = _.map(types, type => {
    caption = _.find(type.names, { language: { name: 'en' } });
    caption = caption ? caption.name : null;

    damage = type.damage_relations;

    damageTaken = [
      ...getTypeDamage(damage.double_damage_from, 2),
      ...getTypeDamage(damage.half_damage_from, 0.5),
      ...getTypeDamage(damage.no_damage_from, 0),
    ];

    damageDone = [
      ...getTypeDamage(damage.double_damage_to, 2),
      ...getTypeDamage(damage.half_damage_to, 0.5),
      ...getTypeDamage(damage.no_damage_to, 0),
    ];

    return {
      id: type.id,
      name: type.name,
      caption,
      color: getTypeColor(type.name),
      damageTaken,
      damageDone,
    };
  });

  types = _.orderBy(types, 'name');

  console.log('loading categories...');

  let categories = await utils.loadData(path.join(source, 'move-damage-class'));

  console.log(`processing ${categories.length} categories...`);

  let description;

  categories = _.map(categories, category => {
    caption = _.find(category.names, { language: { name: 'en' } });
    caption = caption ? _.upperFirst(caption.name) : null;

    description = _.find(category.descriptions, { language: { name: 'en' } });
    description = description ? description.description : null;

    return {
      id: category.id,
      name: category.name,
      caption,
      description,
      color: getCategoryColor(category.name),
    };
  });

  categories = _.orderBy(categories, 'name');

  let data = {
    types,
    categories,
  };

  console.log(
    `writing ${types.length} types, ${categories.length} categories...`
  );

  await utils.exportData(path.join(target, 'types.json'), data);

  console.log('done\n');
}

module.exports = exportTypes;