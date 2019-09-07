import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faQuestion,
  faTimes,
  faBug,
  faAdjust,
  faDragon,
  faBolt,
  faHatWizard,
  faFistRaised,
  faFire,
  faFeatherAlt,
  faGhost,
  faLeaf,
  faMountain,
  faSnowflake,
  faCircle,
  faSkull,
  faDizzy,
  faGem,
  faCog,
  faTint,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faQuestion,
  faTimes,
  faBug,
  faAdjust,
  faDragon,
  faBolt,
  faHatWizard,
  faFistRaised,
  faFire,
  faFeatherAlt,
  faGhost,
  faLeaf,
  faMountain,
  faSnowflake,
  faCircle,
  faSkull,
  faDizzy,
  faGem,
  faCog,
  faTint
);

Vue.component('fa-icon', FontAwesomeIcon);
