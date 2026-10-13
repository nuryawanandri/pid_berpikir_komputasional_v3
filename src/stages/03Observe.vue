<script setup lang="ts">
import { useMission } from "../mission";
import { ref } from "vue";
import SchoolScene from "../components/SchoolScene.vue";
import { observations } from "../content";
const active = ref("");
function discover(id: string) {
  active.value = id;
  m.visit("observations", id);
  if (m.state.choices.observations!.length >= 3) m.complete();
}
const m = useMission();
</script>
<template>
  <p class="lead">Sentuh hal-hal yang menurutmu perlu diperhatikan.</p>
  <div class="observation-layout">
    <SchoolScene
      interactive
      :found="m.state.choices.observations"
      @discover="discover"
    />
    <aside class="observation-notes">
      <span class="eyebrow">BUKU DETEKTIF</span>
      <h3>{{ m.state.choices.observations?.length || 0 }} dari 6 ditemukan</h3>
      <p v-if="!active">
        Amati kelas, halaman, dan taman. Apa yang menarik perhatianmu?
      </p>
      <p v-else class="feedback">
        {{ observations.find((o) => o.id === active)?.detail }}
      </p>
      <div
        v-for="o in observations.filter((o) =>
          m.state.choices.observations?.includes(o.id),
        )"
        :key="o.id"
        class="finding"
      >
        {{ o.icon }} {{ o.label }} <span>✓</span>
      </div>
    </aside>
  </div>
</template>
