<script setup lang="ts">
import type { FilterOperator } from '~/composables'
import { FilterOperators } from '~/composables'

type FilterValue = number | Array<number | null | undefined> | null | undefined

const props = defineProps<{
  operator?: FilterOperator
  value?: number | Array<number | null> | null
}>()
const emit = defineEmits<{
  (e: 'clear'): void
  (e: 'confirm', operator: FilterOperator, value: FilterValue): void
}>()

const dataTableInjectionKey = 'n-data-table'
const {
  localeRef: locale,
  mergedClsPrefixRef: clsPrefix,
  filterMenuCssVarsRef: filterMenuCssVars,
} = inject(dataTableInjectionKey)!

const operatorValue = $ref<FilterOperator | undefined>(props.operator)
const numberOperators = ['=', '<>', '>', '<', '>=', '<=', 'BETWEEN']
const operatorOptions = FilterOperators.filter(opt => numberOperators.includes(opt))

let filterValue = $ref<FilterValue>(props.value)

const input = $ref<HTMLInputElement | null>(null)
watch(() => operatorValue, (operator, oldOperator) => {
  if (!operator)
    return

  if (operator === 'BETWEEN')
    filterValue = [undefined, undefined]
  else
    filterValue = undefined

  setTimeout(() => input?.focus(), 100)
})

function onConfirm() {
  if (!operatorValue || filterValue === null)
    return

  emit('confirm', operatorValue, filterValue)
}
</script>

<template>
  <div :class="`${clsPrefix}-data-table-filter-menu`" :style="filterMenuCssVars">
    <form @submit.prevent="onConfirm">
      <div class="p-2">
        <n-space item-style="display: flex; align-items: center">
          <n-radio-group v-model:value="operatorValue">
            <n-space vertical>
              <n-radio-button
                v-for="opt in operatorOptions"
                :key="opt"
                :value="opt"
                :label="opt === '<>' ? '≠' : opt "
              />
            </n-space>
          </n-radio-group>
          <n-space vertical>
            <n-input-number
              v-if="operatorValue !== 'BETWEEN'"
              ref="input"
              v-model:value="filterValue"
              :disabled="operatorValue === undefined"
            />
            <template v-else>
              <n-input-number
                ref="input"
                v-model:value="filterValue[0]"
              />

              <div text-center>
                and
              </div>

              <n-input-number
                v-model:value="filterValue[1]"
              />
            </template>
          </n-space>
        </n-space>
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

<style scoped>
.n-radio-button {
  width: 100%
}
.n-radio-button:deep() .n-radio__label {
  text-align: center
}
</style>
