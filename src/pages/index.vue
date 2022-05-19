<script setup lang="ts">
/* eslint-disable no-console */
import type { DataTableBaseColumn, DataTableColumns } from 'naive-ui'
import type { WorkerHttpvfs } from 'sql.js-httpvfs'
import { useDbWorkerStore } from '~/stores/db'
import { useUserStore } from '~/stores/user'
import StringFilterMenu from '~/components/StringFilterMenu.vue'

const user = useUserStore()
const name = $ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}

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
  is_ma!: number
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
  get is_ma_display() { return this.is_ma ? 'Y' : null }

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
      3: '左 右',
      4: '後',
      5: '前 後 左 右',
      6: '前',
      7: '前 左 右',
      8: '後 左 右',
    }[dir]
  }
}

const workerStore = useDbWorkerStore()

let loading = $ref(true)
let units = $ref<Unit[]>([])
const pagination = reactive({
  itemCount: 0,
  page: 1,
  pageSize: 10,
  pageSizes: [10, 20],
  showSizePicker: true,
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
async function fetchData(worker: WorkerHttpvfs) {
  loading = true

  const { pageSize, page } = pagination
  units = (await worker!.db.query(`select * from units limit ${pageSize} offset ${pageSize * (page - 1)}`) as Partial<Unit>[])
    .map(record => new Unit(record))

  const { count } = (await worker!.db.query('select count(*) as count from units'))[0] as { count: number }
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

const nameColumn = reactive<DataTableBaseColumn<string | null>>({
  title: '名稱',
  key: 'name1',
  filter: true,
  filterOptionValue: null,
  renderFilterMenu: ({ hide }) => {
    return h(StringFilterMenu, {
      value: nameColumn.filterOptionValue,
      onClear: () => {
        nameColumn.filterOptionValue = null
        hide()
      },
      onConfirm: (v) => {
        nameColumn.filterOptionValue = v
        hide()
      },
    })
  },
})

const columns = reactive<DataTableColumns<Unit>>([
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
      { title: t('1武'), key: 'shield_dir_w1_display', align: 'right' },
      { title: t('2武'), key: 'shield_dir_w2_display', align: 'right' },
      { title: t('3武'), key: 'shield_dir_w3_display', align: 'right' },
      { title: t('4武'), key: 'shield_dir_w4_display', align: 'right' },
      { title: t('5武'), key: 'shield_dir_w5_display', align: 'right' },
    ],
  },
])
</script>

<template>
  <n-data-table
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
  />
</template>

<route lang="yaml">
meta:
  layout: default
</route>
