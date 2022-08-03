<script setup lang="ts">
import type { DonjonDungeon, DonjonDungeonCell } from "@/donjon-parser";

const { data } = defineProps<{ data: DonjonDungeon, img: string}>();

function cellClass(cell: DonjonDungeonCell): string | null {
  if (cell.perimeter) {
    return "perimeter";
  } else if (cell.doorSpace) {
    return cell.doorSpace;
  } else if (cell.openSpace) {
    return "open";
  } else if (cell.nothing) {
    return "empty";
  }

  return null;
}
</script>

<template>
  <div class="container">
    <div class="row" v-for="(row, rowIdx) in data" :data-row="rowIdx">
      <div
        class="cell"
        v-for="(cell, colIdx) in row"
        :data-col="colIdx"
        :title="JSON.stringify(cell, null, 2)"
        :class="cellClass(cell)"
      ></div>
    </div>
  </div>
  <img :src="img" />
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.row {
  display: flex;
}

.cell {
  flex-grow: 1;
  aspect-ratio: 1;
  border: 1px solid darkgray;
}

.cell.open {
  background-color: white;
}

.cell.perimeter {
  background-color: lightgray;
}

.cell.arch {
  background-color: #ddd;
}

.cell.door {
  background-color: lightblue;
}

.cell.locked {
  background-color: pink;
}

.cell.trapped {
  background-color: greenyellow;
}

.cell.secret {
  background-color: magenta;
}

.cell.portcullis {
  background-color: lightsalmon;
}

.cell.empty,
.cell.perimeter {
  background-color: black;
}
</style>
