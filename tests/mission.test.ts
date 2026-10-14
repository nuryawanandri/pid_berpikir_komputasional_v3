import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { fresh, restore, useMission, STORAGE_KEY } from "../src/mission";
import { waste } from "../src/content";
beforeEach(() => {
  setActivePinia(createPinia());
  const values = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => values.get(k) ?? null,
    setItem: (k: string, v: string) => values.set(k, v),
  });
});
describe("mission progress", () => {
  it("unlocks without activating until navigation succeeds", () => {
    const m = useMission();
    expect(m.unlockNext()).toBeNull();
    m.activate(8);
    expect(m.state.current).toBe(1);
    m.complete();
    expect(m.unlockNext()).toBe(2);
    expect(m.state.current).toBe(1);
    expect(m.state.unlocked).toBe(2);
    m.activate(2);
    expect(m.state.current).toBe(2);
  });
  it("reset replaces only application data and clears all answers", () => {
    localStorage.setItem("other-app", "keep");
    const m = useMission();
    m.complete();
    m.unlockNext();
    m.activate(2);
    m.choose("goals", "a");
    m.state.note = "Catatan";
    m.state.placements = { waste: { w1: "Organik" } };
    m.state.attempts = { w1: 2 };
    m.reset();
    const saved = restore(localStorage.getItem(STORAGE_KEY));
    expect(saved.current).toBe(1);
    expect(saved.unlocked).toBe(1);
    expect(saved.done).toEqual([]);
    expect(saved.choices).toEqual({});
    expect(saved.placements).toEqual({});
    expect(saved.attempts).toEqual({});
    expect(saved.note).toBe("");
    expect(new Set(saved.order).size).toBe(15);
    expect(localStorage.getItem("other-app")).toBe("keep");
  });
  it("failed reset persistence keeps the session reset and reports failure", () => {
    const m = useMission();
    m.complete();
    m.state.note = "old";
    vi.stubGlobal("localStorage", {
      getItem: () => null,
      setItem: () => {
        throw Error("quota");
      },
    });
    m.reset();
    expect(m.state.note).toBe("");
    expect(m.state.done).toEqual([]);
    expect(m.storageWarning).toBe(true);
  });
  it("gates progress and preserves answers on back", () => {
    const m = useMission();
    {
      const id = m.unlockNext();
      if (id !== null) m.activate(id);
    }
    expect(m.state.current).toBe(1);
    m.complete();
    {
      const id = m.unlockNext();
      if (id !== null) m.activate(id);
    }
    m.choose("goals", "a");
    m.activate(1);
    expect(m.state.current).toBe(1);
    expect(m.state.choices.goals).toEqual(["a"]);
    expect(m.state.unlocked).toBe(2);
  });
  it("persists and restores session", () => {
    const m = useMission();
    m.complete();
    {
      const id = m.unlockNext();
      if (id !== null) m.activate(id);
    }
    m.state.note = "Ide kelas";
    expect(restore(localStorage.getItem(STORAGE_KEY)).note).toBe("Ide kelas");
    expect(restore(localStorage.getItem(STORAGE_KEY)).current).toBe(2);
  });
  it("rejects malformed and inconsistent data", () => {
    for (const raw of [
      "broken",
      "null",
      "{}",
      JSON.stringify({ ...fresh(), current: 99 }),
      JSON.stringify({ ...fresh(), unlocked: 5 }),
      JSON.stringify({ ...fresh(), choices: { a: 4 } }),
      JSON.stringify({ ...fresh(), placements: { a: null } }),
    ])
      expect(restore(raw).current).toBe(1);
  });
  it("cover preserves session but reset erases it", () => {
    const m = useMission();
    m.complete();
    {
      const id = m.unlockNext();
      if (id !== null) m.activate(id);
    }
    m.state.current = 1;
    expect(m.state.unlocked).toBe(2);
    m.reset();
    expect(m.state.unlocked).toBe(1);
    expect(m.state.done).toEqual([]);
  });
  it("continues when storage is unavailable", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw Error("blocked");
      },
      setItem: () => {
        throw Error("quota");
      },
    });
    const m = useMission();
    m.complete();
    {
      const id = m.unlockNext();
      if (id !== null) m.activate(id);
    }
    expect(m.state.current).toBe(2);
    expect(m.storageWarning).toBe(true);
  });
  it("contains 15 unique objects with explicit special cases", () => {
    expect(waste).toHaveLength(15);
    expect(new Set(waste.map((x) => x.id)).size).toBe(15);
    expect(waste.filter((x) => x.target === "B3").map((x) => x.id)).toEqual([
      "w6",
      "w14",
    ]);
    expect(waste.find((x) => x.id === "w4")?.target).toBe("Organik");
    expect(waste.find((x) => x.id === "w15")?.detail).toContain(
      "tanpa bahan tambahan",
    );
  });
});
