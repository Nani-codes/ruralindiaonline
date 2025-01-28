interface CategoryImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface CategoryImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      large: CategoryImageFormat;
      small: CategoryImageFormat;
      medium: CategoryImageFormat;
      thumbnail: CategoryImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

interface CategoryAttributes {
  sub_title: string;
  we: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Title: string;
  category_image: {
    data: CategoryImage;
  };
}

export interface Category {
  id: number;
  attributes: CategoryAttributes;
}