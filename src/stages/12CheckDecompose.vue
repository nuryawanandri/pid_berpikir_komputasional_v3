<script setup lang="ts">
import { useMission } from "../mission";
import SelectChallenge from "../components/SelectChallenge.vue";
import { plasticParts } from "../content";
const m = useMission();
</script>
<template>
  <div class="mission-problem">Sekolah ingin mengurangi sampah plastik.</div>
  <p class="lead">
    Pilih bagian-bagian kecil yang membantu menyelesaikan masalah tersebut.
  </p>
  <SelectChallenge
    :cards="plasticParts"
    :correct="['p1', 'p2', 'p3']"
    activity="plastic"
  />
</template>
