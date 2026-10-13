<script setup lang="ts">
import { useMission } from "../mission";
import ExploreCards from "../components/ExploreCards.vue";
import { daily } from "../content";
const m = useMission();
</script>
<template>
  <div class="concept-banner">
    <span>🧠</span>
    <p>
      Berpikir komputasional adalah cara berpikir untuk memahami masalah dan
      mencari solusi <strong>secara sistematis.</strong>
    </p>
  </div>
  <p class="lead">
    Bukan hanya untuk komputer atau programmer. Kita menggunakannya setiap hari!
  </p>
  <ExploreCards :cards="daily" activity="daily" :minimum="1" />
</template>
