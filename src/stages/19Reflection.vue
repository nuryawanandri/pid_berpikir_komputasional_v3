<script setup lang="ts">
import { useMission } from "../mission";
import { reflections } from "../content";
const m = useMission();
</script>
<template>
  <p class="lead">Hari ini saya memahami bahwa…</p>
  <div class="reflection-list">
    <button
      v-for="(r, i) in reflections"
      :key="r"
      class="reflection-option"
      :aria-pressed="!!m.state.choices.reflection?.includes(String(i))"
      @click="m.choose('reflection', String(i))"
    >
      <span class="checkbox">{{
        m.state.choices.reflection?.includes(String(i)) ? "✓" : ""
      }}</span
      >{{ r }}
    </button>
  </div>
  <h3 class="question">
    Dalam kegiatan Adiwiyata apa lagi kamu menemukan dekomposisi atau pengenalan
    pola?
  </h3>
  <label class="note-label" for="reflection-note"
    >Catatan kelas
    <span>(opsional — jawaban boleh disampaikan lisan)</span></label
  ><textarea
    id="reflection-note"
    v-model="m.state.note"
    maxlength="3000"
    rows="3"
    placeholder="Tuliskan ide kelas di sini…"
  ></textarea
  ><button
    class="primary mt-5"
    :disabled="!m.state.choices.reflection?.length"
    @click="m.complete()"
  >
    Guru: refleksi selesai ✓
  </button>
</template>
