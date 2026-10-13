<script setup lang="ts">
import { useMission } from "../mission";
import ExploreCards from "../components/ExploreCards.vue";
import { goals } from "../content";
const m = useMission();
</script>
<template>
  <p class="lead">
    Bisakah kamu menemukan cara berpikir komputasional dalam kegiatan Adiwiyata?
  </p>
  <ExploreCards :cards="goals" activity="goals" />
  <p class="helper">Buka keempat bekal misimu sebelum berangkat.</p>
</template>
