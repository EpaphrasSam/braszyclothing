"use client";

import dynamic from "next/dynamic";
import config from "../../../../../../sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-[#0f0f0f]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="text-sm text-white/70">Loading Sanity Studio…</p>
        </div>
      </div>
    ),
  }
);

export default function StudioPage() {
  return (
    <div className="h-[calc(100vh-4rem)] min-h-[600px] w-full">
      <NextStudio config={config} />
    </div>
  );
}
