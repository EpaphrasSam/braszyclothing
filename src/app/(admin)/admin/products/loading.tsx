export default function ProductsLoading() {
  return (
    <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center bg-[#0f0f0f]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <p className="text-sm text-white/70">Loading Sanity Studio…</p>
      </div>
    </div>
  );
}
