<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import { useMission } from "../mission";
const emit = defineEmits<{ reset: [saved: boolean] }>();
const dialog = ref<HTMLDialogElement>();
const m = useMission();
const router = useRouter();
let trigger: HTMLElement | null = null;
function open() {
  trigger = document.activeElement as HTMLElement;
  dialog.value?.showModal();
}
function cancel() {
  dialog.value?.close();
  if (trigger?.isConnected) trigger.focus();
}
async function confirm() {
  m.reset();
  dialog.value?.close();
  await router.replace({ name: "objectives" });
  emit("reset", !m.storageWarning);
  await nextTick();
  document.querySelector<HTMLElement>("main")?.focus();
}
defineExpose({ open });
</script>
<template>
  <dialog
    ref="dialog"
    aria-labelledby="reset-title"
    aria-describedby="reset-description"
    @cancel.prevent="cancel"
  >
    <h3 id="reset-title">Reset progres kelas?</h3>
    <p id="reset-description">
      Seluruh jawaban, catatan, dan progres kelas pada browser ini akan dihapus.
      Misi akan dimulai kembali dari tujuan pembelajaran.
    </p>
    <div class="choice-row">
      <button class="secondary" autofocus @click="cancel">Batal</button
      ><button class="primary" @click="confirm">Ya, reset progres</button>
    </div>
  </dialog>
</template>
