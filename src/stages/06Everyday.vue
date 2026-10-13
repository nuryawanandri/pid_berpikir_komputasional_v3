<script setup lang="ts">
import { useMission } from "../mission";
import { daily } from "../content";
const m = useMission();
</script>
<template>
  <p class="lead">
    Menurutmu, aktivitas mana yang membutuhkan cara berpikir sistematis?
  </p>
  <div class="card-grid">
    <button
      v-for="c in daily"
      :key="c.id"
      class="activity-card"
      :class="{ selected: m.state.choices.everyday?.includes(c.id) }"
      @click="m.choose('everyday', c.id)"
    >
      <span class="card-icon">{{ c.icon }}</span
      ><strong>{{ c.label }}</strong>
    </button>
  </div>
  <button
    class="primary mt-5"
    :disabled="!m.state.choices.everyday?.length"
    @click="m.complete()"
  >
    Temukan hubungannya ↗
  </button>
  <div v-if="m.canNext" class="feedback">
    Ternyata semua aktivitas ini dapat terbantu oleh cara berpikir sistematis!
    Kita menentukan kebutuhan, membagi pekerjaan, atau mengenali kegiatan
    berulang. Selanjutnya, kita akan mencoba dekomposisi dan pengenalan pola.
  </div>
</template>
