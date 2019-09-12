const path = require('path');
const _ = require('lodash');
const utils = require('./utils');

const includeMega = true;
const includeAlternate = true;

function shouldIncludePokemon(pkmn) {
  // include if pokemon is default for its species
  if (pkmn.is_default) {
    return true;
  }

  // exclude if there are multiple or no forms
  if (pkmn.forms.length !== 1) {
    return false;
  }

  let form = forms[pkmn.forms[0].name];

  // exclude if there is no form
  if (!form) {
    return false;
  }

  // include if this is a mega evolution
  if (form.is_mega) {
    if (!includeMega) {
      return false;
    }
    return { form, mega: true };
  }

  // exclude if form is temporary
  if (form.is_battle_only) {
    return false;
  }

  // include remaining alternate forms
  if (!includeAlternate) {
    return false;
  }
  return { form, alternate: true };
}

async function exportPokemon(source, target) {
  console.log('loading pokemon...');
  let pokemon = await loadData(path.join(source, 'pokemon'));

  console.log('loading species...');
  let species = await loadData(path.join(source, 'pokemon-species'));

  species = _.orderBy(species, 'order');
  species = _.keyBy(species, 'name');

  console.log('loading forms...');
  var forms = await loadData(path.join(source, 'pokemon-form'));

  forms = _.orderBy(forms, 'order');
  forms = _.keyBy(forms, 'name');

  console.log(`processing ${pokemon.length} pokemon...`);

  let result, include, spec, caption, genus, color, sprite, types, moves;

  pokemon = _.map(pokemon, pkmn => {
    include = shouldIncludePokemon(pkmn);

    if (!include) {
      // this adds `undefined` to the collection
      // will be filtered out later

      return;
    }

    spec = species[pkmn.species.name];

    if (spec) {
      caption = _.find(spec.names, { language: { name: 'en' } });
      caption = caption ? caption.name : spec.name;

      genus = _.find(spec.genera, { language: { name: 'en' } });
      genus = genus ? genus.genus : null;

      color = spec.color.name;
    } else {
      caption = pkmn.name;
      genus = null;
      color = null;
    }

    sprite = pkmn.sprites.front_default;

    if (include.form) {
      // use form name for mega evolutions / alternate forms
      let obj = _.find(include.form.names, { language: { name: 'en' } });

      if (obj && obj.name) {
        caption = obj.name;
      }

      // use form sprite if pokemon has no sprite
      if (!sprite) {
        sprite = include.form.sprites.front_default;
      }
    }

    types = _.orderBy(pkmn.types, 'slot');
    types = _.map(types, type => type.type.name);

    moves = _.map(pkmn.moves, move => move.move.name);

    result = {
      // id: pkmn.id,
      name: pkmn.name,
      order: pkmn.order,
      caption,
      // genus,
      // color,
      // sprite,
      mega: include.mega || false,
      alternate: include.alternate || false,
      types,
      moves,
    };

    // drop undefined, null and false values
    result = _.pickBy(result, value => value != null && value !== false);

    return result;
  });

  pokemon = _.reject(pokemon, pkmn => pkmn == null);
  pokemon = _.orderBy(pokemon, 'order');

  let pokemonIndex = _.map(pokemon, pkmn => {
    return _.pick(pkmn, [
      'name',
      'order',
      'caption',
      // 'color',
      // 'sprite',
      'mega',
      'alternate',
      'types',
    ]);
  });

  pokemon = _.keyBy(pokemon, 'name');

  console.log(`writing ${pokemonIndex.length} pokemon...`);

  await exportData(path.join(target, 'pokemon.json'), pokemon);
  await exportData(path.join(target, 'pokemon-index.json'), pokemonIndex);

  console.log('done\n');
}

module.exports = exportPokemon;
