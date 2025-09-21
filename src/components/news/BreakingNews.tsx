import { useState, useEffect } from 'react';
import { Post } from '@/types/wordpress';

interface BreakingNewsProps {
  posts: Post[];
}

export const BreakingNews = ({ posts }: BreakingNewsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (posts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [posts.length]);

  if (posts.length === 0) return null;

  return (
    <div className="bg-breaking-bg border border-breaking-border py-2 px-4 overflow-hidden">
      <div className="container mx-auto flex items-center">
        <div className="bg-news-primary text-white px-3 py-1 text-sm font-bold mr-4 whitespace-nowrap">
          BREAKING NEWS
        </div>
        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {posts.map((post, index) => (
              <div key={post.id} className="flex-shrink-0 w-full">
                <a 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-news-primary transition-colors text-sm font-medium"
                >
                  {post.title.rendered}
                </a>
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicators */}
        <div className="flex space-x-1 ml-4">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-news-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};