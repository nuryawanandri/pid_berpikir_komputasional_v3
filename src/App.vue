<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { useMission } from "./mission";
import { stages } from "./stages";
const m = useMission();
const stage = computed(() => stages[m.state.current - 1]!);
const main = ref<HTMLElement>();
const fullscreenMessage = ref("");
watch(
  () => m.state.current,
  async () => {
    await nextTick();
    window.scrollTo({ top: 0, behavior: "instant" });
    main.value?.focus();
  },
);
async function fullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    fullscreenMessage.value =
      "Layar penuh tidak tersedia. Gunakan pengaturan layar penuh pada browser.";
  }
}
</script>
<template>
  <div class="app-shell">
    <header class="topbar">
      <a href="#" class="brand" @click.prevent="m.state.current = 1"
        ><span class="brand-mark">♧</span
        ><span>MISI <b>BUMI</b><small>BERPIKIR KOMPUTASIONAL</small></span></a
      >
      <div class="header-context">
        <span class="live-dot"></span> KKA <span class="divider">/</span> SMP
        <span class="divider">/</span> ADIWIYATA
      </div>
      <button
        class="fullscreen-button"
        aria-label="Layar penuh"
        @click="fullscreen"
      >
        ⛶ <span>Layar penuh</span>
      </button>
    </header>
    <div
      v-if="m.storageWarning || fullscreenMessage"
      role="status"
      class="system-note"
    >
      {{
        fullscreenMessage ||
        "Progres hanya tersimpan selama sesi ini karena penyimpanan browser tidak tersedia."
      }}
    </div>
    <main ref="main" tabindex="-1" :class="{ cover: m.state.current === 1 }">
      <template v-if="m.state.current !== 1 && m.state.current !== 20"
        ><div class="stage-heading">
          <div>
            <span class="eyebrow"
              >{{ stage.phase }} <span class="eyebrow-line"></span> MISI
              {{ String(stage.id).padStart(2, "0") }}</span
            >
            <h2>{{ stage.title }}</h2>
          </div>
          <span class="stage-number">{{
            String(stage.id).padStart(2, "0")
          }}</span>
        </div></template
      ><component :is="stage.component" :key="stage.id" />
    </main>
    <footer class="mission-footer">
      <div class="progress-label">
        <span>{{
          m.state.current === 20
            ? "PETUALANGAN SELESAI"
            : stage.phase.toUpperCase()
        }}</span
        ><strong>Misi {{ m.state.current }} <span>/ 20</span></strong>
      </div>
      <div
        class="progress-track"
        role="progressbar"
        :aria-valuenow="m.state.current"
        :aria-valuemin="1"
        :aria-valuemax="20"
        aria-label="Progres misi"
      >
        <span
          v-for="n in 20"
          :key="n"
          :class="{ filled: n <= m.state.current }"
        ></span>
      </div>
      <div
        v-if="m.state.current > 1 && m.state.current < 20"
        class="nav-actions"
      >
        <button class="secondary" @click="m.back()">← Kembali</button
        ><button
          class="primary"
          :disabled="!m.canNext"
          aria-describedby="next-hint"
          @click="m.next()"
        >
          Lanjut →
        </button>
      </div>
      <span v-else class="footer-caption">SATU SEKOLAH. BANYAK PERUBAHAN.</span>
      <p
        v-if="m.state.current > 1 && m.state.current < 20"
        id="next-hint"
        class="next-hint"
      >
        {{ m.canNext ? "Siap! Mari lanjutkan petualangan." : stage.hint }}
      </p>
    </footer>
  </div>
</template>
