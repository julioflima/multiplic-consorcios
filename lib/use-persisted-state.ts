"use client";

import { useCallback } from "react";
import { type QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Estado de cliente com o mesmo formato de useState, mas compartilhado por
 * qualquer componente que use a mesma queryKey e persistido em localStorage
 * (via o persister configurado em app/providers.tsx), sobrevivendo a
 * navegação e reload da página.
 */
export function usePersistedState<T>(queryKey: QueryKey, defaultValue: T) {
  const queryClient = useQueryClient();
  const queryKeyHash = JSON.stringify(queryKey);

  const { data } = useQuery({
    queryKey,
    queryFn: () => defaultValue,
    initialData: defaultValue,
    staleTime: Infinity,
  });

  const setValue = useCallback(
    (value: T | ((current: T) => T)) => {
      queryClient.setQueryData<T>(queryKey, (current) => {
        const base = current ?? defaultValue;
        return typeof value === "function"
          ? (value as (current: T) => T)(base)
          : value;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryClient, queryKeyHash],
  );

  return [data as T, setValue] as const;
}
