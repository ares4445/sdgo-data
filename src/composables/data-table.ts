/* eslint-disable no-console */
import type { DataTableBaseColumn, DataTableSortState, EllipsisProps, PaginationProps } from 'naive-ui'
import type { HTMLAttributes, Ref, UnwrapNestedRefs, UnwrapRef, VNodeChild } from 'vue'
import type { TableBaseColumn, TableExpandColumn, TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import StringFilterMenu from '~/components/StringFilterMenu.vue'
import NumberFilterMenu from '~/components/NumberFilterMenu.vue'

type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export declare type ColumnKey = string | number
export declare type FilterOptionValue = string | number
export type InternalRowData = Record<string, unknown>
export interface CommonColumnInfo<T = InternalRowData> {
  fixed?: 'left' | 'right'
  width?: number | string
  minWidth?: number | string
  className?: string
  align?: 'left' | 'center' | 'right'
  ellipsis?: boolean | EllipsisProps
  cellProps?: (rowData: T, rowIndex: number) => HTMLAttributes
}
export declare type TableColumnGroup<T = InternalRowData> = {
  title?: string | ((column: TableColumnGroup) => VNodeChild)
  type?: never
  key: ColumnKey
  children: Array<DataTableBaseColumn<T>>
  filterOptions?: never
} & CommonColumnInfo<T>

export enum AppTableFilterType {
  STRING = 'string',
  NUMBER = 'number',
  CUSTOM = 'custom',
}
export declare interface AppTableColumnExtra {
  key: ColumnKey
  displayKey?: string | number
  filterType?: AppTableFilterType

  filter?: boolean
  filterOptionValue?: FilterOptionValue | null
  renderFilterMenu?: (actions: {
    hide: () => void
  }) => VNodeChild
}
export declare type AppTableColumn<T = InternalRowData> =
  | (TableBaseColumn<T> & AppTableColumnExtra)
  | (TableColumnGroup<T> & AppTableColumnExtra)
  | (TableSelectionColumn<T> & AppTableColumnExtra)
  | (TableExpandColumn<T> & AppTableColumnExtra)
export declare type AppTableColumns<T = InternalRowData> = Array<AppTableColumn<T>>

export const FilterOperators = ['=', '<>', '>=', '>', '<=', '<', 'LIKE', 'BETWEEN', 'IN'] as const
export declare type FilterOperator = typeof FilterOperators[number]
export declare interface Filter {
  operator: FilterOperator
  value: string | number | Array<string | number>
}
export declare type Filters = Record<string, Filter | undefined>
export declare type FiltersRef = Ref<UnwrapRef<Filters>>
export declare type PaginationRef = UnwrapNestedRefs<Writeable<PaginationProps>>
export declare type SortRef = Ref<UnwrapRef<DataTableSortState | undefined>>
export declare type FetchFn = (filters: FiltersRef, pagination: PaginationRef, sort: SortRef) => Promise<void>

export declare interface UseDataTableOptions<T = InternalRowData> {
  columnOptions: AppTableColumns<T>
  paginationOptions: Writeable<PaginationProps>
  fetchFn: FetchFn
}
export function useDataTable<T = InternalRowData>({
  columnOptions,
  paginationOptions,
  fetchFn,
}: UseDataTableOptions<T>) {
  const filters = ref<Filters>({})
  const sort = ref<DataTableSortState>()
  const pagination = createPagination(paginationOptions, filters, sort, fetchFn)

  const columns = reactive<AppTableColumns<T>>(
    columnOptions.map(option => createColumn<T>(option, filters)),
  )

  // on filters changed, fetch data
  watch(filters, async () => {
    console.log('filters changed, fetch now')
    await fetchFn(filters, pagination, sort)
  })

  return {
    filters,
    sort,
    pagination,
    columns,
  }
}

function createColumn<T>(opt: AppTableColumn<T>, filters: FiltersRef) {
  const options = { ...opt }
  if (options.filterType) {
    options.filter = true
    options.filterOptionValue = null
    options.renderFilterMenu = undefined
  }

  if (options.sorter === undefined && options.children === undefined)
    options.sorter = true

  if (options.children && Array.isArray(options.children))
    options.children = options.children.map(opt => createColumn(opt, filters))

  if (options.render === undefined && options.displayKey)
    options.render = row => row[options.displayKey]

  const reactiveColumn = reactive<AppTableColumn<T>>(options)

  switch (options.filterType) {
    case AppTableFilterType.STRING:
      reactiveColumn.renderFilterMenu = ({ hide }) => renderStringFilterMenu<T>(reactiveColumn, filters, hide)
      break
    case AppTableFilterType.NUMBER:
      reactiveColumn.renderFilterMenu = ({ hide }) => renderNumberFilterMenu<T>(reactiveColumn, filters, hide)
      break
  }

  return reactiveColumn
}

function renderStringFilterMenu<T>(
  reactiveColumn: UnwrapNestedRefs<AppTableColumn<T>>,
  filters: FiltersRef,
  hide: () => void,
): VNodeChild {
  return h(StringFilterMenu, {
    value: reactiveColumn.filterOptionValue,
    onClear: () => {
      reactiveColumn.filterOptionValue = null
      setFilter(
        filters,
        reactiveColumn.key,
        undefined,
      )
      hide()
    },
    onConfirm: (v: FilterOptionValue | null | undefined) => {
      reactiveColumn.filterOptionValue = v
      setFilter(
        filters,
        reactiveColumn.key,
        v ? { operator: 'LIKE', value: `"%${v}%"` } : undefined,
      )
      hide()
    },
  })
}

function renderNumberFilterMenu<T>(
  reactiveColumn: UnwrapNestedRefs<AppTableColumn<T>>,
  filters: FiltersRef,
  hide: () => void,
): VNodeChild {
  return h(NumberFilterMenu, {
    operator: reactiveColumn.filterOptionValue?.operator,
    value: reactiveColumn.filterOptionValue?.value,
    onClear: () => {
      reactiveColumn.filterOptionValue = null
      setFilter(
        filters,
        reactiveColumn.key,
        undefined,
      )
      hide()
    },
    onConfirm: (operator: FilterOperator, value: FilterOptionValue | null | undefined) => {
      reactiveColumn.filterOptionValue = { operator, value }
      setFilter(
        filters,
        reactiveColumn.key,
        { operator, value: Array.isArray(value) ? value.join(' and ') : value },
      )
      hide()
    },
  })
}

function setFilter(filters: FiltersRef, key: ColumnKey, value?: Filter) {
  filters.value = {
    ...filters.value,
    [key]: value,
  }
}

function createPagination(options: Writeable<PaginationProps>, filters: FiltersRef, sort: SortRef, fetchFn: FetchFn): PaginationRef {
  const pagination = reactive<Writeable<PaginationProps>>({
    ...options,
    onUpdatePage: async (page) => {
      pagination.page = page
      await fetchFn(filters, pagination, sort)
    },
    onUpdatePageSize: async (pageSize) => {
      pagination.pageSize = pageSize
      pagination.page = 1
      await fetchFn(filters, pagination, sort)
    },
  })

  return pagination
}

