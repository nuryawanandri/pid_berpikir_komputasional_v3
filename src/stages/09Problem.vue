<script setup lang="ts">
import { useMission } from "../mission";
import SelectChallenge from "../components/SelectChallenge.vue";
import { problemParts } from "../content";
const m = useMission();
</script>
<template>
  <div class="mission-problem">Bagaimana cara mengelola sampah di sekolah?</div>
  <p class="lead">
    Apakah masalah besar ini bisa dipecah menjadi bagian kecil? Pilih semua
    bagian yang relevan.
  </p>
  <SelectChallenge
    :cards="problemParts"
    :correct="['sumber', 'kumpul', 'jenis']"
    activity="problem"
  />
</template>
