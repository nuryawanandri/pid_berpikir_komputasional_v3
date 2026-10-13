<script setup lang="ts">
import { useMission } from "../mission";
import SortBoard from "../components/SortBoard.vue";
import { finalCards } from "../content";
const m = useMission();
</script>
<template>
  <div class="mission-problem">
    ⚡ Listrik tetap digunakan meskipun kegiatan belajar telah selesai.
  </div>
  <p class="lead">
    Susun rencana penyelidikan kelas: bagian masalah, pola, dan informasi.
  </p>
  <SortBoard
    :cards="finalCards"
    :targets="[
      'Bagian masalah',
      'Pola yang dicari',
      'Informasi yang dikumpulkan',
    ]"
    activity="final"
    :auto-complete="false"
  />
  <p class="helper">
    Diskusikan: siapa yang bisa membantu mengumpulkan data? Jelaskan hubungan
    ketiga kelompok di atas.
  </p>
  <button
    class="primary"
    :disabled="Object.keys(m.state.placements.final || {}).length !== 6"
    @click="m.complete()"
  >
    Guru: diskusi selesai ✓
  </button>
</template>
