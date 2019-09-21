<template>
  <div>
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
      <div class="flex">
        <type-label type="dragon" />
        <div class="flex-1" />
        <type-label
          type="electric"
          hide-text
        />
      </div>
    </div>

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
  </div>
</template>

<script>
  import data from '../services/data';
  import TypeIcon from '../components/TypeIcon';
  import CategoryIcon from '../components/CategoryIcon';
  import TypeLabel from '../components/TypeLabel';
  import CategoryLabel from '../components/CategoryLabel';

  export default {
    components: {
      TypeIcon,
      CategoryIcon,
      TypeLabel,
      CategoryLabel,
    },

    data() {
      return {
        water: data.getType('water'),
        special: data.getCategory('special'),
      };
    },
  };
</script>
