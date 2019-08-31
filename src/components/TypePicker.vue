<template>
  <div>
    <v-dialog v-model="open">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">Click Me</v-btn>
      </template>

      <v-list>
        <v-list-item-group v-model="typeIndex">
          <v-list-item v-for="type in types" :key="type.name">
            <!--
              <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            -->
            <v-list-item-content>
              <v-list-item-title v-text="type.caption"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-dialog>

    <div>{{ typeIndex }}</div>
  </div>
</template>

<script>
import _ from 'lodash';
import data from '../services/data';

export default {
  name: 'TypePicker',

  props: {
    value: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      open: true,
      types: _.values(data.types),
      typeIndex: null,
    };
  },

  computed: {
    currentType() {
      return this.types[this.typeIndex];
    },
  },

  watch: {
    value(type) {
      if (type === this.currentType) {
        return;
      }

      let index = _.indexOf(this.types, type);

      this.typeIndex = index < 0 ? null : index;
    },

    typeIndex() {
      if (!this.open) {
        return;
      }

      this.$emit('input', this.currentType);

      if (this.currentType) {
        this.open = false;
      }
    },
  },
};
</script>
