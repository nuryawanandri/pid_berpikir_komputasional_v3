<script setup lang="ts">
import { useMission } from "../mission";
import { ref } from "vue";
import SortBoard from "../components/SortBoard.vue";
import { detectiveData, decomposition } from "../content";
const feedback = ref("");
function pattern(a: string) {
  if (a === "Kantin setelah istirahat") {
    m.visit("detective", "pattern");
    feedback.value =
      "Tepat! Pada ketiga hari, kantin setelah istirahat selalu memiliki jumlah tertinggi.";
  } else
    feedback.value =
      "Bandingkan setiap lokasi pada ketiga hari, sebelum dan setelah istirahat.";
}
function finish() {
  if (
    m.state.choices.detective?.includes("pattern") &&
    Object.keys(m.state.placements.detective || {}).length === 3
  )
    m.complete();
}
const m = useMission();
</script>
<template>
  <p class="lead">Sampah plastik paling banyak muncul kapan dan di mana?</p>
  <div class="data-table-wrap">
    <table>
      <caption>
        Data simulasi · jumlah benda plastik yang ditemukan
      </caption>
      <thead>
        <tr>
          <th>Hari</th>
          <th>Lokasi</th>
          <th>Sebelum istirahat</th>
          <th>Setelah istirahat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in detectiveData" :key="r.day + r.place">
          <td>{{ r.day }}</td>
          <td>{{ r.place }}</td>
          <td>{{ r.before }}</td>
          <td>
            <span
              class="data-bar"
              :style="{ width: (r.after / 28) * 75 + '%' }"
            ></span
            ><strong>{{ r.after }}</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="choice-row mt-5">
    <button
      v-for="a in [
        'Kantin setelah istirahat',
        'Kelas sebelum istirahat',
        'Taman setelah istirahat',
      ]"
      :key="a"
      class="secondary"
      @click="
        pattern(a);
        finish();
      "
    >
      {{ a }}
    </button>
  </div>
  <p v-if="feedback" class="feedback" role="status">{{ feedback }}</p>
  <h3 class="question">Pecah masalah ini menjadi pekerjaan kecil.</h3>
  <SortBoard
    :cards="
      decomposition.filter((c) => ['sumber', 'pilah', 'bersih'].includes(c.id))
    "
    :targets="['Bagian masalah yang akan ditangani']"
    activity="detective"
    free
    :auto-complete="false"
    @finished="finish"
  />
</template>
