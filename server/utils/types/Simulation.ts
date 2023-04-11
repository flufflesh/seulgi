export interface Rng {
  name: string
}

export interface Live {
  build_level: number
  wow_version: string
  hotfix_date: string
  hotfix_build: number
  hotfix_hash: string
}

export interface Dbc {
  Live: Live
  version_used: string
}

export interface Options {
  debug: boolean
  max_time: number
  expected_iteration_time: number
  vary_combat_length: number
  iterations: number
  target_error: number
  threads: number
  seed: number
  single_actor_batch: boolean
  queue_lag: number
  queue_lag_stddev: number
  gcd_lag: number
  gcd_lag_stddev: number
  channel_lag: number
  channel_lag_stddev: number
  queue_gcd_reduction: number
  strict_gcd_queue: boolean
  confidence: number
  confidence_estimator: number
  world_lag: number
  world_lag_stddev: number
  travel_variance: number
  default_skill: number
  reaction_time: number
  regen_periodicity: number
  ignite_sampling_delta: number
  fixed_time: boolean
  optimize_expressions: number
  optimal_raid: number
  log: number
  debug_each: number
  stat_cache: number
  max_aoe_enemies: number
  show_etmi: boolean
  tmi_window_global: number
  tmi_bin_size: number
  enemy_death_pct: number
  challenge_mode: boolean
  timewalk: number
  pvp_crit: boolean
  rng: Rng
  deterministic: number
  average_range: number
  average_gauss: number
  fight_style: string
  default_aura_delay: number
  default_aura_delay_stddev: number
  dbc: Dbc
}

export interface Overrides {
  arcane_intellect: number
  battle_shout: number
  power_word_fortitude: number
  chaos_brand: number
  mystic_touch: number
  mortal_wounds: number
  bleeding: number
  bloodlust: number
}

export interface Talent {
  tier: number
  id: number
  spell_id: number
  name: string
}

export interface GeneralAggregate {
  sum: number
  count: number
  mean: number
  min: number
  max: number
}

export interface MinimizedAggregate {
  sum: number
  count: number
  mean: number
}

export interface DataAggregate {
  mean: number
  mean_std_dev: number
  min: number
  max: number
  data: number[]
}

export type Dps = GeneralAggregate & {
  median: number
  variance: number
  std_dev: number
  mean_variance: number
  mean_std_dev: number
}

export interface Attribute {
  strength: number
  agility: number
  stamina: number
  intellect: number
}

export interface Resources {
  focus?: number
  mana?: number
  rage?: number
  fury?: number
  energy?: number
}

export interface Stats {
  spell_power: number
  attack_power: number
  spell_crit: number
  attack_crit: number
  spell_haste: number
  attack_haste: number
  spell_speed: number
  attack_speed: number
  mastery_value: number
  damage_versatility: number
  heal_versatility: number
  mitigation_versatility: number
  crit_rating: number
  crit_pct: number
  haste_rating: number
  haste_pct: number
  mastery_rating: number
  mastery_pct: number
  versatility_rating: number
  versatility_pct: number
  leech_rating: number
  leech_pct: number
  speed_rating: number
  speed_pct: number
  armor: number
  dodge: number
}

export interface BuffedStats {
  attribute: Attribute
  resources: Resources
  stats: Stats
}

export interface ResourceUsage {
  focus: MinimizedAggregate
  mana: MinimizedAggregate
  rage: MinimizedAggregate
  fury: MinimizedAggregate
  energy: MinimizedAggregate
}

export interface CombatEndResource {
  focus: GeneralAggregate
  mana: GeneralAggregate
  rage: GeneralAggregate
  fury: GeneralAggregate
  energy: GeneralAggregate
}

export interface ResourceTimelines {
  focus: DataAggregate
  mana: DataAggregate
  rage: DataAggregate
  fury: DataAggregate
  energy: DataAggregate
}

export interface Buff {
  id: number
  name: string
  stacks: number
}

export interface ActionSequencePrecombat {
  time: number
  id: number
  name: string
  target: string
  spell_name: string
  queue_failed: boolean
  resources: Resources
  resources_max: Resources
  buffs: Buff[]
}

export interface ActionSequence {
  time: number
  id: number
  name: string
  target: string
  spell_name: string
  queue_failed: boolean
  buffs: Buff[]
  resources: Resources
  resources_max: Resources
}

