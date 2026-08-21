"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

const MUTED_STORAGE_KEY = "academy:muted";
const MUTED_QUERY_KEY = ["academy", "muted"] as const;

function readStoredMuted(): boolean {
  if (typeof window === "undefined") return true;

  const stored = window.localStorage.getItem(MUTED_STORAGE_KEY);
  return stored === null ? true : stored === "1";
}

function writeStoredMuted(muted: boolean) {
  window.localStorage.setItem(MUTED_STORAGE_KEY, muted ? "1" : "0");
}

/** Preferência de som persistida entre sessões, compartilhada por todos os players. */
export function useAcademyMuted() {
  const queryClient = useQueryClient();

  const { data: muted } = useQuery({
    queryKey: MUTED_QUERY_KEY,
    queryFn: readStoredMuted,
    staleTime: Infinity,
    initialData: readStoredMuted,
  });

  const setMuted = (value: boolean | ((current: boolean) => boolean)) => {
    const current = queryClient.getQueryData<boolean>(MUTED_QUERY_KEY) ?? true;
    const next = typeof value === "function" ? value(current) : value;

    writeStoredMuted(next);
    queryClient.setQueryData(MUTED_QUERY_KEY, next);
  };

  return [muted ?? true, setMuted] as const;
}
