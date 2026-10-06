import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // Only actual indexable pages belong here. Section anchors are not routes.
  // No lastModified is emitted without a reliable content modification date.
  return [{ url: siteUrl }];
}
