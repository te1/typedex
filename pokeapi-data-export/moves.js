const path = require('path');
const _ = require('lodash');
const utils = require('./utils');

async function exportMoves(source, target) {
  console.log('loading moves...');

  let moves = await utils.loadData(path.join(source, 'move'));

  console.log(`processing ${moves.length} moves...`);

  let caption;

  moves = _.map(moves, move => {
    caption = _.find(move.names, { language: { name: 'en' } });
    caption = caption ? caption.name : null;

    effect = _.find(move.effect_entries, { language: { name: 'en' } });
    if (effect != null) {
      effect = {
        short: effect.short_effect,
        full: effect.effect.replace(/\$effect_chance/g, move.effect_chance),
      };
    }

    flavorTexts = _.filter(move.flavor_text_entries, {
      language: { name: 'en' },
    });
    flavorTexts = _.map(flavorTexts, item => {
      return {
        text: item.flavor_text,
        versionGroup: item.version_group.name,
      };
    });

    return {
      id: move.id,
      name: move.name,
      caption,
      type: move.type.name,
      damageClass: move.damage_class.name,
      power: move.power,
      accuracy: move.accuracy,
      pp: move.pp,
      priority: move.priority,
      gen: move.generation.name,
      effect,
      flavorTexts,
    };
  });

  moves = _.orderBy(moves, 'name');

  let result;

  let index = _.map(moves, move => {
    result = _.pick(move, [
      'id',
      'name',
      'caption',
      'type',
      'damageClass',
      'power',
      'accuracy',
      'pp',
    ]);

    // drop undefined, null and false values
    result = _.pickBy(result, value => value != null && value !== false);

    return result;
  });

  console.log(`writing ${moves.length} moves...`);

  await utils.exportData(path.join(target, 'moves/index.json'), index);

  _.forEach(moves, async move => {
    await utils.exportData(
      path.join(target, 'moves', move.name + '.json'),
      move
    );
  });

  console.log('done\n');
}

module.exports = exportMoves;
