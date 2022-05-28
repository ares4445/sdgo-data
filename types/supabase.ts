/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/': {
    get: {
      responses: {
        /** OK */
        200: unknown
      }
    }
  }
  '/servers': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.servers.id']
          name?: parameters['rowFilter.servers.name']
          /** Filtering Columns */
          select?: parameters['select']
          /** Ordering */
          order?: parameters['order']
          /** Limiting and Pagination */
          offset?: parameters['offset']
          /** Limiting and Pagination */
          limit?: parameters['limit']
        }
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range']
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit']
          /** Preference */
          Prefer?: parameters['preferCount']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['servers'][]
        }
        /** Partial Content */
        206: unknown
      }
    }
    post: {
      parameters: {
        body: {
          /** servers */
          servers?: definitions['servers']
        }
        query: {
          /** Filtering Columns */
          select?: parameters['select']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** Created */
        201: unknown
      }
    }
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.servers.id']
          name?: parameters['rowFilter.servers.name']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.servers.id']
          name?: parameters['rowFilter.servers.name']
        }
        body: {
          /** servers */
          servers?: definitions['servers']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
  }
  '/units': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.units.id']
          unit_id?: parameters['rowFilter.units.unit_id']
          server_id?: parameters['rowFilter.units.server_id']
          is_hidden?: parameters['rowFilter.units.is_hidden']
          is_inverse?: parameters['rowFilter.units.is_inverse']
          parent_unit_id?: parameters['rowFilter.units.parent_unit_id']
          name1?: parameters['rowFilter.units.name1']
          name2?: parameters['rowFilter.units.name2']
          name3?: parameters['rowFilter.units.name3']
          is_ma?: parameters['rowFilter.units.is_ma']
          force1?: parameters['rowFilter.units.force1']
          force2?: parameters['rowFilter.units.force2']
          rank?: parameters['rowFilter.units.rank']
          rank_suf?: parameters['rowFilter.units.rank_suf']
          range_type?: parameters['rowFilter.units.range_type']
          hp?: parameters['rowFilter.units.hp']
          shield?: parameters['rowFilter.units.shield']
          shield_type?: parameters['rowFilter.units.shield_type']
          shield_percent?: parameters['rowFilter.units.shield_percent']
          shield_dir_w1?: parameters['rowFilter.units.shield_dir_w1']
          shield_dir_w2?: parameters['rowFilter.units.shield_dir_w2']
          shield_dir_w3?: parameters['rowFilter.units.shield_dir_w3']
          shield_dir_w4?: parameters['rowFilter.units.shield_dir_w4']
          shield_dir_w5?: parameters['rowFilter.units.shield_dir_w5']
          speed?: parameters['rowFilter.units.speed']
          agility?: parameters['rowFilter.units.agility']
          boost?: parameters['rowFilter.units.boost']
          attack?: parameters['rowFilter.units.attack']
          defense?: parameters['rowFilter.units.defense']
          search_distance?: parameters['rowFilter.units.search_distance']
          spr1?: parameters['rowFilter.units.spr1']
          spr2?: parameters['rowFilter.units.spr2']
          inverse_id?: parameters['rowFilter.units.inverse_id']
          inverse_trigger?: parameters['rowFilter.units.inverse_trigger']
          /** Filtering Columns */
          select?: parameters['select']
          /** Ordering */
          order?: parameters['order']
          /** Limiting and Pagination */
          offset?: parameters['offset']
          /** Limiting and Pagination */
          limit?: parameters['limit']
        }
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range']
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit']
          /** Preference */
          Prefer?: parameters['preferCount']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['units'][]
        }
        /** Partial Content */
        206: unknown
      }
    }
    post: {
      parameters: {
        body: {
          /** units */
          units?: definitions['units']
        }
        query: {
          /** Filtering Columns */
          select?: parameters['select']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** Created */
        201: unknown
      }
    }
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.units.id']
          unit_id?: parameters['rowFilter.units.unit_id']
          server_id?: parameters['rowFilter.units.server_id']
          is_hidden?: parameters['rowFilter.units.is_hidden']
          is_inverse?: parameters['rowFilter.units.is_inverse']
          parent_unit_id?: parameters['rowFilter.units.parent_unit_id']
          name1?: parameters['rowFilter.units.name1']
          name2?: parameters['rowFilter.units.name2']
          name3?: parameters['rowFilter.units.name3']
          is_ma?: parameters['rowFilter.units.is_ma']
          force1?: parameters['rowFilter.units.force1']
          force2?: parameters['rowFilter.units.force2']
          rank?: parameters['rowFilter.units.rank']
          rank_suf?: parameters['rowFilter.units.rank_suf']
          range_type?: parameters['rowFilter.units.range_type']
          hp?: parameters['rowFilter.units.hp']
          shield?: parameters['rowFilter.units.shield']
          shield_type?: parameters['rowFilter.units.shield_type']
          shield_percent?: parameters['rowFilter.units.shield_percent']
          shield_dir_w1?: parameters['rowFilter.units.shield_dir_w1']
          shield_dir_w2?: parameters['rowFilter.units.shield_dir_w2']
          shield_dir_w3?: parameters['rowFilter.units.shield_dir_w3']
          shield_dir_w4?: parameters['rowFilter.units.shield_dir_w4']
          shield_dir_w5?: parameters['rowFilter.units.shield_dir_w5']
          speed?: parameters['rowFilter.units.speed']
          agility?: parameters['rowFilter.units.agility']
          boost?: parameters['rowFilter.units.boost']
          attack?: parameters['rowFilter.units.attack']
          defense?: parameters['rowFilter.units.defense']
          search_distance?: parameters['rowFilter.units.search_distance']
          spr1?: parameters['rowFilter.units.spr1']
          spr2?: parameters['rowFilter.units.spr2']
          inverse_id?: parameters['rowFilter.units.inverse_id']
          inverse_trigger?: parameters['rowFilter.units.inverse_trigger']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.units.id']
          unit_id?: parameters['rowFilter.units.unit_id']
          server_id?: parameters['rowFilter.units.server_id']
          is_hidden?: parameters['rowFilter.units.is_hidden']
          is_inverse?: parameters['rowFilter.units.is_inverse']
          parent_unit_id?: parameters['rowFilter.units.parent_unit_id']
          name1?: parameters['rowFilter.units.name1']
          name2?: parameters['rowFilter.units.name2']
          name3?: parameters['rowFilter.units.name3']
          is_ma?: parameters['rowFilter.units.is_ma']
          force1?: parameters['rowFilter.units.force1']
          force2?: parameters['rowFilter.units.force2']
          rank?: parameters['rowFilter.units.rank']
          rank_suf?: parameters['rowFilter.units.rank_suf']
          range_type?: parameters['rowFilter.units.range_type']
          hp?: parameters['rowFilter.units.hp']
          shield?: parameters['rowFilter.units.shield']
          shield_type?: parameters['rowFilter.units.shield_type']
          shield_percent?: parameters['rowFilter.units.shield_percent']
          shield_dir_w1?: parameters['rowFilter.units.shield_dir_w1']
          shield_dir_w2?: parameters['rowFilter.units.shield_dir_w2']
          shield_dir_w3?: parameters['rowFilter.units.shield_dir_w3']
          shield_dir_w4?: parameters['rowFilter.units.shield_dir_w4']
          shield_dir_w5?: parameters['rowFilter.units.shield_dir_w5']
          speed?: parameters['rowFilter.units.speed']
          agility?: parameters['rowFilter.units.agility']
          boost?: parameters['rowFilter.units.boost']
          attack?: parameters['rowFilter.units.attack']
          defense?: parameters['rowFilter.units.defense']
          search_distance?: parameters['rowFilter.units.search_distance']
          spr1?: parameters['rowFilter.units.spr1']
          spr2?: parameters['rowFilter.units.spr2']
          inverse_id?: parameters['rowFilter.units.inverse_id']
          inverse_trigger?: parameters['rowFilter.units.inverse_trigger']
        }
        body: {
          /** units */
          units?: definitions['units']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
  }
  '/weapons': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.weapons.id']
          weapon_id?: parameters['rowFilter.weapons.weapon_id']
          parent_unit_id?: parameters['rowFilter.weapons.parent_unit_id']
          slot?: parameters['rowFilter.weapons.slot']
          weapon_name?: parameters['rowFilter.weapons.weapon_name']
          weapon_type?: parameters['rowFilter.weapons.weapon_type']
          range_type?: parameters['rowFilter.weapons.range_type']
          damage_type?: parameters['rowFilter.weapons.damage_type']
          damage?: parameters['rowFilter.weapons.damage']
          projectile_speed?: parameters['rowFilter.weapons.projectile_speed']
          weapon_range?: parameters['rowFilter.weapons.weapon_range']
          animation_speed?: parameters['rowFilter.weapons.animation_speed']
          no_melee_dash?: parameters['rowFilter.weapons.no_melee_dash']
          no_continuous_reload?: parameters['rowFilter.weapons.no_continuous_reload']
          ammo?: parameters['rowFilter.weapons.ammo']
          reload?: parameters['rowFilter.weapons.reload']
          interval?: parameters['rowFilter.weapons.interval']
          effect_id?: parameters['rowFilter.weapons.effect_id']
          is_knockdown_lasthit_diff?: parameters['rowFilter.weapons.is_knockdown_lasthit_diff']
          knockdown?: parameters['rowFilter.weapons.knockdown']
          knockdown_lasthit?: parameters['rowFilter.weapons.knockdown_lasthit']
          is_pierce?: parameters['rowFilter.weapons.is_pierce']
          pierce_percent?: parameters['rowFilter.weapons.pierce_percent']
          can_move?: parameters['rowFilter.weapons.can_move']
          hitbox_x?: parameters['rowFilter.weapons.hitbox_x']
          hitbox_y?: parameters['rowFilter.weapons.hitbox_y']
          hitbox_z?: parameters['rowFilter.weapons.hitbox_z']
          hitbox_splash?: parameters['rowFilter.weapons.hitbox_splash']
          shots?: parameters['rowFilter.weapons.shots']
          /** Filtering Columns */
          select?: parameters['select']
          /** Ordering */
          order?: parameters['order']
          /** Limiting and Pagination */
          offset?: parameters['offset']
          /** Limiting and Pagination */
          limit?: parameters['limit']
        }
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range']
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit']
          /** Preference */
          Prefer?: parameters['preferCount']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['weapons'][]
        }
        /** Partial Content */
        206: unknown
      }
    }
    post: {
      parameters: {
        body: {
          /** weapons */
          weapons?: definitions['weapons']
        }
        query: {
          /** Filtering Columns */
          select?: parameters['select']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** Created */
        201: unknown
      }
    }
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.weapons.id']
          weapon_id?: parameters['rowFilter.weapons.weapon_id']
          parent_unit_id?: parameters['rowFilter.weapons.parent_unit_id']
          slot?: parameters['rowFilter.weapons.slot']
          weapon_name?: parameters['rowFilter.weapons.weapon_name']
          weapon_type?: parameters['rowFilter.weapons.weapon_type']
          range_type?: parameters['rowFilter.weapons.range_type']
          damage_type?: parameters['rowFilter.weapons.damage_type']
          damage?: parameters['rowFilter.weapons.damage']
          projectile_speed?: parameters['rowFilter.weapons.projectile_speed']
          weapon_range?: parameters['rowFilter.weapons.weapon_range']
          animation_speed?: parameters['rowFilter.weapons.animation_speed']
          no_melee_dash?: parameters['rowFilter.weapons.no_melee_dash']
          no_continuous_reload?: parameters['rowFilter.weapons.no_continuous_reload']
          ammo?: parameters['rowFilter.weapons.ammo']
          reload?: parameters['rowFilter.weapons.reload']
          interval?: parameters['rowFilter.weapons.interval']
          effect_id?: parameters['rowFilter.weapons.effect_id']
          is_knockdown_lasthit_diff?: parameters['rowFilter.weapons.is_knockdown_lasthit_diff']
          knockdown?: parameters['rowFilter.weapons.knockdown']
          knockdown_lasthit?: parameters['rowFilter.weapons.knockdown_lasthit']
          is_pierce?: parameters['rowFilter.weapons.is_pierce']
          pierce_percent?: parameters['rowFilter.weapons.pierce_percent']
          can_move?: parameters['rowFilter.weapons.can_move']
          hitbox_x?: parameters['rowFilter.weapons.hitbox_x']
          hitbox_y?: parameters['rowFilter.weapons.hitbox_y']
          hitbox_z?: parameters['rowFilter.weapons.hitbox_z']
          hitbox_splash?: parameters['rowFilter.weapons.hitbox_splash']
          shots?: parameters['rowFilter.weapons.shots']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.weapons.id']
          weapon_id?: parameters['rowFilter.weapons.weapon_id']
          parent_unit_id?: parameters['rowFilter.weapons.parent_unit_id']
          slot?: parameters['rowFilter.weapons.slot']
          weapon_name?: parameters['rowFilter.weapons.weapon_name']
          weapon_type?: parameters['rowFilter.weapons.weapon_type']
          range_type?: parameters['rowFilter.weapons.range_type']
          damage_type?: parameters['rowFilter.weapons.damage_type']
          damage?: parameters['rowFilter.weapons.damage']
          projectile_speed?: parameters['rowFilter.weapons.projectile_speed']
          weapon_range?: parameters['rowFilter.weapons.weapon_range']
          animation_speed?: parameters['rowFilter.weapons.animation_speed']
          no_melee_dash?: parameters['rowFilter.weapons.no_melee_dash']
          no_continuous_reload?: parameters['rowFilter.weapons.no_continuous_reload']
          ammo?: parameters['rowFilter.weapons.ammo']
          reload?: parameters['rowFilter.weapons.reload']
          interval?: parameters['rowFilter.weapons.interval']
          effect_id?: parameters['rowFilter.weapons.effect_id']
          is_knockdown_lasthit_diff?: parameters['rowFilter.weapons.is_knockdown_lasthit_diff']
          knockdown?: parameters['rowFilter.weapons.knockdown']
          knockdown_lasthit?: parameters['rowFilter.weapons.knockdown_lasthit']
          is_pierce?: parameters['rowFilter.weapons.is_pierce']
          pierce_percent?: parameters['rowFilter.weapons.pierce_percent']
          can_move?: parameters['rowFilter.weapons.can_move']
          hitbox_x?: parameters['rowFilter.weapons.hitbox_x']
          hitbox_y?: parameters['rowFilter.weapons.hitbox_y']
          hitbox_z?: parameters['rowFilter.weapons.hitbox_z']
          hitbox_splash?: parameters['rowFilter.weapons.hitbox_splash']
          shots?: parameters['rowFilter.weapons.shots']
        }
        body: {
          /** weapons */
          weapons?: definitions['weapons']
        }
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn']
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
  }
}

