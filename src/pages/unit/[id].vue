<script setup lang="ts">
/* eslint-disable no-console */
import { useLoadingBar } from 'naive-ui';
import type { definitions } from 'types/supabase'
import { Unit } from '~/models/unit'
import { Weapon } from '~/models/weapon'
import { useSupabase } from '~/stores/supabase'

const props = defineProps<{ id: string }>()

const { supabase } = useSupabase()
const loading = useLoadingBar()

let units = $ref<Unit[]>([])
let weapons = $ref<Weapon[]>([])
const weaponsView = computed(() => {
  const result: Record<number, Record<number, Weapon | undefined>> = {}

  units.forEach((unit) => {
    result[unit.id] = {
      0: undefined,
      1: undefined,
      2: undefined,
    }
  })

  weapons.forEach(weapon => result[weapon.parent_unit_id][weapon.slot] = weapon)

  return result
})
const shield_dir_diff = computed(() => units?.[0]?.shield_dir_diff || units?.[1]?.shield_dir_diff)

async function query() {
  loading.start()

  const { data: unitsData } = await supabase.from<definitions['units']>('units')
    .select('*')
    .or(`unit_id.eq.${props.id},parent_unit_id.eq.${props.id}`)
    .order('is_inverse', { ascending: true })
  units = unitsData!.map(record => new Unit(record))

  const unitIds = units.map(unit => unit.id)

  const { data: weaponsData } = await supabase.from<definitions['weapons']>('weapons')
    .select('*')
    .in('parent_unit_id', unitIds)
    .order('parent_unit_id')
    .order('slot')
  weapons = weaponsData!.map(record => new Weapon(record))

  loading.finish()
}

onMounted(() => query())

const base = `${window.location.origin}/${import.meta.env.BASE_URL}`
const image1 = computed(() => `${base}sgnoodles/units/${props.id}-1.png`)
const image2 = computed(() => `${base}sgnoodles/units/${props.id}-2.png`)
</script>

