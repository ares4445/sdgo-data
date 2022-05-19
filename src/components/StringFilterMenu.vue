<script setup lang="ts">
const props = defineProps<{
  value: string | null
}>()
const emit = defineEmits<{
  (e: 'clear'): void
  (e: 'confirm', filter: string | null): void
}>()

const dataTableInjectionKey = 'n-data-table'
const {
  localeRef: locale,
  mergedClsPrefixRef: clsPrefix,
  filterMenuCssVarsRef: filterMenuCssVars,
} = inject(dataTableInjectionKey)!

const filterValue = $ref(props.value)
const propsValue = computed(() => filterValue === '' ? null : filterValue)
</script>

<template>
  <div :class="`${clsPrefix}-data-table-filter-menu`" :style="filterMenuCssVars">
    <div class="p-2">
      <n-input :value="propsValue" @input="(v) => filterValue = v" />
    </div>

    <div :class="`${clsPrefix}-data-table-filter-menu__action`">
      <n-button @click="emit('clear')">
        {{ locale.clear }}
      </n-button>
      <n-button @click="emit('confirm', filterValue)">
        {{ locale.confirm }}
      </n-button>
    </div>
  </div>
</template>
