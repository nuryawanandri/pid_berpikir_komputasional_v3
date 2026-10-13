<script setup lang="ts">
import { ref } from "vue";
import { useMission } from "../mission";
import type { Card } from "../content";
const props = defineProps<{
  cards: Card[];
  activity: string;
  minimum?: number;
}>();
const m = useMission();
const active = ref("");
function open(c: Card) {
  active.value = c.id;
  m.visit(props.activity, c.id);
  if (
    (m.state.choices[props.activity]?.length || 0) >=
    (props.minimum || props.cards.length)
  )
    m.complete();
}
</script>
<template>
  <div class="card-grid">
    <button
      v-for="c in cards"
      :key="c.id"
      class="activity-card"
      :class="{ selected: m.state.choices[activity]?.includes(c.id) }"
      @click="open(c)"
    >
      <span class="card-icon">{{ c.icon }}</span
      ><strong>{{ c.label }}</strong
      ><span class="card-foot">{{
        m.state.choices[activity]?.includes(c.id)
          ? "Sudah dijelajahi ✓"
          : "Sentuh untuk menjelajah ↗"
      }}</span>
    </button>
  </div>
  <div v-if="active" class="feedback" role="status">
    {{ cards.find((c) => c.id === active)?.detail }}
  </div>
</template>