export interface definitions {
  servers: {
    /**
     * Format: integer
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number
    /** Format: text */
    name: string
  }
  units: {
    /**
     * Format: integer
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number
    /** Format: integer */
    unit_id: number
    /** Format: integer */
    server_id: number
    /** Format: smallint */
    is_hidden: number
    /** Format: smallint */
    is_inverse: number
    /** Format: integer */
    parent_unit_id?: number
    /** Format: text */
    name1: string
    /** Format: text */
    name2: string
    /** Format: text */
    name3: string
    /** Format: smallint */
    is_ma: number
    /** Format: smallint */
    force1: number
    /** Format: smallint */
    force2: number
    /** Format: smallint */
    rank: number
    /** Format: smallint */
    rank_suf: number
    /** Format: smallint */
    range_type: number
    /** Format: integer */
    hp: number
    /** Format: integer */
    shield: number
    /** Format: smallint */
    shield_type: number
    /** Format: integer */
    shield_percent: number
    /** Format: smallint */
    shield_dir_w1: number
    /** Format: smallint */
    shield_dir_w2: number
    /** Format: smallint */
    shield_dir_w3: number
    /** Format: smallint */
    shield_dir_w4: number
    /** Format: smallint */
    shield_dir_w5: number
    /** Format: smallint */
    speed: number
    /** Format: smallint */
    agility: number
    /** Format: smallint */
    boost: number
    /** Format: smallint */
    attack: number
    /** Format: smallint */
    defense: number
    /** Format: smallint */
    search_distance: number
    /** Format: text */
    spr1?: string
    /** Format: text */
    spr2?: string
    /** Format: integer */
    inverse_id?: number
    /** Format: smallint */
    inverse_trigger?: number
  }
  weapons: {
    /**
     * Format: integer
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number
    /** Format: integer */
    weapon_id: number
    /** Format: integer */
    parent_unit_id: number
    /** Format: smallint */
    slot: number
    /** Format: text */
    weapon_name: string
    /** Format: smallint */
    weapon_type: number
    /** Format: smallint */
    range_type: number
    /** Format: smallint */
    damage_type: number
    /** Format: integer */
    damage: number
    /** Format: smallint */
    projectile_speed: number
    /** Format: smallint */
    weapon_range: number
    /** Format: double precision */
    animation_speed: number
    /** Format: smallint */
    no_melee_dash: number
    /** Format: smallint */
    no_continuous_reload: number
    /** Format: smallint */
    ammo: number
    /** Format: smallint */
    reload: number
    /** Format: smallint */
    interval: number
    /** Format: integer */
    effect_id: number
    /** Format: smallint */
    is_knockdown_lasthit_diff: number
    /** Format: smallint */
    knockdown: number
    /** Format: smallint */
    knockdown_lasthit: number
    /** Format: smallint */
    is_pierce: number
    /** Format: smallint */
    pierce_percent: number
    /** Format: smallint */
    can_move: number
    /** Format: double precision */
    hitbox_x: number
    /** Format: double precision */
    hitbox_y: number
    /** Format: double precision */
    hitbox_z: number
    /** Format: double precision */
    hitbox_splash: number
    /** Format: smallint */
    shots: number
  }
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: 'params=single-object'
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: 'return=representation' | 'return=minimal' | 'return=none'
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: 'count=none'
  /** @description Filtering Columns */
  select: string
  /** @description On Conflict */
  on_conflict: string
  /** @description Ordering */
  order: string
  /** @description Limiting and Pagination */
  range: string
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string
  /** @description Limiting and Pagination */
  offset: string
  /** @description Limiting and Pagination */
  limit: string
  /** @description servers */
  'body.servers': definitions['servers']
  /** Format: integer */
  'rowFilter.servers.id': string
  /** Format: text */
  'rowFilter.servers.name': string
  /** @description units */
  'body.units': definitions['units']
  /** Format: integer */
  'rowFilter.units.id': string
  /** Format: integer */
  'rowFilter.units.unit_id': string
  /** Format: integer */
  'rowFilter.units.server_id': string
  /** Format: smallint */
  'rowFilter.units.is_hidden': string
  /** Format: smallint */
  'rowFilter.units.is_inverse': string
  /** Format: integer */
  'rowFilter.units.parent_unit_id': string
  /** Format: text */
  'rowFilter.units.name1': string
  /** Format: text */
  'rowFilter.units.name2': string
  /** Format: text */
  'rowFilter.units.name3': string
  /** Format: smallint */
  'rowFilter.units.is_ma': string
  /** Format: smallint */
  'rowFilter.units.force1': string
  /** Format: smallint */
  'rowFilter.units.force2': string
  /** Format: smallint */
  'rowFilter.units.rank': string
  /** Format: smallint */
  'rowFilter.units.rank_suf': string
  /** Format: smallint */
  'rowFilter.units.range_type': string
  /** Format: integer */
  'rowFilter.units.hp': string
  /** Format: integer */
  'rowFilter.units.shield': string
  /** Format: smallint */
  'rowFilter.units.shield_type': string
  /** Format: integer */
  'rowFilter.units.shield_percent': string
  /** Format: smallint */
  'rowFilter.units.shield_dir_w1': string
  /** Format: smallint */
  'rowFilter.units.shield_dir_w2': string
  /** Format: smallint */
  'rowFilter.units.shield_dir_w3': string
  /** Format: smallint */
  'rowFilter.units.shield_dir_w4': string
  /** Format: smallint */
  'rowFilter.units.shield_dir_w5': string
  /** Format: smallint */
  'rowFilter.units.speed': string
  /** Format: smallint */
  'rowFilter.units.agility': string
  /** Format: smallint */
  'rowFilter.units.boost': string
  /** Format: smallint */
  'rowFilter.units.attack': string
  /** Format: smallint */
  'rowFilter.units.defense': string
  /** Format: smallint */
  'rowFilter.units.search_distance': string
  /** Format: text */
  'rowFilter.units.spr1': string
  /** Format: text */
  'rowFilter.units.spr2': string
  /** Format: integer */
  'rowFilter.units.inverse_id': string
  /** Format: smallint */
  'rowFilter.units.inverse_trigger': string
  /** @description weapons */
  'body.weapons': definitions['weapons']
  /** Format: integer */
  'rowFilter.weapons.id': string
  /** Format: integer */
  'rowFilter.weapons.weapon_id': string
  /** Format: integer */
  'rowFilter.weapons.parent_unit_id': string
  /** Format: smallint */
  'rowFilter.weapons.slot': string
  /** Format: text */
  'rowFilter.weapons.weapon_name': string
  /** Format: smallint */
  'rowFilter.weapons.weapon_type': string
  /** Format: smallint */
  'rowFilter.weapons.range_type': string
  /** Format: smallint */
  'rowFilter.weapons.damage_type': string
  /** Format: integer */
  'rowFilter.weapons.damage': string
  /** Format: smallint */
  'rowFilter.weapons.projectile_speed': string
  /** Format: smallint */
  'rowFilter.weapons.weapon_range': string
  /** Format: double precision */
  'rowFilter.weapons.animation_speed': string
  /** Format: smallint */
  'rowFilter.weapons.no_melee_dash': string
  /** Format: smallint */
  'rowFilter.weapons.no_continuous_reload': string
  /** Format: smallint */
  'rowFilter.weapons.ammo': string
  /** Format: smallint */
  'rowFilter.weapons.reload': string
  /** Format: smallint */
  'rowFilter.weapons.interval': string
  /** Format: integer */
  'rowFilter.weapons.effect_id': string
  /** Format: smallint */
  'rowFilter.weapons.is_knockdown_lasthit_diff': string
  /** Format: smallint */
  'rowFilter.weapons.knockdown': string
  /** Format: smallint */
  'rowFilter.weapons.knockdown_lasthit': string
  /** Format: smallint */
  'rowFilter.weapons.is_pierce': string
  /** Format: smallint */
  'rowFilter.weapons.pierce_percent': string
  /** Format: smallint */
  'rowFilter.weapons.can_move': string
  /** Format: double precision */
  'rowFilter.weapons.hitbox_x': string
  /** Format: double precision */
  'rowFilter.weapons.hitbox_y': string
  /** Format: double precision */
  'rowFilter.weapons.hitbox_z': string
  /** Format: double precision */
  'rowFilter.weapons.hitbox_splash': string
  /** Format: smallint */
  'rowFilter.weapons.shots': string
}

export interface operations {}

export interface external {}
