import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faQuestion,
  faTimes,
  faArrowUp,
  faArrowDown,
  faBan,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {
  faSquare,
  faFrown,
  faCircle,
  faCheckSquare,
} from '@fortawesome/free-regular-svg-icons';

library.add(faQuestion, faTimes, faArrowUp, faArrowDown, faBan, faSearch);
library.add(faSquare, faFrown, faCircle, faCheckSquare);

Vue.component('fa-icon', FontAwesomeIcon);
