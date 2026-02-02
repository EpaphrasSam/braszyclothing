"use client";

import { HeroProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeroProvider>{children}</HeroProvider>;
}
