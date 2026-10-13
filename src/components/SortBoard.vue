<script setup lang="ts">
import { computed, ref } from "vue";
import { useMission } from "../mission";
import type { Card } from "../content";
const p = withDefaults(
  defineProps<{
    cards: Card[];
    targets: string[];
    activity: string;
    free?: boolean;
    autoComplete?: boolean;
  }>(),
  { autoComplete: true },
);
const emit = defineEmits<{ finished: [] }>();
const m = useMission();
const selected = ref("");
const feedback = ref("");
const dragging = ref(false);
const point = ref({ x: 0, y: 0 });
let origin = { x: 0, y: 0 };
let suppressed = false;
const root = ref<HTMLElement>();
const placed = computed(() => m.state.placements[p.activity] || {});
const remaining = computed(() => p.cards.filter((c) => !placed.value[c.id]));
function assign(target: string) {
  const c = p.cards.find((x) => x.id === selected.value);
  if (!c || placed.value[c.id]) return;
  const key = p.activity + ":" + c.id;
  if (p.free || c.target === target) {
    m.state.placements[p.activity] ??= {};
    m.state.placements[p.activity]![c.id] = target;
    feedback.value =
      "Tepat! " +
      (c.detail || "Bagian kecil ini membantu menyelesaikan masalah besar.");
    selected.value = "";
    if (p.cards.every((x) => placed.value[x.id])) {
      if (p.autoComplete !== false) m.complete();
      emit("finished");
    }
  } else {
    m.state.attempts[key] = (m.state.attempts[key] || 0) + 1;
    feedback.value = "Coba amati kembali ciri benda atau kegiatan ini.";
    if (m.state.attempts[key]! >= 2) feedback.value += " Petunjuk: " + c.detail;
  }
}
function down(e: PointerEvent, id: string) {
  if (e.button !== 0) return;
  selected.value = id;
  origin = { x: e.clientX, y: e.clientY };
  point.value = origin;
  dragging.value = false;
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
}
function move(e: PointerEvent) {
  if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return;
  point.value = { x: e.clientX, y: e.clientY };
  if (Math.hypot(e.clientX - origin.x, e.clientY - origin.y) > 8)
    dragging.value = true;
}
function up(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement;
  if (!el.hasPointerCapture(e.pointerId)) return;
  el.releasePointerCapture(e.pointerId);
  if (dragging.value) {
    const target = document
      .elementFromPoint(e.clientX, e.clientY)
      ?.closest<HTMLElement>("[data-drop]");
    if (target && root.value?.contains(target)) assign(target.dataset.drop!);
    else
      feedback.value =
        "Benda kembali ke tempat semula. Sentuh benda, lalu sentuh kelompok tujuan.";
    suppressed = true;
    setTimeout(() => (suppressed = false), 0);
  }
  dragging.value = false;
}
function cancel() {
  dragging.value = false;
  selected.value = "";
}
</script>
<template>
  <div ref="root" class="sort-board">
    <div class="sort-instruction">
      <span>↔ Seret, atau sentuh kartu lalu kelompok tujuan.</span
      ><strong
        >{{ cards.length - remaining.length }} / {{ cards.length }}</strong
      >
    </div>
    <div class="sort-source">
      <button
        v-for="c in remaining"
        :key="c.id"
        class="sort-card"
        :class="{ selected: selected === c.id }"
        :aria-pressed="selected === c.id"
        :data-card="c.id"
        @pointerdown="down($event, c.id)"
        @pointermove="move"
        @pointerup="up"
        @pointercancel="cancel"
        @lostpointercapture="dragging = false"
        @click="!suppressed && (selected = c.id)"
        @keydown.esc="cancel"
      >
        <span>{{ c.icon }}</span
        >{{ c.label }}
      </button>
      <p v-if="!remaining.length" class="all-placed">
        ✦ Semua kartu telah menemukan tempatnya!
      </p>
    </div>
    <div class="drop-grid" :class="{ 'many-targets': targets.length > 3 }">
      <button
        v-for="(target, i) in targets"
        :key="target"
        class="drop-zone"
        :class="'zone-' + i"
        :data-drop="target"
        @click="assign(target)"
      >
        <strong>{{ target }}</strong
        ><span class="drop-hint">{{
          selected ? "Letakkan di sini ↓" : "Pilih kartu untuk ditempatkan"
        }}</span
        ><span
          v-for="c in cards.filter((c) => placed[c.id] === target)"
          :key="c.id"
          class="placed-card"
          >{{ c.icon }} {{ c.label }}</span
        >
      </button>
    </div>
    <div v-if="feedback" role="status" class="feedback">{{ feedback }}</div>
    <div
      v-if="dragging"
      class="drag-ghost"
      :style="{ left: point.x + 'px', top: point.y + 'px' }"
    >
      {{ cards.find((c) => c.id === selected)?.icon }}
      {{ cards.find((c) => c.id === selected)?.label }}
    </div>
  </div>
</template>
