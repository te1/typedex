<template>
  <div>
    <v-dialog v-model="open" scrollable>
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="typeCaption"
          label="Type"
          placeholder="Select type..."
          append-icon="$vuetify.icons.dropdown"
          readonly
          v-on="on"
        ></v-text-field>
      </template>

      <v-card>
        <v-card-title>Title</v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-list>
            <v-list-item-group v-model="type">
              <v-list-item v-for="item in types" :key="item.name" :value="item">
                <!--
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                -->
                <v-list-item-content>
                  <v-list-item-title v-text="item.caption"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      open: null,
      types: _.values(data.types),
      type: null,
    };
  },

  computed: {
    typeCaption() {
      if (this.type) {
        return this.type.caption;
      }
      return null;
    },
  },

  watch: {
    value(newValue) {
      this.type = newValue;
    },

    type() {
      if (!this.open) {
        return;
      }

      this.$emit('input', this.type);

      if (this.type) {
        this.open = false;
      }
    },
  },
};
</script>
