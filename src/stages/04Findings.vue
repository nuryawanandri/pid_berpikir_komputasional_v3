<script setup lang="ts">
import { useMission } from "../mission";
import { observations } from "../content";
const m = useMission();
</script>
<template>
  <div class="found-grid">
    <div
      v-for="o in observations.filter((o) =>
        m.state.choices.observations?.includes(o.id),
      )"
      :key="o.id"
      class="mini-card"
    >
      {{ o.icon }} {{ o.detail }}
    </div>
  </div>
  <h3 class="question">
    Kalau masalahnya beragam, apakah cara menyelesaikannya juga sama?
  </h3>
  <div class="choice-row">
    <button
      v-for="a in ['Ya', 'Tidak', 'Belum tahu']"
      :key="a"
      class="secondary"
      :class="{ selected: m.state.choices.finding?.includes(a) }"
      @click="
        m.choose('finding', a, false);
        m.complete();
      "
    >
      {{ a }}
    </button>
  </div>
  <div v-if="m.canNext" class="feedback">
    Menarik! Mari kita cari tahu bagaimana cara berpikir yang dapat membantu
    kita menyelesaikan berbagai masalah.
  </div>
</template>
