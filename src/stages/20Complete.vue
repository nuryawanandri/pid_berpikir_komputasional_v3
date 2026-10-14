<script setup lang="ts">
import Mascot from "../components/Mascot.vue";
import { useMissionNavigation } from "../useMissionNavigation";
import { useResetProgress } from "../resetProgress";
const nav = useMissionNavigation();
const requestReset = useResetProgress();
</script>
<template>
  <div class="completion">
    <div class="completion-emblem"><Mascot /><span>✦</span></div>
    <span class="eyebrow">DETEKTIF LINGKUNGAN HEBAT</span>
    <h2>Misi selesai!</h2>
    <p class="lead">
      Masalah yang besar akan terasa lebih mudah ketika kita tahu cara
      memecahnya dan menemukan polanya.
    </p>
    <div class="summary-concepts">
      <article>
        <span>🧩</span>
        <h3>Dekomposisi</h3>
        <p>Memecah masalah besar menjadi bagian yang lebih kecil.</p>
      </article>
      <article>
        <span>🔍</span>
        <h3>Pengenalan pola</h3>
        <p>Menemukan kesamaan, perbedaan, atau keteraturan.</p>
      </article>
    </div>
    <div class="choice-row justify-center">
      <button class="primary" @click="requestReset">↻ Ulangi misi</button
      ><button class="secondary" @click="nav.home()">⌂ Kembali ke awal</button>
    </div>
    <p class="helper">Bawa cara berpikir cerdas ini ke lingkungan sekolahmu.</p>
  </div>
</template>
