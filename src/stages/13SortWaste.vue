<script setup lang="ts">
import { useMission } from "../mission";
import { computed } from "vue";
import SortBoard from "../components/SortBoard.vue";
import { waste } from "../content";
const cards = computed(() =>
  m.state.order.map((id) => waste.find((c) => c.id === id)!),
);
const m = useMission();
</script>
<template>
  <p class="lead">
    Seret setiap benda ke kelompok yang sesuai. Perhatikan bahan dan
    karakteristiknya.
  </p>
  <SortBoard
    :cards="cards"
    :targets="['Organik', 'Anorganik', 'B3']"
    activity="waste"
  />
  <details class="material-note">
    <summary>Dasar pengelompokan dalam permainan</summary>
    <p>
      Kita mengelompokkan berdasarkan bahan. Kertas dan tisu selulosa bersih
      masuk organik dalam latihan ini; kertas bersih tetap dapat dikumpulkan
      terpisah untuk daur ulang. Tisu yang dimaksud tidak mengandung bahan
      tambahan atau kontaminasi. Tidak semua bahan organik cocok untuk semua
      komposter. Warna adalah penanda permainan. Penanganan nyata mengikuti
      fasilitas sekolah. Baterai dan lampu TL ditangani orang dewasa.
    </p>
  </details>
</template>
