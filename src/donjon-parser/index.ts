import { RawDonjonDungeon } from "./types";
export { type RawDonjonDungeon };
//#region cell bits

const NOTHING = 0x00000000;

const BLOCKED = 0x00000001;
const ROOM = 0x00000002;
const CORRIDOR = 0x00000004;
const PERIMETER = 0x00000010;
const ENTRANCE = 0x00000020;
const ROOM_ID = 0x0000ffc0;

const ARCH = 0x00010000;
const DOOR = 0x00020000;
const LOCKED = 0x00040000;
const TRAPPED = 0x00080000;
const SECRET = 0x00100000;
const PORTC = 0x00200000;
const STAIR_DN = 0x00400000;
const STAIR_UP = 0x00800000;

const LABEL = 0xff000000;

const OPENSPACE = ROOM | CORRIDOR;
const DOORSPACE = ARCH | DOOR | LOCKED | TRAPPED | SECRET | PORTC;
const ESPACE = ENTRANCE | DOORSPACE | 0xff000000;
const STAIRS = STAIR_DN | STAIR_UP;

const BLOCK_ROOM = BLOCKED | ROOM;
const BLOCK_CORR = BLOCKED | PERIMETER | CORRIDOR;
const BLOCK_DOOR = BLOCKED | DOORSPACE;

type DoorType =
  | false
  | "arch"
  | "door"
  | "locked"
  | "trapped"
  | "secret"
  | "portcullis";

//#endregion cell bits

export interface DonjonDungeonCell {
  value: number;
  row: number;
  col: number;
  nothing: boolean;
  perimeter: boolean;
  openSpace: boolean;
  doorSpace: DoorType;
  label: boolean;
  blocked: boolean;
  free: boolean;
}

function parseCellData(
  value: number,
  row: number,
  col: number
): DonjonDungeonCell {
  return {
    value,
    row,
    col,
    nothing: value === NOTHING,
    perimeter: !!(value & PERIMETER),
    openSpace: !!(value & OPENSPACE),
    doorSpace: parseCellDoorType(value),
    label: !!(value & LABEL),
    get blocked(): boolean {
      return this.nothing || this.perimeter;
    },
    get free(): boolean {
      // ignore doors for now
      return this.openSpace || this.doorSpace !== false;
    },
  };
}

export type DonjonDungeon = DonjonDungeonCell[][];

export function parseDonjonData(donjonData: RawDonjonDungeon): DonjonDungeon {
  const cells = donjonData.cells
    // strip 4 rows from top and bottom
    .slice(4, -4)
    // for each row, strip 4 columns from left and right
    .map((cols) => cols.slice(4, -4));

  return cells.map((row, rowIdx) => {
    return row.map((cell, colIdx) => {
      return parseCellData(cell, rowIdx, colIdx);
    });
  });
}
function parseCellDoorType(cell: number): DoorType {
  if (cell & DOORSPACE) {
    if (cell & ARCH) {
      return "arch";
    } else if (cell & DOOR) {
      return "door";
    } else if (cell & LOCKED) {
      return "locked";
    } else if (cell & TRAPPED) {
      return "trapped";
    } else if (cell & SECRET) {
      return "secret";
    } else if (cell & PORTC) {
      return "portcullis";
    } else {
      throw new Error(`Unabled to parse door type for ${cell}`);
    }
  }

  return false;
}
