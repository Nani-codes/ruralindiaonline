export const getArticlesUrl = ({
  categoryIds,
}: {
  categoryIds?: number[] | string[];
}) => {
  const params = new URLSearchParams();

  if (categoryIds && categoryIds.length > 0) {
    params.set('categoryIds', categoryIds.join(','));
  }

  return `/articles?${params.toString()}`;
}