import { useRouter } from "vue-router";
import { useMission } from "./mission";
import { stages } from "./stages";
export function useMissionNavigation() {
  const router = useRouter();
  const m = useMission();
  function go(id: number) {
    return router.push({ name: stages[id - 1]!.name });
  }
  async function next() {
    const id = m.unlockNext();
    if (id !== null) await go(id);
  }
  return {
    next,
    back: () => go(Math.max(1, m.state.current - 1)),
    resume: () => go(m.state.unlocked),
    home: () => router.push({ name: "objectives" }),
  };
}
