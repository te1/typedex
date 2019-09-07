const fs = require('fs').promises;
const path = require('path');
const _ = require('lodash');

const source = path.join(__dirname, 'pokeapi-data', 'data', 'api', 'v2');
const target = path.join(__dirname, 'public', 'data');

const space = 2;
const includeMega = true;
const includeAlternate = true;

async function loadData(dir) {
  let result = [];
  let items = await fs.readdir(dir);

  for (const item of items) {
    let stat = await fs.stat(path.join(dir, item));

    if (!stat.isDirectory()) {
      continue;
    }

    let file = await fs.readFile(path.join(dir, item, 'index.json'));
    let json = JSON.parse(file);

    result.push(json);
  }

  return result;
}

async function exportData(file, data) {
  let json = JSON.stringify(data, null, space);

  return await fs.writeFile(file, json);
}

async function exportTypes() {
  function getTypeDamage(damages, factor) {
    return _.map(damages, item => {
      return {
        type: item.name,
        factor,
      };
    });
  }

  function getTypeColor(typeName) {
    // http://www.epidemicjohto.com/t882-type-colors-hex-colors

    switch (typeName) {
      case 'normal':
        return '#a8a77a';

      case 'fire':
        return '#ee8130';

      case 'water':
        return '#6390f0';

      case 'electric':
        return '#f7d02c';

      case 'grass':
        return '#7ac74c';

      case 'ice':
        return '#96d9d6';

      case 'fighting':
        return '#c22e28';

      case 'poison':
        return '#a33ea1';

      case 'ground':
        return '#e2bf65';

      case 'flying':
        return '#a98ff3';

      case 'psychic':
        return '#f95587';

      case 'bug':
        return '#a6b91a';

      case 'rock':
        return '#b6a136';

      case 'ghost':
        return '#735797';

      case 'dragon':
        return '#6f35fc';

      case 'dark':
        return '#705746';

      case 'steel':
        return '#b7b7ce';

      case 'fairy':
        return '#d685ad';

      default:
        return '#999999';
    }
  }

  console.log('loading types...');

  let types = await loadData(path.join(source, 'type'));

  console.log(`processing ${types.length} types...`);

  // only types that have at least one pokemon
  types = _.filter(types, type => type.pokemon.length);

  let caption, damage, damageTaken, damageDone;

  types = _.map(types, type => {
    caption = _.find(type.names, { language: { name: 'en' } });
    caption = caption ? caption.name : type.name;

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
      // id: type.id,
      name: type.name,
      caption,
      color: getTypeColor(type.name),
      damageTaken,
      damageDone,
    };
  });

  types = _.orderBy(types, 'name');

  console.log(`writing ${types.length} types...`);

  await exportData(path.join(target, 'types.json'), types);

  console.log('done\n');
}

async function exportPokemon() {
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

async function exportMoves() {
  console.log('loading moves...');

  let moves = await loadData(path.join(source, 'move'));

  console.log(`processing ${moves.length} moves...`);

  // only moves that deal damage
  moves = _.filter(
    moves,
    move =>
      move.damage_class.name === 'physical' ||
      move.damage_class.name === 'special'
  );

  let caption;

  moves = _.map(moves, move => {
    caption = _.find(move.names, { language: { name: 'en' } });
    caption = caption ? caption.name : move.name;

    return {
      // id: move.id,
      name: move.name,
      caption,
      type: move.type.name,
      power: move.power,
      accuracy: move.accuracy,
      damageClass: move.damage_class.name,
    };
  });

  moves = _.orderBy(moves, 'name');

  let movesIndex = _.map(moves, move => {
    return _.pick(move, ['name', 'caption', 'type']);
  });

  moves = _.keyBy(moves, 'name');

  console.log(`writing ${movesIndex.length} moves...`);

  await exportData(path.join(target, 'moves.json'), moves);
  await exportData(path.join(target, 'moves-index.json'), movesIndex);

  console.log('done\n');
}

async function main() {
  try {
    await exportTypes();
    await exportPokemon();
    await exportMoves();
  } catch (err) {
    console.error(err);
  }
}

main();
