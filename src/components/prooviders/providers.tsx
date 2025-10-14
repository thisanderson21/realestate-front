"use client";
import React, {useState} from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { RepositoryIocProvider } from '../../services/context';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos - datos considerados "frescos"
            gcTime: 1000 * 60 * 10, // 10 minutos - tiempo en caché antes de limpiar
            refetchOnWindowFocus: false, // No refetch al volver a la pestaña
            refetchOnMount: false, // No refetch automático al montar
            refetchOnReconnect: false, // No refetch al reconectar internet
            retry: 1, // Solo 1 reintento en caso de error
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RepositoryIocProvider>
          <ThemeProvider>{children}</ThemeProvider>
      </RepositoryIocProvider>
    </QueryClientProvider>
  );
}