export interface CollectedData {
  fight_length: GeneralAggregate
  executed_foreground_actions: GeneralAggregate
  dmg: GeneralAggregate
  compound_dmg: GeneralAggregate
  timeline_dmg: DataAggregate
  dps: Dps
  dpse: GeneralAggregate
  buffed_stats: BuffedStats
  resource_lost: ResourceUsage
  resource_overflowed: ResourceUsage
  combat_end_resource: CombatEndResource
  resource_timelines: ResourceTimelines
  action_sequence_precombat: ActionSequencePrecombat[]
  action_sequence: ActionSequence[]
}

export interface Cooldown {
  name: string
  duration: number
}

export interface Item {
  id: number
  ilevel: number
}

export interface Buff3 {
  name: string
  spell_name: string
  spell_school: string
  spell: number
  cooldown: Cooldown
  start_count: number
  duration: number
  uptime: number
  expire_count: number
  default_value: number
  interval?: number
  trigger?: number
  refresh_count?: number
  benefit?: number
  overflow_stacks?: number
  overflow_total?: number
  item: Item
}

export interface BuffsConstant {
  name: string
  spell_name: string
  spell_school: string
  spell: number
  start_count: number
  duration: number
  uptime: number
  default_value: number
  cooldown: Cooldown
}

export interface Proc {
  name: string
  interval: number
  count: number
}

export interface ResourceOverflow {
  actual: number
  overflow: number
  count: number
}

export interface Gain {
  name: string
  focus: ResourceOverflow
  mana: ResourceOverflow
  rage: ResourceOverflow
  fury: ResourceOverflow
  energy: ResourceOverflow
}

export interface CritHit {
  actual_amount: GeneralAggregate
  avg_actual_amount: GeneralAggregate
  total_amount: MinimizedAggregate
  fight_actual_amount: MinimizedAggregate
  fight_total_amount: MinimizedAggregate
  overkill_pct: MinimizedAggregate
  count: GeneralAggregate
  pct: number
}

export interface Child {
  id: number
  spell_name: string
  name: string
  school: string
  type: string
  num_executes: MinimizedAggregate
  compound_amount: number
  portion_aps: GeneralAggregate
  portion_apse: GeneralAggregate
  portion_amount: number
  actual_amount: GeneralAggregate
  total_amount: GeneralAggregate
  num_direct_results: MinimizedAggregate
  direct_results: DamageResults
  total_intervals: MinimizedAggregate
}

export interface DamageResults {
  crit: CritHit
  hit: CritHit
}

export interface Stat {
  id: number
  spell_name: string
  name: string
  school: string
  type: string
  resource_gain: Gain
  num_executes: MinimizedAggregate
  compound_amount: number
  total_execute_time: MinimizedAggregate
  portion_aps: GeneralAggregate
  portion_apse: GeneralAggregate
  portion_amount: number
  actual_amount: GeneralAggregate
  total_amount: GeneralAggregate
  total_intervals: MinimizedAggregate
  num_direct_results: MinimizedAggregate
  direct_results: DamageResults
  children: Child[]
  item_id?: number
  num_ticks: MinimizedAggregate
  num_tick_results: MinimizedAggregate
  total_tick_time: MinimizedAggregate
  tick_results: DamageResults
}

export interface StatsPets {}

export interface Head {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  crit_rating: number
  versatility_rating: number
  agiint: number
}

export interface Neck {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  versatility_rating: number
  mastery_rating: number
}

export interface Shoulders {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  crit_rating: number
  haste_rating: number
  agiint: number
}

export interface Chest {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  versatility_rating: number
  mastery_rating: number
  agiint: number
}

export interface Waist {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  haste_rating: number
  mastery_rating: number
  agiint: number
}

export interface Legs {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  haste_rating: number
  mastery_rating: number
  agiint: number
}

export interface Feet {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  versatility_rating: number
  mastery_rating: number
  agiint: number
}

export interface Wrists {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  haste_rating: number
  versatility_rating: number
  agiint: number
  speed_rating: number
}

export interface Hands {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  haste_rating: number
  versatility_rating: number
  agiint: number
}

export interface Finger1 {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  crit_rating: number
  mastery_rating: number
  leech_rating: number
}

export interface Finger2 {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  haste_rating: number
  versatility_rating: number
}

export interface Trinket1 {
  name: string
  encoded_item: string
  ilevel: number
  agility: number
}

export interface Trinket2 {
  name: string
  encoded_item: string
  ilevel: number
  stragi: number
}

