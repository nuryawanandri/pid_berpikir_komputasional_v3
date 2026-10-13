<script setup lang="ts">
import { useMission } from "../mission";
import SortBoard from "../components/SortBoard.vue";
import { environment, themes } from "../content";
const m = useMission();
</script>
<template>
  <p class="lead">Cocokkan kegiatan dengan hal yang kita jaga.</p>
  <SortBoard :cards="environment" :targets="themes" activity="environment" />
  <p class="helper">
    Ini kelompok kegiatan untuk belajar, bukan klasifikasi resmi bidang
    Adiwiyata.
  </p>
</template>
