<script setup lang="ts">
import { useMission } from "../mission";
import SortBoard from "../components/SortBoard.vue";
import { decomposition } from "../content";
const m = useMission();
</script>
<template>
  <div class="mission-problem">🧩 Mengelola sampah sekolah</div>
  <p class="lead">
    Bangun peta bagian masalah. Setiap kartu adalah satu bagian yang dapat kita
    tangani.
  </p>
  <SortBoard
    :cards="decomposition"
    :targets="['Bagian-bagian masalah']"
    activity="decomposition"
    free
  />
  <p class="helper">
    Urutan bebas. Kita sedang memecah masalah, bukan menyusun urutan kerja.
  </p>
</template>
