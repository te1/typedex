<template>
  <div>
    TypeIcon
    <div class="box flex p-1 mb-2 text-yellow-700">
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

    CategoryIcon
    <div class="box flex p-1 mb-2 text-yellow-700">
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
    </div>
  </div>
</template>

<script>
  import data from '../services/data';
  import TypeIcon from '../components/TypeIcon';
  import CategoryIcon from '../components/CategoryIcon';
  import TypeLabel from '../components/TypeLabel';

  export default {
    components: {
      TypeIcon,
      CategoryIcon,
      TypeLabel,
    },

    data() {
      return {
        water: data.getType('water'),
        special: data.getCategory('special'),
      };
    },
  };
</script>
