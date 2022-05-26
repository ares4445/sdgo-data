<script setup lang="ts">
/* eslint-disable no-console */
import { Unit } from '~/models/unit'
import { Weapon } from '~/models/weapon'
import { useDbWorkerStore } from '~/stores/db'

const props = defineProps<{ id: string }>()

const workerStore = useDbWorkerStore()

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

  weapons.forEach(weapon => result[weapon.unit_id][weapon.slot] = weapon)

  return result
})
const shield_dir_diff = computed(() => units?.[0]?.shield_dir_diff || units?.[1]?.shield_dir_diff)

async function query() {
  if (workerStore.loading || workerStore.worker === undefined)
    return

  const unitSql = `
select * from units
where id = ${props.id} or parent_unit_id = ${props.id}
order by is_inverse
`
  units = (await workerStore.worker!.db.query(unitSql) as Partial<Unit>[])
    .map(record => new Unit(record))

  const unitIds = units.map(unit => unit.id).join(', ')

  const weaponsSql = `
select * from weapons
where unit_id in (${unitIds})
order by unit_id, slot
`
  weapons = (await workerStore.worker!.db.query(weaponsSql) as Partial<Weapon>[])
    .map(record => new Weapon(record))
}
workerStore.$subscribe(() => query())
onMounted(() => query())
</script>

<template>
  <div v-if="units?.length" class="text-left">
    <div class="grid gap-4" style="grid-template-columns: auto auto 1fr">
      <n-image :src="`/sdgo-data/sgnoodles/units/${units[0].id}-1.png`" />
      <n-image :src="`/sdgo-data/sgnoodles/units/${units[0].id}-2.png`" />
      <div class="flex flex-col">
        <h2 class="m0">
          {{ units[0].name1 }}
        </h2>
        <div style="font-size: 0.9em;">
          {{ units[0].name2 }}
        </div>
        <div style="font-size: 0.9em;">
          ID:
          <span>{{ units[0].id }}(0x{{ units[0].id.toString(16) }})</span>
          <span v-if="units.length > 1" template> / {{ units[1].id }}(0x{{ units[1].id.toString(16) }})</span>
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
    <table class="table table-fixed w-full text-center mt-4">
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
            索敵距離
          </th>
          <th rowspan="2">
            攻擊
          </th>
          <th rowspan="2">
            防禦
          </th>
          <th rowspan="2">
            速度
          </th>
          <th rowspan="2">
            敏捷
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
          <td>{{ unit.attack }}</td>
          <td>{{ unit.defense }}</td>
          <td>{{ unit.speed }}</td>
          <td>{{ unit.agility }}</td>
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
    </table>
    <div class="grid mt-4" style="grid-auto-flow: column dense; grid-template-rows: repeat(3, auto);grid-template-columns: auto 1fr 1fr">
      <div class="border p-2">
        武器1
      </div>
      <div class="border p-2">
        武器2
      </div>
      <div class="border p-2">
        武器3
      </div>
      <template v-for="unit in units" :key="unit.id">
        <div v-for="(weapon, slot) in weaponsView[unit.id]" :key="`${unit.id}-${slot}`" class="border p-2">
          <template v-if="weapon">
            <div class="grid grid-cols-4">
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
table {
  border-spacing: 0;
  border-collapse: collapse;
}
th, td {
  border: 1px solid;
  padding: 0;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
