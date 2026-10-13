<script setup lang="ts">
import { useMission } from "../mission";
const m = useMission();
</script>
<template>
  <div class="concept-banner">
    <span>🔍</span>
    <div>
      <h3>Pengenalan pola</h3>
      <p>
        Pengenalan pola adalah proses menemukan kesamaan, perbedaan, atau
        keteraturan dari berbagai informasi sehingga kita dapat mengelompokkan
        dan memahami masalah dengan lebih mudah.
      </p>
    </div>
  </div>
  <button class="activity-card connection-card" @click="m.complete()">
    <span class="card-icon">🍌 🍂</span
    ><strong>Apa hubungan kulit pisang dan daun kering?</strong
    ><span class="card-foot">Sentuh untuk menghubungkan pengalamanmu ↗</span>
  </button>
  <div v-if="m.canNext" class="feedback">
    Keduanya berasal dari tumbuhan dan dapat terurai secara hayati. Saat kamu
    menemukan ciri yang sama lalu mengelompokkan benda, kamu sedang menggunakan
    pengenalan pola.
  </div>
</template>
