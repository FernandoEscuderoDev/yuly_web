export const prerender = false;
import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { urlForImage } from "../sanity/lib/urlForImage";

const POSTS_PER_PAGE = 6;
const VISIBLE_PAGES = 5;

const PaginationButton = React.memo(({ pageNumber, currentPage, onClick }) => (
  <button
    onClick={onClick}
    aria-label={`Ir a página ${pageNumber}`}
    className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center 
      justify-center text-lg font-medium ${
        currentPage === pageNumber
          ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/50"
          : "bg-white/10 text-gray-300 hover:bg-fuchsia-600/30"
      }`}
  >
    {pageNumber}
  </button>
));

const formatDate = (isoDate) => {
  if (!isoDate) return "Fecha no disponible";
  try {
    const date = new Date(isoDate);
    return `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getUTCFullYear()}`;
  } catch {
    return "Fecha inválida";
  }
};

const PostCard = React.memo(({ post }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '200px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return <article ref={ref} className="h-[400px]" />;

  const sanitizedSlug = post.slug?.current?.replace(/[^a-zA-Z0-9-]/g, '') || '#';

  return (
    <article
      ref={ref}
      className="group bg-fuchsia-700/20 backdrop-blur-sm rounded-xl overflow-hidden 
        shadow-lg hover:shadow-fuchsia-500/20 transition-shadow duration-300"
    >
      <a href={`/blog/${sanitizedSlug}`} className="block h-full">
        {post.mainImage && (
          <div className="relative w-full aspect-video overflow-hidden">
            <img
              src={urlForImage(post.mainImage)
                .width(1200)
                .height(630)
                .fit('crop')
                .crop('focalpoint')
                .quality(80)
                .auto('format')
                .url()}
              alt={post.alt || "Imagen del artículo"}
              className="w-full h-full object-cover object-center transition-transform 
                       duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                inset: 0
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent 
                          to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
          </div>
        )}
        <div className="p-5 space-y-3">
          <h2 className="text-2xl font-semibold text-fuchsia-300 capitalize">
            {post.title}
          </h2>
          <p className="text-gray-100 opacity-70">Publicado: {formatDate(post.publishedAt)}</p>
          {post.description && (
            <p className="text-gray-100 line-clamp-2">{post.description}</p>
          )}
        </div>
      </a>
    </article>
  );
}, (prev, next) => prev.post._id === next.post._id);

const PostGrid = ({ posts = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const timeoutRef = useRef();
  
  const { paginatedPosts, totalPages, startPage, endPage } = useMemo(() => {
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    
    const startPage = Math.max(1, currentPage - Math.floor(VISIBLE_PAGES/2));
    const endPage = Math.min(totalPages, startPage + VISIBLE_PAGES - 1);

    return {
      paginatedPosts: posts.slice(start, end),
      totalPages,
      startPage,
      endPage
    };
  }, [posts, currentPage]);

  const handlePageChange = useCallback((pageNumber) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  }, []);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-300">
        No se encontraron artículos disponibles.
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-4 pb-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 my-8">
          {Array.from({ length: endPage - startPage + 1 }).map((_, i) => (
            <PaginationButton
              key={startPage + i}
              pageNumber={startPage + i}
              currentPage={currentPage}
              onClick={() => handlePageChange(startPage + i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(PostGrid);