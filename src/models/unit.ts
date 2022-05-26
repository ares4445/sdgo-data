export type RankType = 1 | 2 | 3 | 4
export type RankSufType = 1 | 2 | 3 | 4 | 5
export type RangeType = 0 | 1 | 2

export class Unit {
  constructor(data: Partial<Unit>) {
    Object.assign(this, data)
  }

  id!: number
  server_id!: number

  name1!: String
  name2!: String
  is_hidden!: number
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
  search_distance!: number

  shield!: number
  shield_percent!: number
  shield_type!: number
  shield_dir_w1!: number
  shield_dir_w2!: number
  shield_dir_w3!: number
  shield_dir_w4!: number
  shield_dir_w5!: number

  get is_inverse_display() { return this.is_inverse ? '✓' : null }
  get is_ma_display() { return this.is_ma ? '✓' : null }
  get is_hidden_display() { return this.is_hidden ? '✓' : null }

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
