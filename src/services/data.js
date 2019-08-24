import _ from 'lodash';
import api from './api';

export class Data {
  constructor() {
    this.types = [];
  }

  async loadTypes() {
    let types = await api.loadTypes();

    // only types that have at least one pokemon
    types = _.filter(types, type => type.pokemon.length);

    let caption, damage, damageTaken, damageDealt;

    types = _.map(types, type => {
      caption = _.find(type.names, { language: { name: 'en' } });
      caption = caption ? caption.name : type.name;

      damage = type.damage_relations;

      damageTaken = [
        ...this._getTypeDamage(damage.double_damage_from, 2),
        ...this._getTypeDamage(damage.half_damage_from, 0.5),
        ...this._getTypeDamage(damage.no_damage_from, 0),
      ];

      damageDealt = [
        ...this._getTypeDamage(damage.double_damage_to, 2),
        ...this._getTypeDamage(damage.half_damage_to, 0.5),
        ...this._getTypeDamage(damage.no_damage_to, 0),
      ];

      return {
        id: type.id,
        name: type.name,
        caption,
        color: this._getTypeColor(type.name),
        damageTaken,
        damageDealt,
      };
    });

    types = _.orderBy(types, 'caption');

    // make object for faster access by name
    types = _.keyBy(types, 'name');

    this.types = types;

    return types;
  }

  _getTypeDamage(damages, factor) {
    return _.map(damages, item => {
      return {
        type: item.name,
        factor,
      };
    });
  }

  _getTypeColor(typeName) {
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
}

const data = new Data();

export default data;
