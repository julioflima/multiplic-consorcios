"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { experimental_createQueryPersister } from "@tanstack/react-query-persist-client";

/** Por quanto tempo o cache persistido em localStorage continua válido. */
const MAX_PERSISTED_AGE = 1000 * 60 * 60 * 24 * 30;

function createQueryClient() {
  const persister =
    typeof window === "undefined"
      ? undefined
      : experimental_createQueryPersister({
          storage: window.localStorage,
          maxAge: MAX_PERSISTED_AGE,
          prefix: "multiplic-query-cache",
        }).persisterFn;

  return new QueryClient({
    defaultOptions: {
      queries: {
        persister,
        gcTime: MAX_PERSISTED_AGE,
      },
    },
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
