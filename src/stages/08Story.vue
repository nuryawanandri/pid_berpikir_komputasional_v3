<script setup lang="ts">
import { useMission } from "../mission";
import { ref } from "vue";
import SchoolScene from "../components/SchoolScene.vue";
const page = ref(0);
const scenes = [
  [
    "Bel istirahat baru saja berakhir…",
    "Setelah jam istirahat, beberapa bagian sekolah terlihat penuh sampah.",
  ],
  [
    "Banyak benda, satu masalah besar.",
    "Ada sisa makanan, botol plastik, kertas, kemasan makanan, dan kaleng. Sampah juga bercampur di tempat pengumpulan.",
  ],
  [
    "Sekolah kita butuh bantuan!",
    "Bagaimana cara kita menyelesaikan masalah sampah di sekolah?",
  ],
];
function turn(n: number) {
  page.value = n;
  m.visit("story", String(n));
  if (m.state.choices.story!.length === 3) m.complete();
}
const m = useMission();
m.visit("story", "0");
</script>
<template>
  <div class="story-layout">
    <SchoolScene messy />
    <div class="story-panel">
      <span class="eyebrow">CERITA {{ page + 1 }} / 3</span>
      <h3>{{ scenes[page]![0] }}</h3>
      <p>{{ scenes[page]![1] }}</p>
      <div class="choice-row">
        <button
          class="secondary"
          :disabled="page === 0"
          @click="turn(page - 1)"
        >
          ← Adegan</button
        ><button class="primary" :disabled="page === 2" @click="turn(page + 1)">
          Adegan →
        </button>
      </div>
    </div>
  </div>
</template>
