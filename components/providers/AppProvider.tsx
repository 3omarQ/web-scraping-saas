"use client"

import { ThemeProvider } from "next-themes"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function AppProviders({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>

            {children}
            {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            </ThemeProvider> */}

            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}