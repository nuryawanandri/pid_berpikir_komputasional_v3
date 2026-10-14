import { inject, type InjectionKey } from "vue";
export const requestResetKey: InjectionKey<() => void> =
  Symbol("request-reset");
export function useResetProgress() {
  const requestReset = inject(requestResetKey);
  if (!requestReset) throw new Error("Reset progress provider is missing");
  return requestReset;
}
