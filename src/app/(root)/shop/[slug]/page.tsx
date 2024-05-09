import Shop from "@/components/pages/shop/Shop";
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string };
}) {
  return (
    <div className="sm:m-10 m-5">
      <Shop slug={params.slug} filter={searchParams?.filter} />
    </div>
  );
}
