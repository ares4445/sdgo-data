<script setup lang="ts">
/* eslint-disable no-console */
import type { DataTableBaseColumn, DataTableFilterState, DataTableSortState, PaginationProps } from 'naive-ui'
import { NImage } from 'naive-ui'
import { RouterLink } from 'vue-router'
import type { definitions } from 'types/supabase'
import type { AppTableColumns, Filter, FiltersRef, PaginationRef, SortRef } from '~/composables'
import { AppTableFilterType, useDataTable } from '~/composables'
import { Unit } from '~/models/unit'
import { useSupabase } from '~/stores/supabase'

const { t } = useI18n()

let loading = $ref(true)
let units = $ref<Unit[]>([])

const columnOptions: AppTableColumns = [
  { title: t('Rank'), key: 'rank', displayKey: 'rank_display' },
  {
    key: 'image',
    render: row => h(NImage, { src: `${window.location.origin}/${import.meta.env.BASE_URL}sgnoodles/units/${row.parent_unit_id || row.unit_id}-1.png`, width: 50, height: 50, objectFit: 'cover' }),
    sorter: false,
  },
  {
    title: t('名稱'),
    key: 'name1',
    width: 300,
    ellipsis: {
      tooltip: true,
    },
    filterType: AppTableFilterType.STRING,
    sorter: true,
    render: ({ unit_id, parent_unit_id, name1 }) => h(RouterLink, { to: `/unit/${parent_unit_id || unit_id}`, innerHTML: name1 }),
  },
  { title: t('R後?'), key: 'is_inverse', displayKey: 'is_inverse_display', align: 'center' },
  { title: t('MA?'), key: 'is_ma', displayKey: 'is_ma_display', align: 'center' },
  { title: t('距離'), key: 'range_type', displayKey: 'range_display', align: 'center' },
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
  fetchFn: query,
})

const { supabase } = useSupabase()
async function query(filters: FiltersRef, pagination: PaginationRef, sort: SortRef) {
  loading = true

  let query = supabase.from<definitions['units']>('units').select('*', { count: 'exact' })

  Object.entries({
    ...(filters.value),
    ...{ server_id: { operator: '=', value: 1 } },
  })
    .filter(([_, v]) => !!v)
    .forEach(([field, v]) => {
      const { operator, value } = v! as Filter
      switch (operator) {
        case '=':
          query = query.filter(field, 'eq', value)
          break
        case '<>':
          query = query.filter(field, 'not.eq', value)
          break
        case '>=':
          query = query.filter(field, 'gte', value)
          break
        case '>':
          query = query.filter(field, 'gt', value)
          break
        case '<=':
          query = query.filter(field, 'lte', value)
          break
        case '<':
          query = query.filter(field, 'lt', value)
          break
        case 'LIKE':
          query = query.ilike(field, value as string)
          break
        case 'BETWEEN':
          // eslint-disable-next-line no-case-declarations
          const values = value as unknown as number[]
          values.sort()
          query = query.filter(field, 'gte', values[0])
            .filter(field, 'lte', values[1])
          break
      }
    })

  const sortValue = sort.value
  if (sortValue && sortValue.length) {
    sortValue.forEach(({ columnKey, order }) => {
      query = query.order(columnKey, { ascending: order === 'ascend' })
    })
  }
  else {
    // default sort by id
    query = query.order('unit_id', { ascending: true })
  }

  const { pageSize, page } = pagination
  const from = (page! - 1) * pageSize!
  query = query.range(from, from + pageSize! - 1)

  const { data, count } = await query

  units = data!.map(record => new Unit(record))
  pagination.itemCount = count!

  loading = false
}

onMounted(async () => query(filters, pagination, sort))

function onFiltersChange(filters: DataTableFilterState, column: DataTableBaseColumn) {
  console.log('filters changed', filters, column)
}

function onSortersChange(sortState: DataTableSortState) {
  const { columnKey, order } = sortState

  if (order === false) {
    sort.value = []
  }
  else {
    if (columnKey === 'rank') {
      sort.value = [
        { columnKey: 'rank', order, sorter: true },
        { columnKey: 'rank_suf', order, sorter: true },
      ]
    }
    else if (columnKey === 'shield_percent' || columnKey === 'shield_type') {
      sort.value = [
        sortState,
        { columnKey: 'shield', order, sorter: true },
      ]
    }
    else {
      sort.value = [sortState]
    }
  }
  query(filters, pagination, sort)
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
