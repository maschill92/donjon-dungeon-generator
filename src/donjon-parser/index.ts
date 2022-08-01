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

//#endregion cell bits

interface DonjonDungeonCell {
  value: number;
  nothing: boolean;
  perimeter: boolean;
  openSpace: boolean;
  doorSpace: boolean;
  label: boolean;
}

function parseCellData(cell: number): DonjonDungeonCell {
  return {
    value: cell,
    nothing: cell === NOTHING,
    perimeter: !!(cell & PERIMETER),
    openSpace: !!(cell & OPENSPACE),
    doorSpace: !!(cell & DOORSPACE),
    label: !!(cell & LABEL),
  };
}

export function parseDonjonData(donjonData: RawDonjonDungeon) {
  return donjonData.cells.map((row, rowIdx) => {
    return row.map((cell, colIdx) => {
      return parseCellData(cell);
    });
  });
}
