<script setup lang="ts">
import { useMission } from "../mission";
import { ref } from "vue";
import { patterns } from "../content";
const feedback = ref("");
function answer(i: number, j: number) {
  if (patterns[i]!.answer === j) {
    m.visit("patterns", String(i));
    feedback.value = patterns[i]!.reason;
    if (m.state.choices.patterns!.length === 3) m.complete();
  } else {
    const key = "pattern" + i;
    m.state.attempts[key] = (m.state.attempts[key] || 0) + 1;
    feedback.value = "Bandingkan semua catatan, bukan hanya satu kejadian.";
    if (m.state.attempts[key]! >= 2)
      feedback.value += " Petunjuk: " + patterns[i]!.reason;
  }
}
const m = useMission();
</script>
<template>
  <p class="lead">
    Pola bukan hanya tentang sampah. Cari keteraturan pada tiga situasi ini.
  </p>
  <p class="helper">Data simulasi untuk pembelajaran.</p>
  <div class="pattern-grid">
    <article v-for="(p, i) in patterns" :key="p.title" class="pattern-card">
      <span class="eyebrow"
        >TANTANGAN {{ i + 1 }}
        {{ m.state.choices.patterns?.includes(String(i)) ? "✓" : "" }}</span
      >
      <h3>{{ p.title }}</h3>
      <ul>
        <li v-for="d in p.data" :key="d">{{ d }}</li>
      </ul>
      <p>{{ p.question }}</p>
      <button
        v-for="(a, j) in p.options"
        :key="a"
        class="secondary"
        @click="answer(i, j)"
      >
        {{ a }}
      </button>
    </article>
  </div>
  <p v-if="feedback" role="status" class="feedback">{{ feedback }}</p>
</template>
