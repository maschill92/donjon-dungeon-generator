<script setup lang="ts">
import { ref } from "vue";
import donjonDataRaw from "@/test/donjon-2.json";
import { parseDonjonData } from "../donjon-parser";
import DonjonDungeonOutput from './DonjonDungeonOutput.vue'
// import img from "@/test/donjon-2.png";
const img = "asdf"

const parsedDonjonData = ref(parseDonjonData(donjonDataRaw));
</script>

<template>
  <DonjonDungeonOutput :data="parsedDonjonData" :img="img" />
</template>

