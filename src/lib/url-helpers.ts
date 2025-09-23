import { Post } from '@/types/wordpress';

/**
 * Generates a WordPress-style URL with date for a post
 * Format: /YYYY/MM/DD/post-slug
 */
export function generatePostUrl(post: Post): string {
  const date = new Date(post.date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `/${year}/${month}/${day}/${post.slug}`;
}

/**
 * Extracts date parts from a WordPress-style URL
 */
export function parseDateFromUrl(year: string, month: string, day: string): Date {
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}