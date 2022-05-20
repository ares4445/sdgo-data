<script setup lang="ts">
/* eslint-disable no-console */
import type { DataTableBaseColumn, DataTableColumns, DataTableFilterState } from 'naive-ui'
import type { WorkerHttpvfs } from 'sql.js-httpvfs'
import type { FilterOptionValue } from 'naive-ui/es/data-table/src/interface'
import { useDbWorkerStore } from '~/stores/db'
import StringFilterMenu from '~/components/StringFilterMenu.vue'

const { t } = useI18n()

type RankType = 1 | 2 | 3 | 4
type RankSufType = 1 | 2 | 3 | 4 | 5
type RangeType = 0 | 1 | 2

class Unit {
  constructor(data: Partial<Unit>) {
    Object.assign(this, data)
  }

  id!: number
  name1!: String
  is_inverse!: number
  ma!: number
  rank!: RankType
  rank_suf!: RankSufType
  range_type!: RangeType
  hp!: number
  attack!: number
  defense!: number
  speed!: number
  agility!: number
  boost!: number

  shield!: number
  shield_percent!: number
  shield_type!: number
  shield_dir_w1!: number
  shield_dir_w2!: number
  shield_dir_w3!: number
  shield_dir_w4!: number
  shield_dir_w5!: number

  get is_inverse_display() { return this.is_inverse ? '✓' : null }
  get is_ma_display() { return this.ma ? '✓' : null }

  get rank_display() {
    return { 1: 'C', 2: 'B', 3: 'A', 4: 'S' }[this.rank] + { 1: '', 2: '', 3: 'S', 4: 'R', 5: 'U' }[this.rank_suf]
  }

  get range_display() {
    return { 0: '近', 1: '中', 2: '遠' }[this.range_type]
  }

  get shield_display() { return this.shield || null }
  get shield_percent_display() { return this.shield_percent || null }
  get shield_type_display() { return this.shield ? { 0: '全部', 3: '光束' }[this.shield_type] : null }

  get shield_dir_w1_display() { return this.shieldDir(this.shield_dir_w1) }
  get shield_dir_w2_display() { return this.shieldDir(this.shield_dir_w2) }
  get shield_dir_w3_display() { return this.shieldDir(this.shield_dir_w3) }
  get shield_dir_w4_display() { return this.shieldDir(this.shield_dir_w4) }
  get shield_dir_w5_display() { return this.shieldDir(this.shield_dir_w5) }

  shieldDir(dir: number) {
    return {
      1: '左',
      2: '右',
      3: '左右',
      4: '後',
      5: '前後左右',
      6: '前',
      7: '前左右',
      8: '後左右',
    }[dir]
  }
}

const workerStore = useDbWorkerStore()

let loading = $ref(true)
let units = $ref<Unit[]>([])
const pagination = reactive({
  itemCount: 0,
  page: 1,
  pageSize: 20,
  pageSizes: [10, 20, 50],
  showSizePicker: true,
  pageSlot: 5,
  onChange: async (page: number) => {
    pagination.page = page
    await fetchData(workerStore.worker!)
  },
  onUpdatePageSize: async (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    await fetchData(workerStore.worker!)
  },
})
let filters = $ref<Record<string, { operator: string; value: string | number } | undefined>>({})
async function fetchData(worker: WorkerHttpvfs) {
  loading = true

  const wheres = Object.entries(filters)
    .filter(([_, v]) => !!v)
    .map(([field, { operator, value }]) => `${field} ${operator} ${value}`)

  let where = ''
  if (wheres.length)
    where = `where ${wheres.join(' and ')}`

  const { pageSize, page } = pagination
  units = (await worker!.db.query(`
  select * from units
  ${where}
  limit ${pageSize} offset ${pageSize * (page - 1)}`) as Partial<Unit>[])
    .map(record => new Unit(record))

  const { count } = (await worker!.db.query(`
  select count(*) as count from units ${where}`))[0] as { count: number }
  pagination.itemCount = count

  loading = false
}
workerStore.$subscribe(async (_, { w }) => {
  if (w === null)
    return

  await fetchData(w)
})
onMounted(async () => {
  if (workerStore.worker === null || units.length > 0)
    return

  await fetchData(workerStore.worker)
})
watch(() => filters, async () => {
  pagination.page = 1
  await fetchData(workerStore.worker!)
  console.log('filters changed, fetched')
})

const dataTable = $ref(null)

function createNameColumn(): DataTableBaseColumn {
  return {
    title: '名稱',
    key: 'name1',
    width: 300,
    ellipsis: {
      tooltip: true,
    },
    filter: true,
    filterOptionValue: null,
    renderFilterMenu: undefined,
  }
}

const nameColumn = reactive<DataTableBaseColumn>(createNameColumn())
nameColumn.renderFilterMenu = ({ hide }) => {
  return h(StringFilterMenu, {
    value: nameColumn.filterOptionValue,
    onClear: () => {
      nameColumn.filterOptionValue = null
      filters = {
        ...filters,
        [nameColumn.key]: undefined,
      }
      hide()
    },
    onConfirm: (v: FilterOptionValue | null | undefined) => {
      nameColumn.filterOptionValue = v
      filters = {
        ...filters,
        [nameColumn.key]: v ? { operator: 'LIKE', value: `"%${v}%"` } : undefined,
      }
      hide()
    },
  })
}

const columns = reactive<DataTableColumns>([
  { title: 'Rank', key: 'rank_display' },
  nameColumn,
  { title: t('R後?'), key: 'is_inverse_display', align: 'center' },
  { title: t('MA?'), key: 'is_ma_display', align: 'center' },
  { title: t('距離'), key: 'range_display', align: 'center' },
  { title: t('血'), key: 'hp', align: 'right' },
  { title: t('索敵'), key: 'search_distance', align: 'right' },
  { title: t('攻'), key: 'attack', align: 'right' },
  { title: t('防'), key: 'defense', align: 'right' },
  { title: t('速'), key: 'speed', align: 'right' },
  { title: t('敏'), key: 'agility', align: 'right' },
  { title: t('氣槽'), key: 'boost', align: 'right' },
  {
    title: t('盾'),
    key: 'shield_group',
    align: 'center',
    children: [

      { title: t('盾'), key: 'shield_display', align: 'right' },
      { title: t('%'), key: 'shield_percent_display', align: 'right' },
      { title: t('類型'), key: 'shield_type_display', align: 'right' },
      { title: t('1武'), key: 'shield_dir_w1_display', align: 'center' },
      { title: t('2武'), key: 'shield_dir_w2_display', align: 'center' },
      { title: t('3武'), key: 'shield_dir_w3_display', align: 'center' },
      { title: t('4武'), key: 'shield_dir_w4_display', align: 'center' },
      { title: t('5武'), key: 'shield_dir_w5_display', align: 'center' },
    ],
  },
])

function onFiltersChange(filters: DataTableFilterState, column: DataTableBaseColumn) {
  console.log('filters changed', filters, column)
}
</script>

<template>
  <n-data-table
    ref="dataTable"
    remote
    :loading="loading"
    :columns="columns"
    :data="units"
    :pagination="pagination"
    :theme-overrides="{
      tdPaddingMedium: '4px',
      tdPaddingLarge: '4px',
      thPaddingMedium: '4px',
      thPaddingLarge: '4px',
      thPaddingSmall: '4px',
      tdPaddingSmall: '4px',
    }"
    striped
    max-height="calc(100vh - 240px)"
    :on-update:filters="onFiltersChange"
  />
</template>

<route lang="yaml">
meta:
  layout: default
</route>
