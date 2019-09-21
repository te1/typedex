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

    <!-- CategoryIcon -------------------------->
    CategoryIcon
    <div class="box flex p-1 mb-2 text-purple-600">
      <category-icon
        category="physical"
        :width="40"
        :height="40"
      />

      <category-icon
        :category="special"
        :width="40"
        :height="40"
      />

      <category-icon
        category="status"
        :width="40"
        :height="40"
      />

      <category-icon
        category="all"
        :width="40"
        :height="40"
      />

      <category-icon
        :category="{}"
        :width="40"
        :height="40"
      />

      <category-icon
        category="fail"
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

    <!-- CategoryLabel ------------------------->
    CategoryLabel
    <div class="box p-1 mb-2">
      <category-label category="physical" />

      <category-label :category="special" />

      <category-label :category="{}" />

      <category-label
        category="status"
        interactive
      />

      <category-label
        category="status"
        active
      />

      <category-label
        category="physical"
        hide-text
      />

      <div class="flex">
        <category-label category="physical" />

        <div class="flex-1" />

        <category-label
          category="special"
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

    <!-- CategoryPicker ------------------------>
    CategoryPicker

    <span v-if="category">{{ category.caption }}</span>

    <div class="box p-1 mb-2">
      <category-picker v-model="category" />

      <category-picker v-model="category">With Label</category-picker>

      <category-picker
        v-model="category"
        allow-clear
      >
        allowClear
      </category-picker>

      <category-picker
        v-model="category"
        show-all
      >
        showAll
      </category-picker>

      <category-picker
        v-model="category"
        allow-clear
        show-all
      >
        allowClear + showAll
      </category-picker>
    </div>
  </div>
</template>

<script>
  import data from '../services/data';
  import TypeIcon from '../components/TypeIcon';
  import CategoryIcon from '../components/CategoryIcon';
  import TypeLabel from '../components/TypeLabel';
  import CategoryLabel from '../components/CategoryLabel';
  import TypePicker from '../components/TypePicker';
  import CategoryPicker from '../components/CategoryPicker';

  export default {
    components: {
      TypeIcon,
      CategoryIcon,
      TypeLabel,
      CategoryLabel,
      TypePicker,
      CategoryPicker,
    },

    data() {
      return {
        type: null,
        category: null,
        water: data.getType('water'),
        special: data.getCategory('special'),
      };
    },
  };
</script>
