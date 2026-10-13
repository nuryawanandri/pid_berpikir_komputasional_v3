import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { waste } from "./content";
export const STORAGE_KEY = "pid-mission-v1";
export interface Progress {
  version: 1;
  current: number;
  unlocked: number;
  done: number[];
  choices: Record<string, string[]>;
  placements: Record<string, Record<string, string>>;
  attempts: Record<string, number>;
  note: string;
  order: string[];
}
export function fresh(): Progress {
  const order = waste.map((x) => x.id);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j]!, order[i]!];
  }
  return {
    version: 1,
    current: 1,
    unlocked: 1,
    done: [],
    choices: {},
    placements: {},
    attempts: {},
    note: "",
    order,
  };
}
export function restore(raw: string | null): Progress {
  try {
    const p = JSON.parse(raw || "null");
    const obj = (v: unknown) =>
      !!v && typeof v === "object" && !Array.isArray(v);
    const step = (v: unknown) =>
      Number.isInteger(v) && Number(v) >= 1 && Number(v) <= 20;
    if (
      !p ||
      p.version !== 1 ||
      !step(p.current) ||
      !step(p.unlocked) ||
      p.current > p.unlocked ||
      !Array.isArray(p.done) ||
      !p.done.every(step) ||
      !obj(p.choices) ||
      !Object.values(p.choices).every(
        (v) => Array.isArray(v) && v.every((x) => typeof x === "string"),
      ) ||
      !obj(p.placements) ||
      !Object.values(p.placements).every(
        (v) =>
          obj(v) &&
          Object.values(v as object).every((x) => typeof x === "string"),
      ) ||
      !obj(p.attempts) ||
      !Object.values(p.attempts).every(
        (x) => Number.isInteger(x) && Number(x) >= 0,
      ) ||
      typeof p.note !== "string" ||
      !Array.isArray(p.order) ||
      p.order.length !== 15 ||
      new Set(p.order).size !== 15 ||
      !p.order.every((id: string) => waste.some((x) => x.id === id))
    )
      return fresh();
    for (let i = 1; i < p.unlocked; i++)
      if (!p.done.includes(i)) return fresh();
    return p as Progress;
  } catch {
    return fresh();
  }
}
export const useMission = defineStore("mission", () => {
  const storageWarning = ref(false);
  let initial: Progress;
  try {
    initial = restore(localStorage.getItem(STORAGE_KEY));
  } catch {
    initial = fresh();
    storageWarning.value = true;
  }
  const state = ref(initial);
  watch(
    state,
    () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value));
      } catch {
        storageWarning.value = true;
      }
    },
    { deep: true, flush: "sync" },
  );
  const canNext = computed(() =>
    state.value.done.includes(state.value.current),
  );
  function complete(n = state.value.current) {
    if (!state.value.done.includes(n)) state.value.done.push(n);
  }
  function next() {
    if (canNext.value && state.value.current < 20) {
      state.value.current++;
      state.value.unlocked = Math.max(
        state.value.unlocked,
        state.value.current,
      );
      if (state.value.current === 20) complete(20);
    }
  }
  function back() {
    state.value.current = Math.max(1, state.value.current - 1);
  }
  function choose(key: string, id: string, multi = true) {
    const a = (state.value.choices[key] ??= []);
    state.value.choices[key] = multi
      ? a.includes(id)
        ? a.filter((x) => x !== id)
        : [...a, id]
      : [id];
  }
  function visit(key: string, id: string) {
    if (!(state.value.choices[key] || []).includes(id)) choose(key, id);
  }
  function reset() {
    state.value = fresh();
  }
  return {
    state,
    storageWarning,
    canNext,
    complete,
    next,
    back,
    choose,
    visit,
    reset,
  };
});
