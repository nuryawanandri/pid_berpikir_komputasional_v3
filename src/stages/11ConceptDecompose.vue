<script setup lang="ts">
import { useMission } from "../mission";
import { ref } from "vue";
const feedback = ref("");
function answer(i: number) {
  m.choose("decomposeAnswer", String(i), false);
  if (i === 1) m.complete();
  else
    feedback.value =
      "Ingat peta yang kamu buat: satu masalah besar memiliki beberapa bagian yang bisa ditangani.";
}
const m = useMission();
</script>
<template>
  <h3 class="question">Apa yang baru saja kamu lakukan?</h3>
  <div class="stack-options">
    <button
      v-for="(a, i) in [
        'Menghafalkan jenis sampah',
        'Memecah masalah menjadi bagian-bagian kecil',
        'Menggambar lingkungan',
      ]"
      :key="a"
      class="secondary"
      :class="{
        selected: m.state.choices.decomposeAnswer?.includes(String(i)),
      }"
      @click="answer(i)"
    >
      {{ String.fromCharCode(65 + i) }}. {{ a }}
    </button>
  </div>
  <div v-if="m.canNext" class="concept-banner">
    <span>🧩</span>
    <div>
      <h3>Dekomposisi</h3>
      <p>
        Dekomposisi adalah memecah masalah yang kompleks menjadi bagian-bagian
        yang lebih kecil agar lebih mudah dipahami dan diselesaikan.
      </p>
      <small
        >Tadi kamu memecah pengelolaan sampah menjadi kegiatan mengenali,
        mengumpulkan, memilah, dan bagian lainnya.</small
      >
    </div>
  </div>
  <p v-else-if="feedback" role="status" class="feedback">{{ feedback }}</p>
</template>
