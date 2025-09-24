import { Post, Category, Comment } from '@/types/wordpress';

const BASE_URL = 'https://lafortunerdc.net/wp-json/wp/v2';

export async function fetchPosts(page = 1, perPage = 20, categoryId?: number): Promise<Post[]> {
  try {
    let url = `${BASE_URL}/posts?_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc`;
    
    if (categoryId) {
      url += `&categories=${categoryId}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/categories?per_page=50&orderby=name&order=asc`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchPostsByCategory(categorySlug: string, page = 1, perPage = 10): Promise<Post[]> {
  try {
    const categoriesResponse = await fetch(`${BASE_URL}/categories?slug=${categorySlug}`);
    const categories = await categoriesResponse.json();
    
    if (categories.length === 0) {
      return [];
    }
    
    const categoryId = categories[0].id;
    return fetchPosts(page, perPage, categoryId);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export function getExcerpt(content: string, wordLimit = 30): string {
  const strippedContent = content.replace(/<[^>]*>/g, '');
  const words = strippedContent.split(' ');
  
  if (words.length <= wordLimit) {
    return strippedContent;
  }
  
  return words.slice(0, wordLimit).join(' ') + '...';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getFeaturedImageUrl(post: Post, size = 'medium'): string {
  if (post._embedded?.["wp:featuredmedia"]?.[0]) {
    const media = post._embedded["wp:featuredmedia"][0];
    if (media.media_details?.sizes?.[size]) {
      return media.media_details.sizes[size].source_url;
    }
    return media.source_url;
  }
  return '/placeholder.svg';
}

export function getCategoryNames(post: Post): string[] {
  if (post._embedded?.["wp:term"]?.[0]) {
    return post._embedded["wp:term"][0].map(term => term.name);
  }
  return [];
}

export async function fetchComments(postId: number): Promise<Comment[]> {
  try {
    const response = await fetch(`${BASE_URL}/comments?post=${postId}&orderby=date&order=asc`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export async function submitComment(postId: number, author_name: string, author_email: string, content: string): Promise<Comment> {
  try {
    const response = await fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: postId,
        author_name,
        author_email,
        content,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw error;
  }
}