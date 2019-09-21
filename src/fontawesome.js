import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faQuestion,
  faTimes,
  faArrowUp,
  faArrowDown,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

library.add(faQuestion, faTimes, faArrowUp, faArrowDown, faBan);
library.add(faSquare);

Vue.component('fa-icon', FontAwesomeIcon);
