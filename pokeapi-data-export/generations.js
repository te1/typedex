const path = require('path');
const _ = require('lodash');
const utils = require('./utils');

const ignoredVersionGroupNames = ['colosseum', 'xd'];

function mapVersion(version) {
  let caption = _.find(version.names, { language: { name: 'en' } });
  caption = caption ? caption.name : null;

  return {
    id: version.id,
    name: version.name,
    caption,
  };
}

function mapVersionGroup(versionGroup, versions, pokedexes) {
  if (_.includes(ignoredVersionGroupNames, versionGroup.name)) {
    return;
  }

  let itemVersions = _.map(versionGroup.versions, version => {
    return mapVersion(_.find(versions, { name: version.name }));
  });

  return {
    id: versionGroup.id,
    name: versionGroup.name,
    order: versionGroup.order,
    versions: itemVersions,
  };
}

async function exportGenerations(source, target) {
  console.log('loading generations...');
  let generations = await utils.loadData(path.join(source, 'generation'));

  console.log('loading version groups...');
  let versionGroups = await utils.loadData(path.join(source, 'version-group'));

  console.log('loading versions...');
  let versions = await utils.loadData(path.join(source, 'version'));

  console.log(
    `processing ${generations.length} generations, ${versionGroups.length} version groups, ${versions.length} versions...`
  );

  let caption, itemVersionGroups;

  generations = _.map(generations, generation => {
    caption = _.find(generation.names, { language: { name: 'en' } });
    caption = caption ? caption.name : null;

    itemVersionGroups = _.map(generation.version_groups, versionGroup => {
      return mapVersionGroup(
        _.find(versionGroups, { name: versionGroup.name }),
        versions
      );
    });
    itemVersionGroups = _.reject(itemVersionGroups, item => item == null);
    itemVersionGroups = _.orderBy(itemVersionGroups, 'order');

    return {
      id: generation.id,
      name: generation.name,
      caption,
      versionGroups: itemVersionGroups,
    };
  });

  generations = _.orderBy(generations, 'name');

  console.log(`writing ${generations.length} generations...`);

  await utils.exportData(path.join(target, 'generations.json'), generations);

  console.log('done\n');
}

module.exports = exportGenerations;
