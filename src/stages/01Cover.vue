<script setup lang="ts">
import { useMission } from "../mission";
import SchoolScene from "../components/SchoolScene.vue";
import Mascot from "../components/Mascot.vue";
import { useMissionNavigation } from "../useMissionNavigation";
const nav = useMissionNavigation();
const m = useMission();
</script>
<template>
  <div class="cover-layout">
    <div class="cover-copy">
      <span class="eyebrow">PETUALANGAN BELAJAR · SMP</span>
      <h1>Misi berpikir<br /><em>komputasional.</em></h1>
      <p class="cover-subtitle">
        Menjaga lingkungan sekolah<br />dengan cara berpikir cerdas.
      </p>
      <div class="guide-bubble">
        <Mascot />
        <p>
          Hai, aku <strong>Daun!</strong><br />Siap menjadi Detektif Lingkungan?
        </p>
      </div>
      <button
        class="primary start-button"
        @click="
          m.complete();
          nav.next();
        "
      >
        Mulai misi <span>↗</span></button
      ><button
        v-if="m.state.unlocked > 1"
        class="secondary mt-3"
        @click="nav.resume()"
      >
        Lanjutkan misi {{ m.state.unlocked }} →
      </button>
      <div class="cover-meta">
        <span>◷ ±120 menit</span><span>✧ 20 tahap petualangan</span>
      </div>
    </div>
    <div class="cover-art">
      <SchoolScene />
      <div class="floating-label">🌱 Langkah kecil. Dampak besar.</div>
      <div class="concept-chips">
        <span>🧩 Dekomposisi</span><span>🔍 Pengenalan pola</span>
      </div>
    </div>
  </div>
</template>
