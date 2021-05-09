<template>
  <div >
    <initialPages v-if="$route.meta.layout === 'initial'"/>
    <innerPages v-else-if="$route.meta.layout === 'inner'"/>
  </div>
</template>

<script>
  import InitialPages from './InitialPagesLayout.vue'
  import InnerPages from './InnerPagesLayout.vue'

  export default {
    components: {
      'initialPages': InitialPages,
      'innerPages': InnerPages,
    }
  }

</script>