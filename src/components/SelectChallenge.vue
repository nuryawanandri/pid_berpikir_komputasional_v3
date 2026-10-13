<script setup lang="ts">
import { ref } from "vue";
import { useMission } from "../mission";
import type { Card } from "../content";
const p = defineProps<{ cards: Card[]; correct: string[]; activity: string }>();
const m = useMission();
const checked = ref(false);
function check() {
  checked.value = true;
  const a = m.state.choices[p.activity] || [];
  if (a.length === p.correct.length && p.correct.every((id) => a.includes(id)))
    m.complete();
  else m.state.attempts[p.activity] = (m.state.attempts[p.activity] || 0) + 1;
}
</script>
<template>
  <div class="card-grid">
    <button
      v-for="c in cards"
      :key="c.id"
      class="activity-card"
      :class="{ selected: m.state.choices[activity]?.includes(c.id) }"
      :aria-pressed="!!m.state.choices[activity]?.includes(c.id)"
      @click="
        m.choose(activity, c.id);
        checked = false;
      "
    >
      <span class="card-icon">{{ c.icon }}</span
      ><strong>{{ c.label }}</strong
      ><small v-if="checked">{{ c.detail }}</small>
    </button>
  </div>
  <button
    class="primary mt-5"
    :disabled="!m.state.choices[activity]?.length"
    @click="check"
  >
    Periksa pilihan ↗
  </button>
  <div v-if="checked" class="feedback" role="status">
    {{
      m.canNext
        ? "Hebat! Bagian-bagian ini membantu kita memahami dan menyelesaikan masalah."
        : "Coba amati kembali. Pilih semua bagian yang membantu menyelesaikan masalah ini."
    }}<span v-if="!m.canNext && (m.state.attempts[activity] || 0) >= 2">
      Petunjuk: perubahan warna tidak membantu mencari sumber atau mengurangi
      sampah.</span
    >
  </div>
</template>
