import Category from "@/components/pages/categories/Category";
export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <Category slug={params.slug} />
    </div>
  );
}
