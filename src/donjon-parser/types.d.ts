export interface RawDonjonDungeon {
  // cell_bit: CellBit;
  cells: number[][];
  // corridor_features: CorridorFeatures;
  // details: Details;
  // egress: Egress[];
  // rooms: (Room | null)[];
  // settings: Settings;
  // wandering_monsters: WanderingMonsters;
}

interface CellBit {
  aperture: number;
  arch: number;
  block: number;
  corridor: number;
  door: number;
  label: number;
  locked: number;
  nothing: number;
  perimeter: number;
  portcullis: number;
  room: number;
  room_id: number;
  secret: number;
  stair_down: number;
  stair_up: number;
  trapped: number;
}

interface CorridorFeatures {}

interface Details {
  floor: string;
  illumination: string;
  special?: any;
  temperature: string;
  walls: string;
}

interface Egress {
  col: number;
  depth: number;
  dir: string;
  row: number;
  type: string;
}

interface Detail {
  room_features: string;
  hidden_treasure?: string[];
}

interface Contents {
  detail: Detail;
  summary: string;
}

interface Door {
  col: number;
  desc: string;
  row: number;
  type: string;
}

interface Doors {
  north?: Door[];
  south?: Door[];
  east?: Door[];
  west?: Door[];
}

interface Room {
  area: number;
  col: number;
  contents: Contents;
  doors: Doors;
  east: number;
  height: number;
  id: number;
  north: number;
  row: number;
  shape: string;
  size: string;
  south: number;
  west: number;
  width: number;
}

interface Settings {
  add_stairs: string;
  bleed: number;
  cell_size: number;
  corridor_layout: string;
  door_set: string;
  dungeon_layout: string;
  dungeon_size: string;
  grid: string;
  image_size: string;
  infest: string;
  last_room_id: number;
  level: number;
  map_cols: string;
  map_rows: string;
  map_style: string;
  max_col: number;
  max_row: number;
  motif: string;
  n_cols: number;
  n_i: number;
  n_j: number;
  n_pc: number;
  n_rooms: number;
  n_rows: number;
  name: string;
  peripheral_egress: string;
  remove_arcs: string;
  remove_deadends: string;
  room_layout: string;
  room_polymorph: string;
  room_size: string;
  seed: number;
}

interface WanderingMonsters {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
}