<template>
  <div v-if="units?.length" class="unit-detail text-left">
    <div class="title-grid grid gap-4">
      <n-image :src="image1" object-fit="scale-down" />
      <n-image class="xs-display-none" :src="image2" object-fit="scale-down" />
      <div class="flex flex-col">
        <h2 class="m0">
          {{ units[0].name1 }}
        </h2>
        <div style="font-size: 0.9em;">
          {{ units[0].name2 }}
        </div>
        <div style="font-size: 0.9em;">
          ID:
          <span>{{ units[0].unit_id }}(0x{{ units[0].unit_id.toString(16) }})</span>
          <span v-if="units.length > 1" template> / {{ units[1].unit_id }}(0x{{ units[1].unit_id.toString(16) }})</span>
        </div>
        <div class="mt-1">
          Rank: {{ units[0].rank_display }}
        </div>
        <div>距離: {{ units[0].range_display }}</div>
        <div v-if="units[0].is_hidden">
          不在"機體一覽"
        </div>
      </div>
    </div>
    <div class="table-container">
      <n-table
        class="table text-center mt-4" size="small"
        :theme-overrides="{
          thPaddingSmall: '0 4px',
          tdPaddingSmall: '0 4px',
        }"
      >
        <thead>
          <tr>
            <th v-if="units.length > 1" rowspan="2" />
            <th rowspan="2">
              MA?
            </th>
            <th rowspan="2">
              血量
            </th>
            <th rowspan="2">
              索敵
            </th>
            <th rowspan="2">
              <span color-red>攻擊</span>
            </th>
            <th rowspan="2">
              <span color-blue>防禦</span>
            </th>
            <th rowspan="2">
              速度
            </th>
            <th rowspan="2">
              <span color-green>敏捷</span>
            </th>
            <th rowspan="2">
              耗氣
            </th>
            <th :colspan="shield_dir_diff ? 8 : 4">
              盾
            </th>
          </tr>
          <tr>
            <th>盾</th>
            <th>%</th>
            <th>類型</th>
            <template v-if="shield_dir_diff">
              <th>1武</th>
              <th>2武</th>
              <th>3武</th>
              <th>4武</th>
              <th>5武</th>
            </template>
            <th v-else>
              方向
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unit in units" :key="unit.id">
            <th v-if="units.length > 1">
              {{ unit.is_inverse ? 'R後' : null }}
            </th>
            <td>{{ unit.is_ma_display }}</td>
            <td>{{ unit.hp }}</td>
            <td>{{ unit.search_distance }}</td>
            <td>
              <span color-red>{{ unit.attack }}</span>
            </td>
            <td>
              <span color-blue>{{ unit.defense }}</span>
            </td>
            <td>{{ unit.speed }}</td>
            <td>
              <span color-green>{{ unit.agility }}</span>
            </td>
            <td>{{ unit.boost }}</td>
            <td>{{ unit.shield_display }}</td>
            <td>{{ unit.shield_percent_display }}</td>
            <td>{{ unit.shield_type_display }}</td>
            <td><shield-dir v-if="unit.shield" :dirs="unit.w1_shield_dirs" /></td>
            <template v-if="shield_dir_diff">
              <td><shield-dir :dirs="unit.w2_shield_dirs" /></td>
              <td><shield-dir :dirs="unit.w3_shield_dirs" /></td>
              <td><shield-dir :dirs="unit.w4_shield_dirs" /></td>
              <td><shield-dir :dirs="unit.w5_shield_dirs" /></td>
            </template>
          </tr>
        </tbody>
      </n-table>
    </div>
    <div class="weapons-grid grid grid-cols-1 mt-4">
      <template v-for="unit in units" :key="unit.id">
        <div v-if="units.length > 1" class="p-2 text-center">
          {{ unit.is_inverse ? 'R後' : 'R前' }}
        </div>
        <div v-for="(weapon, slot) in weaponsView[unit.id]" :key="`${unit.id}-${slot}`" class="border p-2">
          <template v-if="weapon">
            <div class="grid grid-cols-2">
              <span class="font-600">{{ weapon.weapon_name }}</span>
              <div>
                <n-tag size="small">
                  {{ weapon.range_type_display }}
                </n-tag>
                <n-tag size="small" class="ml-1">
                  {{ weapon.damage_type_display }}
                </n-tag>
                <n-tag v-if="weapon.weapon_type === 3" size="small" class="ml-1">
                  {{ weapon.weapon_type_display }}
                </n-tag>
              </div>
            </div>
            <div class="grid grid-cols-4">
              <div>係數: <span>{{ weapon.damage }}</span><span v-if="weapon.shots > 1">x{{ weapon.shots }}</span></div>
              <div>攻速: {{ weapon.animation_speed.toFixed(2) }}</div>
              <div>距離: {{ weapon.weapon_range }}</div>
              <div>間隔: {{ weapon.interval }}</div>
              <div>
                <span>彈藥: </span>
                <span>{{ weapon.ammo }}</span>
                <n-tag v-if="weapon.no_continuous_reload" size="small" class="ml-1">
                  殘彈
                </n-tag>
              </div>
              <div>回彈: {{ weapon.reload }}</div>
              <div>
                <span>倒地: </span>
                <span>{{ weapon.knockdown }}</span>
                <span v-if="weapon.is_knockdown_lasthit_diff">[{{ weapon.knockdown_lasthit }}]</span>
              </div>
              <div>彈速: {{ weapon.projectile_speed }}</div>
              <div>x判定: {{ weapon.hitbox_x }}</div>
              <div>y判定: {{ weapon.hitbox_x }}</div>
              <div>z判定: {{ weapon.hitbox_x }}</div>
              <div>濺射: {{ weapon.hitbox_splash }}</div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
}
@media (min-width: 640px) {
  .table-container {
    width: 100%;
    overflow-x: visible;
  }
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}
@media (min-width: 640px) {
  table {
    min-width: 100%;
    table-layout: fixed;
  }
}
/* th, td {
  border: 1px solid;
  padding: 0 0.5em;
} */

.xs-display-none {
  display: none;
}
@media (min-width: 640px) {
  .xs-display-none {
    display: inherit;
  }
}

.title-grid {
  grid-template-columns: auto auto 1fr;
}
@media (min-width: 640px) {
  .title-grid {
    grid-template-columns: auto auto 1fr;
  }
}

.weapons-grid {
  grid-auto-flow: column dense;
  grid-template-rows: repeat(8, auto);
}
@media (min-width: 640px) {
  .weapons-grid {
    grid-template-rows: repeat(4, auto);
    grid-template-columns: 1fr 1fr;
  }
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
