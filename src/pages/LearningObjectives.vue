<script setup lang="ts">
import { useRouter } from "vue-router";
import Mascot from "../components/Mascot.vue";
const router = useRouter();
const objectives = [
  "Murid mampu menguraikan masalah pengelolaan sampah di satu area sekolah menjadi komponen yang relevan dengan menerapkan prinsip dekomposisi.",
  "Murid mampu menemukan persamaan dan perbedaan ciri objek dengan menerapkan prinsip pengenalan pola.",
  "Murid mampu menggunakan hasil dekomposisi dan pengenalan pola untuk mengusulkan tindakan perbaikan yang realistis, didukung bukti dan cara memeriksa hasil.",
];
</script>
<template>
  <section class="objectives-page" aria-labelledby="objectives-title">
    <div class="objectives-heading">
      <div>
        <span class="eyebrow">SEBELUM PETUALANGAN DIMULAI</span>
        <h1 id="objectives-title">Tujuan Pembelajaran</h1>
        <p class="lead">Tiga kemampuan yang akan kita bangun bersama.</p>
      </div>
      <Mascot />
    </div>
    <ol class="objectives-list">
      <li v-for="(objective, i) in objectives" :key="objective">
        <span class="objective-number" aria-hidden="true">0{{ i + 1 }}</span>
        <p>{{ objective }}</p>
      </li>
    </ol>
    <button
      class="primary objectives-start"
      @click="router.push({ name: 'misi-cover' })"
    >
      Mulai
    </button>
  </section>
</template>
