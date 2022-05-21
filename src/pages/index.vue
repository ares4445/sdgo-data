<script setup lang="ts">
/* eslint-disable no-console */
import type { DataTableBaseColumn, DataTableFilterState, DataTableSortState, PaginationProps } from 'naive-ui'
import { useDbWorkerStore } from '~/stores/db'
import type { AppTableColumns, FiltersRef, PaginationRef, SortRef } from '~/composables'
import { AppTableFilterType, useDataTable } from '~/composables'

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

const columnOptions: AppTableColumns = [
  { title: 'Rank', key: 'rank', displayKey: 'rank_display' },
  {
    title: '名稱',
    key: 'name1',
    width: 300,
    ellipsis: {
      tooltip: true,
    },
    filterType: AppTableFilterType.STRING,
    sorter: true,
  },
  { title: t('R後?'), key: 'is_inverse', displayKey: 'is_inverse_display', align: 'center' },
  { title: t('MA?'), key: 'is_ma', displayKey: 'is_ma_display', align: 'center' },
  { title: t('距離'), key: 'range', displayKey: 'range_display', align: 'center' },
  { title: t('血'), key: 'hp', align: 'right', filterType: AppTableFilterType.NUMBER },
  { title: t('索敵'), key: 'search_distance', align: 'right', filterType: AppTableFilterType.NUMBER },
  { title: t('攻'), key: 'attack', align: 'right', filterType: AppTableFilterType.NUMBER },
  { title: t('防'), key: 'defense', align: 'right', filterType: AppTableFilterType.NUMBER },
  { title: t('速'), key: 'speed', align: 'right', filterType: AppTableFilterType.NUMBER },
  { title: t('敏'), key: 'agility', align: 'right', filterType: AppTableFilterType.NUMBER },
  { title: t('耗氣'), key: 'boost', align: 'right', filterType: AppTableFilterType.NUMBER },
  {
    title: t('盾'),
    key: 'shield_group',
    align: 'center',
    sorter: false,
    children: [
      { title: t('盾'), key: 'shield', displayKey: 'shield_display', align: 'right', filterType: AppTableFilterType.NUMBER },
      { title: t('%'), key: 'shield_percent', displayKey: 'shield_percent_display', align: 'right', filterType: AppTableFilterType.NUMBER },
      { title: t('類型'), key: 'shield_type', displayKey: 'shield_type_display', align: 'right' },
      // { title: t('1武'), key: 'shield_dir_w1_display', align: 'center' },
      // { title: t('2武'), key: 'shield_dir_w2_display', align: 'center' },
      // { title: t('3武'), key: 'shield_dir_w3_display', align: 'center' },
      // { title: t('4武'), key: 'shield_dir_w4_display', align: 'center' },
      // { title: t('5武'), key: 'shield_dir_w5_display', align: 'center' },
    ],
  },
]

const paginationOptions: PaginationProps = {
  itemCount: 0,
  page: 1,
  pageSize: 20,
  pageSizes: [10, 20, 50],
  showSizePicker: true,
  pageSlot: 5,
}

const { filters, sort, pagination, columns } = useDataTable({
  columnOptions,
  paginationOptions,
  fetchFn: async (filters: FiltersRef, pagination: PaginationRef, sort: SortRef): Promise<void> => {
    await fetchData(filters, pagination, sort)
  },
})

async function fetchData(filters: FiltersRef, pagination: PaginationRef, sort: SortRef) {
  if (workerStore.worker === null)
    return

  const worker = workerStore.worker

  loading = true

  const wheres = Object.entries(filters.value)
    .filter(([_, v]) => !!v)
    .map(([field, v]) => {
      const { operator, value } = v!
      return `${field} ${operator} ${value}`
    })

  let where = ''
  if (wheres.length)
    where = `where ${wheres.join(' and ')}`

  let orderBy = ''
  const sortValue = sort.value
  if (sortValue && sortValue.length) {
    const orders = sortValue.map(({ columnKey, order }) => `${columnKey} ${order === 'ascend' ? 'asc' : 'desc'}`)
    orderBy = `order by ${orders.join(', ')}`
  }

  const { pageSize, page } = pagination
  units = (await worker!.db.query(`
  select * from units
  ${where}
  ${orderBy}
  limit ${pageSize} offset ${pageSize! * (page! - 1)}`) as Partial<Unit>[])
    .map(record => new Unit(record))

  const { count } = (await worker!.db.query(`
  select count(*) as count from units ${where}`))[0] as { count: number }
  pagination.itemCount = count

  loading = false
}
workerStore.$subscribe(() => fetchData(filters, pagination, sort))
onMounted(async () => {
  if (workerStore.worker === null || units.length > 0)
    return

  await fetchData(filters, pagination, sort)
})

function onFiltersChange(filters: DataTableFilterState, column: DataTableBaseColumn) {
  console.log('filters changed', filters, column)
}

function onSortersChange(sortState: DataTableSortState) {
  if (sortState.order === false) {
    sort.value = []
  }
  else {
    if (sortState.columnKey === 'rank') {
      sort.value = [
        { columnKey: 'rank', order: sortState.order },
        { columnKey: 'rank_suf', order: sortState.order },
      ]
    }
    else {
      sort.value = [sortState]
    }
  }
  fetchData(filters, pagination, sort)
}
</script>

<template>
  <n-tabs animated>
    <n-tab-pane name="sgnoodles" tab="星洲米粉 SGNoodles">
      <n-data-table
        remote
        :loading="loading"
        :columns="columns"
        :data="units"
        :pagination="pagination"
        pagination-behavior-on-filter="first"
        :theme-overrides="{
          tdPaddingMedium: '4px',
          tdPaddingLarge: '4px',
          thPaddingMedium: '4px',
          thPaddingLarge: '4px',
          thPaddingSmall: '4px',
          tdPaddingSmall: '4px',
        }"
        striped
        max-height="calc(100vh - 285px)"
        :on-update:filters="onFiltersChange"
        :on-update:sorter="onSortersChange"
        :scroll-x="1500"
      />
    </n-tab-pane>
    <n-tab-pane name="seal" tab="醬燒海豹 Sauce Burn Seal">
      <div>Coming Soon...</div>
    </n-tab-pane>
    <n-tab-pane name="original" tab="龜霸 Acguy / 國服 Original">
      <div>Coming Soon...</div>
    </n-tab-pane>
  </n-tabs>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
