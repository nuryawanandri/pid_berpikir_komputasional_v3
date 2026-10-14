import {
  createRouter,
  createWebHashHistory,
  type RouterHistory,
} from "vue-router";
import type { Pinia } from "pinia";
import { stages } from "./stages";
import { useMission } from "./mission";

export function createMissionRouter(
  pinia: Pinia,
  history: RouterHistory = createWebHashHistory(import.meta.env.BASE_URL),
) {
  const router = createRouter({
    history,
    routes: [
      {
        path: "/",
        name: "objectives",
        component: () => import("./pages/LearningObjectives.vue"),
      },
      ...stages.map((stage) => ({
        path: "/misi/" + stage.slug,
        name: stage.name,
        component: stage.component,
        meta: { stageId: stage.id },
      })),
      { path: "/:pathMatch(.*)*", redirect: { name: "objectives" } },
    ],
    scrollBehavior: () => ({ top: 0 }),
  });
  router.beforeEach((to) => {
    const m = useMission(pinia);
    const id = to.meta.stageId;
    if (typeof id === "number" && id > m.state.unlocked)
      return { name: stages[m.state.unlocked - 1]!.name, replace: true };
  });
  router.afterEach((to, _from, failure) => {
    if (failure) return;
    if (typeof to.meta.stageId === "number")
      useMission(pinia).activate(to.meta.stageId);
    document.title =
      to.name === "objectives"
        ? "Tujuan Pembelajaran · Misi Bumi"
        : `${stages.find((s) => s.name === to.name)?.title || "Misi Bumi"} · Misi Bumi`;
  });
  return router;
}
