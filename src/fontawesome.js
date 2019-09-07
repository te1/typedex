import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faQuestion,
  faTimes,
  faBug,
  faMoon,
  faDragon,
  faBolt,
  faHatWizard,
  faFistRaised,
  faFire,
  faDove,
  faGhost,
  faSeedling,
  faMountain,
  faSnowflake,
  faCircle,
  faSkull,
  faEye,
  faGem,
  faWeightHanging,
  faTint,
  faArrowUp,
  faArrowDown,
  faBan,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faQuestion,
  faTimes,
  faBug,
  faMoon,
  faDragon,
  faBolt,
  faHatWizard,
  faFistRaised,
  faFire,
  faDove,
  faGhost,
  faSeedling,
  faMountain,
  faSnowflake,
  faCircle,
  faSkull,
  faEye,
  faGem,
  faWeightHanging,
  faTint,
  faArrowUp,
  faArrowDown,
  faBan
);

Vue.component('fa-icon', FontAwesomeIcon);
