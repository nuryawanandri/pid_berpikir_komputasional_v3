<script setup lang="ts">
import { useMission } from "../mission";
import { waste } from "../content";
const m = useMission();
</script>
<template>
  <p class="lead">Mengapa benda-benda ini berada dalam kelompok yang sama?</p>
  <div class="drop-grid">
    <div
      v-for="(group, i) in ['Organik', 'Anorganik', 'B3']"
      :key="group"
      class="result-group"
      :class="'zone-' + i"
    >
      <h3>{{ group }}</h3>
      <span
        v-for="c in waste.filter(
          (c) => m.state.placements.waste?.[c.id] === group,
        )"
        :key="c.id"
        class="placed-card"
        >{{ c.icon }} {{ c.label }}</span
      >
    </div>
  </div>
  <h3 class="question">Apa kesamaan atau ciri yang kamu temukan?</h3>
  <div class="choice-row">
    <button
      v-for="a in ['Bahan', 'Sifat', 'Kesamaan', 'Perbedaan']"
      :key="a"
      class="secondary"
      :aria-pressed="!!m.state.choices.traits?.includes(a)"
      :class="{ selected: m.state.choices.traits?.includes(a) }"
      @click="m.choose('traits', a)"
    >
      {{ a }}
    </button>
  </div>
  <button
    class="primary mt-5"
    :disabled="!m.state.choices.traits?.length"
    @click="m.complete()"
  >
    Guru: diskusi selesai ✓
  </button>
</template>
