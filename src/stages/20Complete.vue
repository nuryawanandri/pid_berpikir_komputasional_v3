<script setup lang="ts">
import { useMission } from "../mission";
import { ref, nextTick } from "vue";
import Mascot from "../components/Mascot.vue";
const dialog = ref<HTMLDialogElement>();
const resetButton = ref<HTMLButtonElement>();
async function ask() {
  await nextTick();
  dialog.value?.showModal();
}
function close() {
  dialog.value?.close();
  resetButton.value?.focus();
}
function reset() {
  dialog.value?.close();
  m.reset();
}
const m = useMission();
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
      <button ref="resetButton" class="primary" @click="ask">
        ↻ Ulangi misi</button
      ><button class="secondary" @click="m.state.current = 1">
        ⌂ Kembali ke awal
      </button>
    </div>
    <p class="helper">Bawa cara berpikir cerdas ini ke lingkungan sekolahmu.</p>
  </div>
  <dialog ref="dialog" @cancel="close">
    <h3>Mulai petualangan baru?</h3>
    <p>Jawaban dan progres kelas pada perangkat ini akan dihapus.</p>
    <div class="choice-row">
      <button class="secondary" autofocus @click="close">Batal</button
      ><button class="primary" @click="reset">Ya, ulangi misi</button>
    </div>
  </dialog>
</template>
