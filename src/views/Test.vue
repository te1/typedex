<template>
  <div>
    <!-- TypeIcon ------------------------------>
    TypeIcon
    <div class="box flex p-1 mb-2 text-green-600">
      <type-icon
        type="fire"
        :width="40"
        :height="40"
      />

      <type-icon
        :type="water"
        :width="40"
        :height="40"
      />

      <type-icon
        type="none"
        :width="40"
        :height="40"
      />

      <type-icon
        type="all"
        :width="40"
        :height="40"
      />

      <type-icon
        :type="{}"
        :width="40"
        :height="40"
      />

      <type-icon
        type="fail"
        :width="40"
        :height="40"
      />
    </div>

    <!-- TypeLabel ----------------------------->
    TypeLabel
    <div class="box p-1 mb-2">
      <type-label type="fire" />

      <type-label :type="water" />

      <type-label :type="{}" />

      <type-label type="none" />

      <type-label
        type="bug"
        interactive
      />

      <type-label
        type="grass"
        active
      />

      <type-label
        type="dark"
        hide-text
      />

      <div class="flex">
        <type-label type="dragon" />

        <div class="flex-1" />

        <type-label
          type="electric"
          hide-text
        />
      </div>
    </div>

    <!-- TypePicker ---------------------------->
    TypePicker

    <span v-if="type">{{ type.caption }}</span>

    <div class="box p-1 mb-2">
      <type-picker v-model="type" />

      <type-picker v-model="type">With Label</type-picker>

      <type-picker
        v-model="type"
        exclude="fire"
      >
        exclude String
      </type-picker>

      <type-picker
        v-model="type"
        :exclude="water"
      >
        exclude Object
      </type-picker>

      <type-picker
        v-model="type"
        :exclude="null"
      >
        exclude null
      </type-picker>

      <type-picker
        v-model="type"
        exclude="fail"
      >
        exclude fail
      </type-picker>

      <type-picker
        v-model="type"
        allow-clear
      >
        allowClear
      </type-picker>

      <type-picker
        v-model="type"
        show-none
      >
        showNone
      </type-picker>

      <type-picker
        v-model="type"
        show-all
      >
        showAll
      </type-picker>

      <type-picker
        v-model="type"
        allow-clear
        show-none
      >
        allowClear + showNone
      </type-picker>

      <type-picker
        v-model="type"
        allow-clear
        show-all
      >
        allowClear + showAll
      </type-picker>
    </div>
  </div>
</template>

<script>
  import data from '../services/data';
  import TypeIcon from '../components/type/TypeIcon';
  import TypeLabel from '../components/type/TypeLabel';
  import TypePicker from '../components/type/TypePicker';

  export default {
    components: {
      TypeIcon,
      TypeLabel,
      TypePicker,
    },

    data() {
      return {
        type: null,
        water: data.getType('water'),
      };
    },
  };
</script>
