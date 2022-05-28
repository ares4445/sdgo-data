import type { definitions } from 'types/supabase'

export type WeaponType = 1 | 2 | 3
export type WeaponRangeType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type WeaponDamageType = 0 | 1 | 2 | 3

export class Weapon implements definitions.weapons {
  constructor(data: Partial<Weapon>) {
    Object.assign(this, data)
  }

  id!: number
  weapon_id!: number
  parent_unit_id!: number
  slot!: number

  weapon_name!: string
  weapon_type!: WeaponType
  range_type!: WeaponRangeType
  damage_type!: number

  damage!: number
  projectile_speed!: number
  weapon_range!: number
  animation_speed!: number
  no_melee_dash!: number
  no_continuous_reload!: number
  ammo!: number
  reload!: number
  interval!: number

  is_knockdown_lasthit_diff!: number
  knockdown!: number
  knockdown_lasthit!: number

  hitbox_x!: number
  hitbox_y!: number
  hitbox_z!: number
  hitbox_splash!: number

  shots!: number

  get weapon_type_display() {
    return { 1: '普通武器', 2: 'SP', 3: '補血' }[this.weapon_type]
  }

  get range_type_display() {
    return {
      1: '近',
      2: '中',
      3: '遠',
      4: '浮游',
      5: '浮游刃',
      6: '防禦浮游',
      7: '反射浮游',
      8: '突進',
    }[this.range_type]
  }

  get damage_type_display() {
    return {
      0: 'sp',
      1: '近戰',
      2: '實彈',
      3: '光束',
    }[this.damage_type]
  }
}
