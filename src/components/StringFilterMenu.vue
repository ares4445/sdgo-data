<script setup lang="ts">
const props = defineProps<{
  value: string | null | undefined
}>()
const emit = defineEmits<{
  (e: 'clear'): void
  (e: 'confirm', filter: string | null | undefined): void
}>()

const dataTableInjectionKey = 'n-data-table'
const {
  localeRef: locale,
  mergedClsPrefixRef: clsPrefix,
  filterMenuCssVarsRef: filterMenuCssVars,
} = inject(dataTableInjectionKey)!

const filterValue = $ref(props.value)
const propsValue = computed(() => filterValue === '' ? null : filterValue)

const input = $ref<HTMLInputElement | null>(null)
onMounted(() => input!.focus())

function onConfirm() {
  emit('confirm', filterValue === '' ? null : filterValue)
}
</script>

<template>
  <div :class="`${clsPrefix}-data-table-filter-menu`" :style="filterMenuCssVars">
    <form @submit.prevent="onConfirm">
      <div class="p-2">
        <n-input ref="input" :value="propsValue" @input="(v) => filterValue = v" />
      </div>
    </form>

    <div :class="`${clsPrefix}-data-table-filter-menu__action`">
      <n-button @click="emit('clear')">
        {{ locale.clear }}
      </n-button>
      <n-button @click="onConfirm">
        {{ locale.confirm }}
      </n-button>
    </div>
  </div>
</template>
