"use client";

import { usePersistedState } from "@/lib/use-persisted-state";

/** Preferência de som persistida entre sessões, compartilhada por todos os players. */
export function useAcademyMuted() {
  return usePersistedState<boolean>(["academy", "muted"], true);
}