export interface Back {
  name: string
  encoded_item: string
  ilevel: number
  stamina: number
  crit_rating: number
  versatility_rating: number
  stragiint: number
}

export interface MainHand {
  name: string
  encoded_item: string
  ilevel: number
  agility: number
  stamina: number
  haste_rating: number
  versatility_rating: number
}

export interface Gear {
  head: Head
  neck: Neck
  shoulders: Shoulders
  chest: Chest
  waist: Waist
  legs: Legs
  feet: Feet
  wrists: Wrists
  hands: Hands
  finger1: Finger1
  finger2: Finger2
  trinket1: Trinket1
  trinket2: Trinket2
  back: Back
  main_hand: MainHand
}

export interface Custom {}

export interface Player {
  name: string
  race: string
  level: number
  role: string
  specialization: string
  profile_source: string
  talents: Talent[]
  party: number
  ready_type: number
  bugs: boolean
  scale_player: boolean
  potion_used: boolean
  timeofday: string
  zandalari_loa: string
  vulpera_tricks: string
  invert_scaling: number
  reaction_offset: number
  reaction_max: number
  reaction_mean: number
  reaction_stddev: number
  reaction_nu: number
  world_lag: number
  brain_lag: number
  brain_lag_stddev: number
  world_lag_override: boolean
  world_lag_stddev_override: boolean
  dbc: Dbc
  base_focus_regen_per_second: number
  collected_data: CollectedData
  buffs: Buff3[]
  buffs_constant: BuffsConstant[]
  procs: Proc[]
  gains: Gain[]
  stats: Stat[]
  stats_pets: StatsPets
  gear: Gear
  custom: Custom
}

export interface SimulationLength {
  sum: number
  count: number
  mean: number
  min: number
  max: number
  median: number
  variance: number
  std_dev: number
  mean_variance: number
  mean_std_dev: number
}

export interface Statistics {
  elapsed_cpu_seconds: number
  elapsed_time_seconds: number
  init_time_seconds: number
  merge_time_seconds: number
  analyze_time_seconds: number
  simulation_length: SimulationLength
  total_events_processed: number
  raid_dps: MinimizedAggregate
  total_dmg: MinimizedAggregate
}

export interface FightLength2 {
  sum: number
  count: number
  mean: number
  min: number
  max: number
}

export interface Attribute2 {}

export interface Health {
  health: number
}

export type Stats2 = Partial<Stats>

export interface BuffedStats2 {
  attribute: Attribute2
  resources: Health
  stats: Stats2
}

export interface HealthLostOrOverflowed {
  health: MinimizedAggregate
}

export interface ResourceTimelines2 {
  health: DataAggregate
}

export interface CollectedData2 {
  fight_length: FightLength2
  buffed_stats: BuffedStats2
  resource_lost: HealthLostOrOverflowed
  resource_overflowed: HealthLostOrOverflowed
  resource_timelines: ResourceTimelines2
}

export interface Gear2 {}

export interface Target {
  name: string
  race: string
  level: number
  role: string
  specialization: string
  profile_source: string
  talents: any[]
  party: number
  ready_type: number
  bugs: boolean
  scale_player: boolean
  potion_used: boolean
  timeofday: string
  zandalari_loa: string
  vulpera_tricks: string
  death_pct: number
  height: number
  combat_reach: number
  invert_scaling: number
  reaction_offset: number
  reaction_max: number
  reaction_mean: number
  reaction_stddev: number
  reaction_nu: number
  world_lag: number
  brain_lag: number
  brain_lag_stddev: number
  world_lag_override: boolean
  world_lag_stddev_override: boolean
  dbc: Dbc
  collected_data: CollectedData2
  buffs: any[]
  buffs_constant: BuffsConstant[]
  procs: any[]
  gains: any[]
  stats: any[]
  stats_pets: StatsPets
  gear: Gear2
  custom: Custom
}

export interface SimAura {
  name: string
  spell_name: string
  spell_school: string
  spell: number
  start_count: number
  duration: number
  uptime: number
  default_value: number
  cooldown: Cooldown
}

export interface Sim {
  options: Options
  overrides: Overrides
  players: Player[]
  statistics: Statistics
  targets: Target[]
  sim_auras: SimAura[]
}

export interface RootObject {
  version: string
  report_version: string
  ptr_enabled: number
  beta_enabled: number
  build_date: string
  build_time: string
  timestamp: number
  git_revision: string
  git_branch: string
  sim: Sim
}
